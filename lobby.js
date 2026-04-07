
module.exports = function(io, db) {
  var LobbyStore = require('./lobbyStore');
  var client = io.of('/lobby');

  if (client.__privateLobbyInitialized) {
    return client;
  }

  client.__privateLobbyInitialized = true;

  function roomName(gameid) {
    return 'lobby-' + String(gameid);
  }

  function normalizeMapLevel(value) {
    var normalized = String(value || '').trim().toLowerCase();
    if (normalized === 'hungary13' || normalized === 'hungary_13' || normalized === 'hungary-13') return 'hungary13';
    if (normalized === 'world' || normalized === 'hard' || !normalized) return 'world';
    return 'world';
  }

  function toPublicLobbyState(lobby) {
    return {
      gameid: String(lobby.gameid),
      host: lobby.host,
      players: lobby.players.slice(),
      maxPlayers: lobby.maxPlayers,
      maplevel: normalizeMapLevel(lobby.maplevel),
      started: lobby.started,
      canStart: lobby.players.length === lobby.maxPlayers
    };
  }

  function emitLobbyState(gameid) {
    var lobby = LobbyStore.getLobby(gameid);
    if (!lobby) {
      client.in(roomName(gameid)).emit('lobbyClosed');
      return;
    }
    client.in(roomName(gameid)).emit('lobbyState', toPublicLobbyState(lobby));
  }

  function emitLobbyError(socket, message) {
    socket.emit('lobbyError', { message: message });
  }

  client.on('connection', function(socket) {

    socket.on('joinLobby', function(data) {
      var gameid = String((data && data.gameid) || '');
      var username = data && data.username;

      if (!gameid || !username) {
        return emitLobbyError(socket, 'Hiányzik a lobbykód vagy a felhasználónév.');
      }

      var joinResult = LobbyStore.joinLobby(gameid, username);
      if (!joinResult.ok) {
        if (joinResult.reason === 'not_found') {
          return emitLobbyError(socket, 'A meccs nem található.');
        }
        if (joinResult.reason === 'full') {
          return emitLobbyError(socket, 'Ez a meccs már megtelt.');
        }
        if (joinResult.reason === 'started') {
          return socket.emit('matchStarted', { gameid: gameid });
        }
        return emitLobbyError(socket, 'Nem sikerült csatlakozni ehhez a meccshez.');
      }

      socket.join(roomName(gameid));
      socket._gameid = gameid;
      socket._username = username;

      emitLobbyState(gameid);
    });

    socket.on('getLobbyState', function(data) {
      var gameid = String((data && data.gameid) || '');
      if (!gameid) {
        return emitLobbyError(socket, 'Hiányzik a lobbykód.');
      }

      var lobby = LobbyStore.getLobby(gameid);
      if (!lobby) {
        return socket.emit('lobbyClosed');
      }

      socket.emit('lobbyState', toPublicLobbyState(lobby));
    });

    socket.on('startMatch', function(data) {
      var gameid = String((data && data.gameid) || '');
      var username = data && data.username;

      if (!gameid || !username) {
        return emitLobbyError(socket, 'Hiányzik a lobbykód vagy a felhasználónév.');
      }

      var startResult = LobbyStore.startLobby(gameid, username);
      if (!startResult.ok) {
        if (startResult.reason === 'not_found') {
          return emitLobbyError(socket, 'A meccs nem található.');
        }
        if (startResult.reason === 'only_host_can_start') {
          return emitLobbyError(socket, 'Csak a host indíthatja el a meccset.');
        }
        if (startResult.reason === 'not_enough_players') {
          return emitLobbyError(socket, 'Pontosan 3 játékos kell az indításhoz.');
        }
        return emitLobbyError(socket, 'Nem sikerült elindítani a meccset.');
      }

      client.in(roomName(gameid)).emit('matchStarted', { gameid: gameid });
      emitLobbyState(gameid);
    });

    socket.on('setLobbyMaplevel', function(data) {
      var gameid = String((data && data.gameid) || '');
      var username = data && data.username;
      var maplevel = normalizeMapLevel(data && data.maplevel);

      if (!gameid || !username) {
        return emitLobbyError(socket, 'Hiányzik a lobbykód vagy a felhasználónév.');
      }

      var updateResult = LobbyStore.setMaplevel(gameid, username, maplevel);
      if (!updateResult.ok) {
        if (updateResult.reason === 'not_found') {
          return emitLobbyError(socket, 'A meccs nem található.');
        }
        if (updateResult.reason === 'only_host_can_change') {
          return emitLobbyError(socket, 'Csak a host válthat pályát.');
        }
        if (updateResult.reason === 'started') {
          return emitLobbyError(socket, 'A pályát csak a meccs indítása előtt lehet módosítani.');
        }
        return emitLobbyError(socket, 'Nem sikerült elmenteni a pályaválasztást.');
      }

      socket.emit('lobbyState', toPublicLobbyState(updateResult.lobby));
      emitLobbyState(gameid);
    });

    socket.on('disconnect', function() {
      if (!socket._gameid || !socket._username) {
        return;
      }

      var gameid = socket._gameid;
      var username = socket._username;
      var leaveResult = LobbyStore.leaveLobby(gameid, username);

      if (leaveResult && leaveResult.destroyed) {
        client.in(roomName(gameid)).emit('lobbyClosed');
        return;
      }

      emitLobbyState(gameid);
    });

  });

  return client;
};
