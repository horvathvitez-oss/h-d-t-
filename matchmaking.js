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


  var DISCONNECT_CLEANUP_GRACE_MS = 60000;
  var STALE_PENDING_MATCH_MAX_AGE_MS = 15 * 60 * 1000;
  var connectedSocketCounts = Object.create(null);
  var disconnectCleanupTimers = Object.create(null);
  var matchRunTokens = Object.create(null);

  function normalizeUsername(value) {
    return String(value || '').trim();
  }

  function getMatchAgeMs(match) {
    if (!match || !match.createdAt) return 0;
    return Math.max(0, Date.now() - Number(match.createdAt || 0));
  }

  function isPendingMatch(match, lobby) {
    if (!match) return false;
    if (lobby && lobby.started) return false;
    return true;
  }

  function isStalePendingMatch(match, lobby, maxAgeMs) {
    if (!isPendingMatch(match, lobby)) return false;
    return getMatchAgeMs(match) >= Number(maxAgeMs || STALE_PENDING_MATCH_MAX_AGE_MS);
  }

  function incrementRunToken(gameid) {
    var key = String(gameid || '').trim();
    if (!key) return 0;
    matchRunTokens[key] = (matchRunTokens[key] || 0) + 1;
    return matchRunTokens[key];
  }

  function getRunToken(gameid) {
    return matchRunTokens[String(gameid || '').trim()] || 0;
  }

  function isRunActive(gameid, token) {
    var key = String(gameid || '').trim();
    if (!key) return false;
    if (getRunToken(key) !== token) return false;
    return Boolean(MatchmakingStore.getMatch(key));
  }

  function clearDisconnectCleanupTimer(username) {
    var normalized = normalizeUsername(username);
    if (!normalized || !disconnectCleanupTimers[normalized]) return;
    clearTimeout(disconnectCleanupTimers[normalized]);
    delete disconnectCleanupTimers[normalized];
  }

  function bindSocketToUsername(socket, username) {
    var normalized = normalizeUsername(username);
    if (!normalized) return '';

    var previous = normalizeUsername(socket._matchmakingRegisteredUsername);
    if (previous && previous !== normalized) {
      releaseSocketUsername(socket, true);
    }

    socket._matchmakingUsername = normalized;
    socket._matchmakingRegisteredUsername = normalized;
    socket.join(userRoom(normalized));
    clearDisconnectCleanupTimer(normalized);

    if (!socket._matchmakingPresenceCounted) {
      connectedSocketCounts[normalized] = (connectedSocketCounts[normalized] || 0) + 1;
      socket._matchmakingPresenceCounted = true;
    }

    return normalized;
  }

  function releaseSocketUsername(socket, skipCleanupSchedule) {
    var normalized = normalizeUsername(socket && socket._matchmakingRegisteredUsername);
    if (!normalized) return;

    if (socket._matchmakingPresenceCounted) {
      connectedSocketCounts[normalized] = Math.max(0, Number(connectedSocketCounts[normalized] || 0) - 1);
      if (!connectedSocketCounts[normalized]) {
        delete connectedSocketCounts[normalized];
      }
      socket._matchmakingPresenceCounted = false;
    }

    socket._matchmakingRegisteredUsername = '';
    if (!skipCleanupSchedule && !connectedSocketCounts[normalized]) {
      scheduleDisconnectCleanup(normalized);
    }
  }

  function destroyPendingLobby(gameid, match) {
    var key = String(gameid || '').trim();
    if (!key) return;

    var lobby = LobbyStore.getLobby(key);
    if (!lobby || lobby.started) return;

    var players = [];
    if (match && Array.isArray(match.players)) {
      players = match.players.slice();
    } else if (Array.isArray(lobby.players)) {
      players = lobby.players.slice();
    }

    if (lobby.host && players.indexOf(lobby.host) === -1) {
      players.unshift(lobby.host);
    }

    var destroyed = false;
    players.some(function(username) {
      if (!username) return false;
      var result = LobbyStore.leaveLobby(key, username);
      if (result && result.destroyed) {
        destroyed = true;
        return true;
      }
      return false;
    });

    if (!destroyed && lobby.host) {
      LobbyStore.leaveLobby(key, lobby.host);
    }
  }

  function clearPendingMatchArtifacts(gameid, reason) {
    var key = String(gameid || '').trim();
    if (!key) return false;

    var match = MatchmakingStore.getMatch(key);
    if (!match) return false;

    incrementRunToken(key);
    destroyPendingLobby(key, match);
    MatchmakingStore.clearMatch(key);

    match.players.forEach(function(username) {
      client.to(userRoom(username)).emit('match:aborted', {
        gameid: key,
        reason: reason || 'aborted'
      });
      emitQueueState(username);
    });

    return true;
  }

  function purgeStalePendingMatch(gameid, maxAgeMs, reason) {
    var key = String(gameid || '').trim();
    if (!key) return false;

    var match = MatchmakingStore.getMatch(key);
    var lobby = LobbyStore.getLobby(key);
    if (!isStalePendingMatch(match, lobby, maxAgeMs)) {
      return false;
    }

    return clearPendingMatchArtifacts(key, reason || 'stale_pending_match');
  }

  function purgeStalePendingMatchForUsername(username, maxAgeMs, reason) {
    var normalized = normalizeUsername(username);
    if (!normalized) return false;

    var match = MatchmakingStore.getMatchByUsername(normalized);
    if (!match) return false;

    return purgeStalePendingMatch(match.gameid, maxAgeMs, reason);
  }

  function cleanupDisconnectedUsername(username) {
    var normalized = normalizeUsername(username);
    if (!normalized || connectedSocketCounts[normalized]) return;

    purgeStalePendingMatchForUsername(normalized, 1, 'player_disconnected');
    MatchmakingStore.dequeue(normalized);
    emitQueueState(normalized);
  }

  function scheduleDisconnectCleanup(username) {
    var normalized = normalizeUsername(username);
    if (!normalized) return;
    clearDisconnectCleanupTimer(normalized);
    disconnectCleanupTimers[normalized] = setTimeout(function() {
      delete disconnectCleanupTimers[normalized];
      cleanupDisconnectedUsername(normalized);
    }, DISCONNECT_CLEANUP_GRACE_MS);
  }

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

  function runRouletteSequence(sequence, onTick, onDone, shouldContinue) {
    var index = 0;
    var delay = 95;

    function canContinue() {
      return !shouldContinue || shouldContinue() !== false;
    }

    function step() {
      if (!canContinue()) {
        return;
      }

      if (index >= sequence.length) {
        if (canContinue()) {
          onDone();
        }
        return;
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
      incrementRunToken(gameid);

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

  function startTopicDraw(gameid, runToken) {
    if (!isRunActive(gameid, runToken)) {
      return;
    }

    var firstTopic = randomItem(TOPIC_OPTIONS);
    var firstSequence = buildRouletteSequence(TOPIC_OPTIONS, firstTopic);

    runRouletteSequence(firstSequence, function(activeKey) {
      if (!isRunActive(gameid, runToken)) return;
      MatchmakingStore.setTopicTick(gameid, 0, activeKey);
      client.in(matchRoom(gameid)).emit('draw:topic:tick', {
        pickIndex: 0,
        topicKey: activeKey,
        topicLabel: MatchmakingStore.TOPIC_META[activeKey].label
      });
    }, function() {
      if (!isRunActive(gameid, runToken)) return;
      MatchmakingStore.lockTopic(gameid, firstTopic);
      client.in(matchRoom(gameid)).emit('draw:topic:locked', {
        pickIndex: 0,
        topicKey: firstTopic,
        topicLabel: MatchmakingStore.TOPIC_META[firstTopic].label
      });

      setTimeout(function() {
        if (!isRunActive(gameid, runToken)) return;

        var remaining = TOPIC_OPTIONS.filter(function(item) {
          return item !== firstTopic;
        });
        var secondTopic = randomItem(remaining);
        var secondSequence = buildRouletteSequence(remaining, secondTopic);

        runRouletteSequence(secondSequence, function(activeKey) {
          if (!isRunActive(gameid, runToken)) return;
          MatchmakingStore.setTopicTick(gameid, 1, activeKey);
          client.in(matchRoom(gameid)).emit('draw:topic:tick', {
            pickIndex: 1,
            topicKey: activeKey,
            topicLabel: MatchmakingStore.TOPIC_META[activeKey].label
          });
        }, function() {
          if (!isRunActive(gameid, runToken)) return;

          MatchmakingStore.lockTopic(gameid, secondTopic);
          client.in(matchRoom(gameid)).emit('draw:topic:locked', {
            pickIndex: 1,
            topicKey: secondTopic,
            topicLabel: MatchmakingStore.TOPIC_META[secondTopic].label
          });

          var match = MatchmakingStore.getSerializableState(gameid);
          if (!match) return;

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
        }, function() {
          return isRunActive(gameid, runToken);
        });
      }, 850);
    }, function() {
      return isRunActive(gameid, runToken);
    });
  }

  function startCeremony(gameid) {
    purgeStalePendingMatch(gameid, STALE_PENDING_MATCH_MAX_AGE_MS, 'stale_before_ceremony');

    var markResult = MatchmakingStore.markCeremonyStarted(gameid);
    if (!markResult.ok || markResult.alreadyStarted) {
      return;
    }

    var runToken = getRunToken(gameid) || incrementRunToken(gameid);
    var finalMap = randomItem(MAP_OPTIONS);
    var mapSequence = buildRouletteSequence(MAP_OPTIONS, finalMap);

    client.in(matchRoom(gameid)).emit('draw:stage', {
      stage: 'drawing_map'
    });

    runRouletteSequence(mapSequence, function(activeMap) {
      if (!isRunActive(gameid, runToken)) return;
      MatchmakingStore.setMapTick(gameid, activeMap);
      client.in(matchRoom(gameid)).emit('draw:map:tick', {
        value: activeMap,
        label: MatchmakingStore.MAP_META[activeMap].label
      });
    }, function() {
      if (!isRunActive(gameid, runToken)) return;
      MatchmakingStore.setMapResult(gameid, finalMap);
      client.in(matchRoom(gameid)).emit('draw:map:result', {
        value: finalMap,
        label: MatchmakingStore.MAP_META[finalMap].label
      });

      setTimeout(function() {
        if (!isRunActive(gameid, runToken)) return;
        client.in(matchRoom(gameid)).emit('draw:stage', {
          stage: 'drawing_topics'
        });
        startTopicDraw(gameid, runToken);
      }, 1000);
    }, function() {
      return isRunActive(gameid, runToken);
    });
  }

  client.on('connection', function(socket) {
    socket.on('queue:join', function(data) {
      var username = String((data && data.username) || '').trim();
      if (!username) {
        socket.emit('queue:error', { message: 'Hiányzik a felhasználónév.' });
        return;
      }

      purgeStalePendingMatchForUsername(username, STALE_PENDING_MATCH_MAX_AGE_MS, 'stale_rejoin');
      bindSocketToUsername(socket, username);

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

      purgeStalePendingMatch(gameid, STALE_PENDING_MATCH_MAX_AGE_MS, 'stale_draw_watch');
      if (!MatchmakingStore.isParticipant(gameid, username)) {
        socket.emit('match:not-found');
        return;
      }

      bindSocketToUsername(socket, username);
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

    socket.on('disconnect', function() {
      releaseSocketUsername(socket, false);
    });
  });

  return client;
};
