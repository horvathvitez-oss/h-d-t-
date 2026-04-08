var queue = [];
var queuedUsers = Object.create(null);
var matches = Object.create(null);
var userToMatch = Object.create(null);

var TOPIC_META = {
  hungary_pre_1848: { label: '1848 előtti magyar történelem' },
  hungary_post_1848: { label: '1848 utáni magyar történelem' },
  world_pre_1848: { label: '1848 előtti egyetemes történelem' },
  world_post_1848: { label: '1848 utáni egyetemes történelem' },
  literature: { label: 'Irodalom' }
};

var MAP_META = {
  hungary13: { label: 'NAGYMAGYARORSZÁG' },
  world: { label: 'VILÁGTÉRKÉP' }
};

function normalizeUsername(username) {
  return String(username || '').trim();
}

function cloneMatch(match) {
  if (!match) return null;
  return {
    gameid: String(match.gameid),
    players: match.players.slice(),
    host: match.host,
    status: match.status,
    createdAt: match.createdAt,
    ceremonyStarted: Boolean(match.ceremonyStarted),
    maplevel: match.maplevel || null,
    selectedTopics: (match.selectedTopics || []).slice(),
    questionFilters: Object.assign({}, match.questionFilters || {}),
    lastMapTick: match.lastMapTick || null,
    lastTopicTick: match.lastTopicTick ? {
      pickIndex: match.lastTopicTick.pickIndex,
      topicKey: match.lastTopicTick.topicKey
    } : null,
    startRequested: Boolean(match.startRequested)
  };
}

function getQueuePosition(username) {
  var normalized = normalizeUsername(username);
  return queue.indexOf(normalized);
}

module.exports.TOPIC_META = TOPIC_META;
module.exports.MAP_META = MAP_META;

module.exports.enqueue = function(username) {
  var normalized = normalizeUsername(username);
  if (!normalized) return { ok: false, reason: 'missing_username' };

  if (userToMatch[normalized]) {
    return {
      ok: true,
      alreadyMatched: true,
      gameid: String(userToMatch[normalized]),
      queueLength: queue.length
    };
  }

  if (!queuedUsers[normalized]) {
    queuedUsers[normalized] = true;
    queue.push(normalized);
  }

  return {
    ok: true,
    alreadyQueued: true,
    position: getQueuePosition(normalized),
    queueLength: queue.length
  };
};

module.exports.dequeue = function(username) {
  var normalized = normalizeUsername(username);
  if (!normalized) return { ok: false, reason: 'missing_username' };

  queue = queue.filter(function(item) {
    return item !== normalized;
  });
  delete queuedUsers[normalized];

  return {
    ok: true,
    queueLength: queue.length
  };
};

module.exports.canAssembleMatch = function(size) {
  return queue.length >= (Number(size) || 3);
};

module.exports.takeNextPlayers = function(size) {
  var needed = Number(size) || 3;
  if (queue.length < needed) return [];

  var selected = queue.slice(0, needed);
  queue = queue.slice(needed);
  selected.forEach(function(username) {
    delete queuedUsers[username];
  });
  return selected;
};

module.exports.createMatch = function(data) {
  var gameid = String(data.gameid);
  var players = Array.isArray(data.players) ? data.players.map(normalizeUsername).filter(Boolean) : [];
  var host = normalizeUsername(data.host);

  matches[gameid] = {
    gameid: gameid,
    players: players,
    host: host,
    status: data.status || 'awaiting_draw',
    createdAt: Date.now(),
    ceremonyStarted: false,
    maplevel: data.maplevel || null,
    selectedTopics: [],
    questionFilters: {},
    lastMapTick: null,
    lastTopicTick: null,
    startRequested: false
  };

  players.forEach(function(username) {
    userToMatch[username] = gameid;
  });

  return cloneMatch(matches[gameid]);
};

module.exports.getMatch = function(gameid) {
  return cloneMatch(matches[String(gameid)]);
};

module.exports.getMatchByUsername = function(username) {
  var normalized = normalizeUsername(username);
  var gameid = userToMatch[normalized];
  if (!gameid) return null;
  return cloneMatch(matches[String(gameid)]);
};

module.exports.isParticipant = function(gameid, username) {
  var match = matches[String(gameid)];
  var normalized = normalizeUsername(username);
  if (!match || !normalized) return false;
  return match.players.indexOf(normalized) !== -1;
};

module.exports.markCeremonyStarted = function(gameid) {
  var match = matches[String(gameid)];
  if (!match) return { ok: false, reason: 'not_found' };
  if (match.ceremonyStarted) return { ok: true, alreadyStarted: true, match: cloneMatch(match) };
  match.ceremonyStarted = true;
  match.status = 'drawing_map';
  return { ok: true, match: cloneMatch(match) };
};

module.exports.setMapTick = function(gameid, maplevel) {
  var match = matches[String(gameid)];
  if (!match) return null;
  match.lastMapTick = String(maplevel || '');
  return cloneMatch(match);
};

module.exports.setMapResult = function(gameid, maplevel) {
  var match = matches[String(gameid)];
  if (!match) return null;
  match.maplevel = String(maplevel || 'world');
  match.status = 'drawing_topics';
  match.lastMapTick = match.maplevel;
  return cloneMatch(match);
};

module.exports.setTopicTick = function(gameid, pickIndex, topicKey) {
  var match = matches[String(gameid)];
  if (!match) return null;
  match.lastTopicTick = {
    pickIndex: Number(pickIndex) || 0,
    topicKey: String(topicKey || '')
  };
  return cloneMatch(match);
};

module.exports.lockTopic = function(gameid, topicKey) {
  var match = matches[String(gameid)];
  var normalized = String(topicKey || '');
  if (!match || !normalized) return null;
  if (match.selectedTopics.indexOf(normalized) === -1) {
    match.selectedTopics.push(normalized);
  }
  match.lastTopicTick = {
    pickIndex: Math.max(0, match.selectedTopics.length - 1),
    topicKey: normalized
  };
  if (match.selectedTopics.length >= 2) {
    match.status = 'ready';
    match.questionFilters = {
      hungary_pre_1848: false,
      hungary_post_1848: false,
      world_pre_1848: false,
      world_post_1848: false,
      literature: false
    };
    match.selectedTopics.forEach(function(key) {
      if (Object.prototype.hasOwnProperty.call(match.questionFilters, key)) {
        match.questionFilters[key] = true;
      }
    });
  }
  return cloneMatch(match);
};

module.exports.markStartRequested = function(gameid) {
  var match = matches[String(gameid)];
  if (!match) return null;
  match.startRequested = true;
  match.status = 'starting';
  return cloneMatch(match);
};

module.exports.clearMatch = function(gameid) {
  var key = String(gameid);
  var match = matches[key];
  if (!match) return false;
  match.players.forEach(function(username) {
    if (userToMatch[username] === key) {
      delete userToMatch[username];
    }
  });
  delete matches[key];
  return true;
};

module.exports.getQueueState = function(username) {
  var normalized = normalizeUsername(username);
  var position = getQueuePosition(normalized);
  return {
    queueLength: queue.length,
    position: position,
    waitingFor: Math.max(0, 3 - (position + 1))
  };
};

module.exports.getSerializableState = function(gameid) {
  var match = matches[String(gameid)];
  if (!match) return null;
  return {
    gameid: String(match.gameid),
    players: match.players.slice(),
    host: match.host,
    status: match.status,
    ceremonyStarted: Boolean(match.ceremonyStarted),
    maplevel: match.maplevel || null,
    mapLabel: match.maplevel && MAP_META[match.maplevel] ? MAP_META[match.maplevel].label : null,
    selectedTopics: (match.selectedTopics || []).slice(),
    selectedTopicLabels: (match.selectedTopics || []).map(function(key) {
      return TOPIC_META[key] ? TOPIC_META[key].label : key;
    }),
    questionFilters: Object.assign({}, match.questionFilters || {}),
    lastMapTick: match.lastMapTick || null,
    lastTopicTick: match.lastTopicTick ? {
      pickIndex: match.lastTopicTick.pickIndex,
      topicKey: match.lastTopicTick.topicKey,
      topicLabel: TOPIC_META[match.lastTopicTick.topicKey] ? TOPIC_META[match.lastTopicTick.topicKey].label : match.lastTopicTick.topicKey
    } : null,
    startRequested: Boolean(match.startRequested)
  };
};
