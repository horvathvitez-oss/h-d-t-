var lobbies = {};

function normalizeGameId(gameid) {
  return String(gameid);
}

function cloneLobby(lobby) {
  return {
    gameid: lobby.gameid,
    host: lobby.host,
    players: lobby.players.slice(),
    maxPlayers: lobby.maxPlayers,
    maplevel: lobby.maplevel,
    started: lobby.started,
    createdAt: lobby.createdAt
  };
}

module.exports.generateLobbyCode = function() {
  var code = '';
  do {
    code = String(Math.floor(100000 + Math.random() * 900000));
  } while (lobbies[code]);
  return code;
};

module.exports.createLobby = function(data) {
  var gameid = normalizeGameId(data.gameid);
  lobbies[gameid] = {
    gameid: gameid,
    host: data.host,
    players: [data.host],
    maxPlayers: data.maxPlayers || 3,
    maplevel: data.maplevel || 'hard',
    started: false,
    createdAt: Date.now()
  };
  return cloneLobby(lobbies[gameid]);
};

module.exports.getLobby = function(gameid) {
  var lobby = lobbies[normalizeGameId(gameid)];
  return lobby ? cloneLobby(lobby) : null;
};

module.exports.isParticipant = function(gameid, username) {
  var lobby = lobbies[normalizeGameId(gameid)];
  if (!lobby) return false;
  return lobby.players.indexOf(username) !== -1;
};

module.exports.joinLobby = function(gameid, username) {
  var key = normalizeGameId(gameid);
  var lobby = lobbies[key];

  if (!lobby) return { ok: false, reason: 'not_found' };
  if (lobby.started) return { ok: false, reason: 'started' };
  if (lobby.players.indexOf(username) !== -1) return { ok: true, lobby: cloneLobby(lobby) };
  if (lobby.players.length >= lobby.maxPlayers) return { ok: false, reason: 'full' };

  lobby.players.push(username);
  return { ok: true, lobby: cloneLobby(lobby) };
};

module.exports.leaveLobby = function(gameid, username) {
  var key = normalizeGameId(gameid);
  var lobby = lobbies[key];

  if (!lobby) return { ok: false, reason: 'not_found' };
  if (lobby.started) return { ok: true, lobby: cloneLobby(lobby), skipped: true };

  lobby.players = lobby.players.filter(function(playerName) {
    return playerName !== username;
  });

  if (lobby.players.length === 0) {
    delete lobbies[key];
    return { ok: true, destroyed: true };
  }

  if (lobby.host === username) {
    delete lobbies[key];
    return { ok: true, destroyed: true, hostLeft: true };
  }

  return { ok: true, lobby: cloneLobby(lobby) };
};

module.exports.startLobby = function(gameid, username) {
  var key = normalizeGameId(gameid);
  var lobby = lobbies[key];

  if (!lobby) return { ok: false, reason: 'not_found' };
  if (lobby.host !== username) return { ok: false, reason: 'only_host_can_start' };
  if (lobby.players.length !== lobby.maxPlayers) return { ok: false, reason: 'not_enough_players' };

  lobby.started = true;
  return { ok: true, lobby: cloneLobby(lobby) };
};
