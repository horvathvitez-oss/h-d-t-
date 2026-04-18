module.exports = function(io, db) {
  var LobbyStore = require('./lobbyStore');
  var MatchmakingStore = require('./matchmakingStore');
  var createGame = require('./game');
  var client = io.of('/matchmaking');

  if (client.__randomMatchmakingInitialized) {
    return client;
  }

  client.__randomMatchmakingInitialized = true;

  var MAP_OPTIONS = ['hungary13', 'world'];
  var TOPIC_OPTIONS = [
    'hungary_pre_1848',
    'hungary_post_1848',
    'world_pre_1848',
    'world_post_1848',
    'literature'
  ];

  function userRoom(username) {
    return 'user-' + String(username || '').trim();
  }

  function matchRoom(gameid) {
    return 'match-' + String(gameid);
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function shuffle(values) {
    var arr = values.slice();
    for (var i = arr.length - 1; i > 0; i -= 1) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }

  function randomItem(values) {
    return values[Math.floor(Math.random() * values.length)];
  }

  function buildRouletteSequence(options, finalValue) {
    var count = randomInt(16, 24);
    var sequence = [];
    var startIndex = randomInt(0, options.length - 1);
    for (var i = 0; i < count - 1; i += 1) {
      sequence.push(options[(startIndex + i) % options.length]);
    }
    sequence.push(finalValue);
    return sequence;
  }

  function runRouletteSequence(sequence, onTick, onDone) {
    var index = 0;
    var delay = 95;

    function step() {
      if (index >= sequence.length) {
        return onDone();
      }

      onTick(sequence[index], index, sequence.length);
      index += 1;
      delay = Math.min(460, Math.round(delay * 1.12 + 12));
      setTimeout(step, delay);
    }

    step();
  }

  function emitQueueState(username) {
    var activeMatch = MatchmakingStore.getMatchByUsername(username);
    if (activeMatch) {
      client.to(userRoom(username)).emit('queue:update', {
        matched: true,
        gameid: String(activeMatch.gameid)
      });
      return;
    }

    var state = MatchmakingStore.getQueueState(username);
    client.to(userRoom(username)).emit('queue:update', {
      matched: false,
      queueLength: state.queueLength,
      position: state.position,
      waitingFor: state.waitingFor
    });
  }

  function emitMatchFound(match) {
    if (!match) return;
    match.players.forEach(function(username) {
      client.to(userRoom(username)).emit('match:found', {
        gameid: String(match.gameid),
        players: match.players.slice(),
        host: match.host
      });
    });
  }

  function maybeCreateMatches() {
    while (MatchmakingStore.canAssembleMatch(3)) {
      var players = MatchmakingStore.takeNextPlayers(3);
      if (!players.length) return;

      var host = randomItem(players);
      var gameid = LobbyStore.generateLobbyCode();

      createGame(io, Number(gameid), host, 3, 'world', { matchSource: 'random_matchmaking' });
      LobbyStore.createLobby({
        gameid: gameid,
        host: host,
        maxPlayers: 3,
        maplevel: 'world'
      });

      players.forEach(function(username) {
        if (username !== host) {
          LobbyStore.joinLobby(gameid, username);
        }
      });

      var match = MatchmakingStore.createMatch({
        gameid: gameid,
        players: players,
        host: host,
        maplevel: 'world',
        status: 'awaiting_draw'
      });

      emitMatchFound(match);
      players.forEach(emitQueueState);
    }
  }

  function emitDrawInit(socket, gameid) {
    var state = MatchmakingStore.getSerializableState(gameid);
    if (!state) {
      socket.emit('match:not-found');
      return;
    }

    socket.emit('draw:init', {
      gameid: state.gameid,
      players: state.players,
      host: state.host,
      status: state.status,
      maplevel: state.maplevel,
      mapLabel: state.mapLabel,
      selectedTopics: state.selectedTopics,
      selectedTopicLabels: state.selectedTopicLabels,
      lastMapTick: state.lastMapTick,
      lastTopicTick: state.lastTopicTick,
      startRequested: state.startRequested,
      mapOptions: MAP_OPTIONS.map(function(value) {
        return {
          value: value,
          label: MatchmakingStore.MAP_META[value].label
        };
      }),
      topicOptions: TOPIC_OPTIONS.map(function(key) {
        return {
          key: key,
          label: MatchmakingStore.TOPIC_META[key].label
        };
      })
    });
  }

  function startTopicDraw(gameid) {
    var firstTopic = randomItem(TOPIC_OPTIONS);
    var firstSequence = buildRouletteSequence(TOPIC_OPTIONS, firstTopic);

    runRouletteSequence(firstSequence, function(activeKey) {
      MatchmakingStore.setTopicTick(gameid, 0, activeKey);
      client.in(matchRoom(gameid)).emit('draw:topic:tick', {
        pickIndex: 0,
        topicKey: activeKey,
        topicLabel: MatchmakingStore.TOPIC_META[activeKey].label
      });
    }, function() {
      MatchmakingStore.lockTopic(gameid, firstTopic);
      client.in(matchRoom(gameid)).emit('draw:topic:locked', {
        pickIndex: 0,
        topicKey: firstTopic,
        topicLabel: MatchmakingStore.TOPIC_META[firstTopic].label
      });

      setTimeout(function() {
        var remaining = TOPIC_OPTIONS.filter(function(item) {
          return item !== firstTopic;
        });
        var secondTopic = randomItem(remaining);
        var secondSequence = buildRouletteSequence(remaining, secondTopic);

        runRouletteSequence(secondSequence, function(activeKey) {
          MatchmakingStore.setTopicTick(gameid, 1, activeKey);
          client.in(matchRoom(gameid)).emit('draw:topic:tick', {
            pickIndex: 1,
            topicKey: activeKey,
            topicLabel: MatchmakingStore.TOPIC_META[activeKey].label
          });
        }, function() {
          var match = MatchmakingStore.lockTopic(gameid, secondTopic);
          client.in(matchRoom(gameid)).emit('draw:topic:locked', {
            pickIndex: 1,
            topicKey: secondTopic,
            topicLabel: MatchmakingStore.TOPIC_META[secondTopic].label
          });

          match = MatchmakingStore.getSerializableState(gameid);
          client.in(matchRoom(gameid)).emit('draw:complete', {
            gameid: String(gameid),
            players: match.players,
            host: match.host,
            maplevel: match.maplevel,
            mapLabel: match.mapLabel,
            selectedTopics: match.selectedTopics,
            selectedTopicLabels: match.selectedTopicLabels,
            questionFilters: match.questionFilters
          });
        });
      }, 850);
    });
  }

  function startCeremony(gameid) {
    var markResult = MatchmakingStore.markCeremonyStarted(gameid);
    if (!markResult.ok || markResult.alreadyStarted) {
      return;
    }

    var finalMap = randomItem(MAP_OPTIONS);
    var mapSequence = buildRouletteSequence(MAP_OPTIONS, finalMap);

    client.in(matchRoom(gameid)).emit('draw:stage', {
      stage: 'drawing_map'
    });

    runRouletteSequence(mapSequence, function(activeMap) {
      MatchmakingStore.setMapTick(gameid, activeMap);
      client.in(matchRoom(gameid)).emit('draw:map:tick', {
        value: activeMap,
        label: MatchmakingStore.MAP_META[activeMap].label
      });
    }, function() {
      MatchmakingStore.setMapResult(gameid, finalMap);
      client.in(matchRoom(gameid)).emit('draw:map:result', {
        value: finalMap,
        label: MatchmakingStore.MAP_META[finalMap].label
      });

      setTimeout(function() {
        client.in(matchRoom(gameid)).emit('draw:stage', {
          stage: 'drawing_topics'
        });
        startTopicDraw(gameid);
      }, 1000);
    });
  }

  client.on('connection', function(socket) {
    socket.on('queue:join', function(data) {
      var username = String((data && data.username) || '').trim();
      if (!username) {
        socket.emit('queue:error', { message: 'Hiányzik a felhasználónév.' });
        return;
      }

      socket._matchmakingUsername = username;
      socket.join(userRoom(username));

      var enqueueResult = MatchmakingStore.enqueue(username);
      if (!enqueueResult.ok) {
        socket.emit('queue:error', { message: 'Nem sikerült elindítani a meccskeresést.' });
        return;
      }

      emitQueueState(username);
      if (enqueueResult.alreadyMatched && enqueueResult.gameid) {
        socket.emit('match:found', {
          gameid: String(enqueueResult.gameid)
        });
        return;
      }

      maybeCreateMatches();
    });

    socket.on('queue:leave', function(data) {
      var username = String((data && data.username) || socket._matchmakingUsername || '').trim();
      if (!username) {
        socket.emit('queue:error', { message: 'Hiányzik a felhasználónév.' });
        return;
      }

      MatchmakingStore.dequeue(username);
      emitQueueState(username);
      socket.emit('queue:left');
    });

    socket.on('draw:watch', function(data) {
      var gameid = String((data && data.gameid) || '').trim();
      var username = String((data && data.username) || socket._matchmakingUsername || '').trim();

      if (!gameid || !username) {
        socket.emit('queue:error', { message: 'Hiányzik a meccsazonosító vagy a felhasználónév.' });
        return;
      }

      if (!MatchmakingStore.isParticipant(gameid, username)) {
        socket.emit('match:not-found');
        return;
      }

      socket._matchmakingUsername = username;
      socket.join(userRoom(username));
      socket.join(matchRoom(gameid));
      emitDrawInit(socket, gameid);
      startCeremony(gameid);
    });

    socket.on('match:start-requested', function(data) {
      var gameid = String((data && data.gameid) || '').trim();
      if (!gameid) return;
      MatchmakingStore.markStartRequested(gameid);
      client.in(matchRoom(gameid)).emit('draw:launching', { gameid: gameid });
    });
  });

  return client;
};
