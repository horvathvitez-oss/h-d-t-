module.exports = function(app, io, db) {
  var express = require('express');
  var nodemailer = require('nodemailer');
  var router = express.Router();

  app.use('/get_map/public/map/', express.static(__dirname + '/public/map/'));
  app.use('/views/', express.static(__dirname + '/views/'));
  app.use('/views/login/', express.static(__dirname + '/views/login/'));
  app.use('/public/map/', express.static(__dirname + '/public/map/'));
  app.use('/profile/views/', express.static(__dirname + '/views/'));
  app.use('/images', express.static(__dirname + '/public/images/'));
  app.use('/game/', express.static(__dirname + '/public/game/'));

  var Territory = require('./public/models/territory');
  var Gameutils = require('./public/models/gameutils');
  var User = require('./public/models/user');
  var LobbyStore = require('./lobbyStore');
  var MatchmakingStore = require('./matchmakingStore');

  require('./lobby')(io, db);
  require('./matchmaking')(io, db);

  var FEATURE_REQUEST_TO = 'kozepsulineked@gmail.com';

  function getSuggestionTransport() {
    var gmailUser = String(process.env.GMAIL_USER || '').trim();
    var gmailPassword = String(process.env.GMAIL_APP_PASSWORD || '').replace(/\s+/g, '');

    if (!gmailUser || !gmailPassword) {
      return null;
    }

    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPassword
      }
    });
  }

  function withAuthenticatedUser(req, res, onSuccess) {
    User.findById(req.session.userId).exec(function(error, user) {
      if (error || user === null) {
        return res.redirect('/login');
      }
      onSuccess(user);
    });
  }

  function normalizeGameutil(gameutil) {
    if (!gameutil) return null;
    if (Array.isArray(gameutil)) return gameutil.length ? gameutil[0] : null;
    return gameutil;
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
  }

  function normalizeSuggestionMessage(value) {
    return String(value || '')
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .trim();
  }

  function getRegisterErrorRedirect(code) {
    return '/register?error=' + encodeURIComponent(String(code || 'unknown'));
  }

  function getDuplicateFieldFromError(error) {
    if (!error) return null;
    if (error.code === 11000 || error.code === 11001) {
      if (error.keyPattern) {
        if (error.keyPattern.username) return 'username';
        if (error.keyPattern.email) return 'email';
      }
      if (error.keyValue) {
        if (Object.prototype.hasOwnProperty.call(error.keyValue, 'username')) return 'username';
        if (Object.prototype.hasOwnProperty.call(error.keyValue, 'email')) return 'email';
      }
      var message = String(error.message || '').toLowerCase();
      if (message.indexOf('username') !== -1) return 'username';
      if (message.indexOf('email') !== -1) return 'email';
      return 'duplicate';
    }
    return null;
  }

  function getSuggestionFlash(code) {
    if (code === 'success') {
      return {
        type: 'success',
        text: 'Köszönjük! A javaslatodat elküldtük nekünk emailben.'
      };
    }

    if (code === 'invalid') {
      return {
        type: 'error',
        text: 'Írj legalább 10 karakteres, legfeljebb 2000 karakteres javaslatot.'
      };
    }

    if (code === 'rate_limited') {
      return {
        type: 'error',
        text: 'Kérlek várj 1 percet a következő üzenet előtt.'
      };
    }

    if (code === 'unavailable') {
      return {
        type: 'error',
        text: 'Az emailküldés még nincs beállítva a szerveren.'
      };
    }

    if (code === 'error') {
      return {
        type: 'error',
        text: 'Hiba történt küldés közben. Próbáld újra egy kicsit később.'
      };
    }

    return null;
  }

router.get('/lobby', function(req, res) {
  withAuthenticatedUser(req, res, function(user) {
    res.render('lobby', {
      username: user.username,
      email: user.email || '',
      suggestionFlash: null
    });
  });
});

  router.post('/lobby/feature-request', function(req, res) {
    withAuthenticatedUser(req, res, function(user) {
      var honeypot = String((req.body.website || '')).trim();
      var message = normalizeSuggestionMessage(req.body.message);
      var now = Date.now();
      var transporter = getSuggestionTransport();

      if (honeypot) {
        return res.redirect('/lobby?suggestion=success');
      }

      if (!message || message.length < 10 || message.length > 2000) {
        return res.redirect('/lobby?suggestion=invalid');
      }

      if (req.session.lastFeatureRequestAt && (now - req.session.lastFeatureRequestAt) < 60000) {
        return res.redirect('/lobby?suggestion=rate_limited');
      }

      if (!transporter) {
        return res.redirect('/lobby?suggestion=unavailable');
      }

      var replyTo = isValidEmail(user.email) ? String(user.email).trim() : String(process.env.GMAIL_USER || '').trim();
      var textLines = [
        'Új javaslat érkezett a HÓDÍTÓ lobbyból.',
        '',
        'Felhasználónév: ' + user.username,
        'Felhasználó emailje: ' + (user.email || 'nincs megadva'),
        'Időpont: ' + new Date(now).toISOString(),
        '',
        'Javaslat:',
        message
      ];

      transporter.sendMail({
        from: 'HÓDÍTÓ javaslatküldő <' + String(process.env.GMAIL_USER || '').trim() + '>',
        to: FEATURE_REQUEST_TO,
        replyTo: replyTo,
        subject: '[HÓDÍTÓ] Új lobby javaslat - ' + user.username,
        text: textLines.join('\n')
      }, function(error) {
        if (error) {
          console.log('Feature request email error:', error);
          return res.redirect('/lobby?suggestion=error');
        }

        req.session.lastFeatureRequestAt = now;
        return res.redirect('/lobby?suggestion=success');
      });
    });
  });

  router.get('/newgame', function(req, res) {
    withAuthenticatedUser(req, res, function(user) {
      res.render('creategame', { username: user.username });
    });
  });

  router.get('/matchmaking', function(req, res) {
    withAuthenticatedUser(req, res, function(user) {
      var activeMatch = MatchmakingStore.getMatchByUsername(user.username);
      if (activeMatch) {
        var activeLobby = LobbyStore.getLobby(activeMatch.gameid);
        if (activeLobby && activeLobby.started) {
          return res.redirect('/game/' + activeMatch.gameid);
        }
        return res.redirect('/matchdraw/' + activeMatch.gameid);
      }

      res.render('matchmaking', { username: user.username });
    });
  });

  router.get('/matchdraw/:gameid', function(req, res) {
    withAuthenticatedUser(req, res, function(user) {
      var gameid = String(req.params.gameid);
      var lobby = LobbyStore.getLobby(gameid);
      var match = MatchmakingStore.getMatch(gameid);

      if (lobby && lobby.started) {
        if (!LobbyStore.isParticipant(gameid, user.username)) return res.redirect('/lobby');
        return res.redirect('/game/' + gameid);
      }

      if (!match || !MatchmakingStore.isParticipant(gameid, user.username)) {
        if (lobby && LobbyStore.isParticipant(gameid, user.username)) {
          return res.redirect('/lobby/' + gameid);
        }
        return res.redirect('/matchmaking');
      }

      res.render('matchdraw', { username: user.username, gameid: gameid });
    });
  });

  router.get('/lobby/:gameid', function(req, res) {
    withAuthenticatedUser(req, res, function(user) {
      var gameid = String(req.params.gameid);
      var lobby = LobbyStore.getLobby(gameid);
      var match = MatchmakingStore.getMatch(gameid);

      if (!lobby) return res.redirect('/lobby');

      if (match && MatchmakingStore.isParticipant(gameid, user.username) && !lobby.started) {
        return res.redirect('/matchdraw/' + gameid);
      }

      if (lobby.started) {
        if (!LobbyStore.isParticipant(gameid, user.username)) return res.redirect('/lobby');
        return res.redirect('/game/' + gameid);
      }

      res.render('waitingroom', { username: user.username, gameid: gameid });
    });
  });

  router.get('/', function(req, res) {
    res.redirect('/login');
  });

  router.get('/login', function(req, res) {
    User.findById(req.session.userId).exec(function(error, user) {
      if (error) return res.sendFile(__dirname + '/views/login/login.html');
      if (user === null) return res.sendFile(__dirname + '/views/login/login.html');
      res.redirect('/lobby');
      console.log('You have already logged in');
    });
  });

  router.get('/register', function(req, res) {
    User.findById(req.session.userId).exec(function(error, user) {
      if (error) return res.sendFile(__dirname + '/views/login/register.html');
      if (user === null) return res.sendFile(__dirname + '/views/login/register.html');
      res.redirect('/lobby');
      console.log('You have already logged in');
    });
  });

  router.get('/lobbychat', function(req, res, next) {
    res.sendFile(__dirname + '/public/mainPage.html');
  });

  router.post('/authenticate', function(req, res, next) {
    if (req.body.password !== req.body.passwordConf) {
      return res.redirect(getRegisterErrorRedirect('password_mismatch'));
    }

    if (req.body.email && req.body.username && req.body.password && req.body.passwordConf) {
      var userData = {
        email: String(req.body.email || '').trim(),
        username: String(req.body.username || '').trim(),
        password: req.body.password,
        passwordConf: req.body.passwordConf
      };

      User.create(userData, function(error, user) {
        if (error) {
          var duplicateField = getDuplicateFieldFromError(error);
          if (duplicateField === 'username') {
            return res.redirect(getRegisterErrorRedirect('username_taken'));
          }
          if (duplicateField === 'email') {
            return res.redirect(getRegisterErrorRedirect('email_taken'));
          }
          if (duplicateField === 'duplicate') {
            return res.redirect(getRegisterErrorRedirect('duplicate'));
          }
          return next(error);
        }
        req.session.userId = user._id;
        return res.redirect('/lobby');
      });
    } else if (req.body.logemail && req.body.logpassword) {
      User.authenticate(req.body.logemail, req.body.logpassword, function(error, user) {
        if (error || !user) return res.redirect('/login');
        req.session.userId = user._id;
        return res.redirect('/lobby');
      });
    } else {
      return res.redirect(getRegisterErrorRedirect('missing_fields'));
    }
  });

  router.get('/profile', function(req, res, next) {
    withAuthenticatedUser(req, res, function(user) {
      res.render('profile', { username: user.username, email: user.email });
    });
  });

  router.get('/profile/:username', function(req, res, next) {
    withAuthenticatedUser(req, res, function(user) {
      var where = { username: req.params.username };
      User.getUser(where, function(err, email) {
        if (err) {
          console.log('Socket error occured.');
          return res.redirect('/lobby');
        }
        res.render('profile', { username: email[0].username, email: email[0].email });
      });
    });
  });

  router.get('/logout', function(req, res, next) {
    if (req.session) {
      req.session.destroy(function(err) {
        if (err) return next(err);
        return res.redirect('/login');
      });
    }
  });

  router.get('/get_map', function(req, res) {
    res.sendFile(__dirname + '/public/map/index.html');
  });

  router.get('/get_map/:userid', function(req, res) {
    var userid = req.params.userid;
    res.render('index', { userid: userid, username: 'aloscuk', maplevel: 'hard' });
  });

  router.post('/creategame', function(req, res) {
    withAuthenticatedUser(req, res, function(user) {
      var gameid = LobbyStore.generateLobbyCode();
      var howmany = 3;
      var maplevel = req.body.maplevel || 'hard';

      require('./game')(io, Number(gameid), user.username, howmany, maplevel, db);
      LobbyStore.createLobby({
        gameid: gameid,
        host: user.username,
        maxPlayers: 3,
        maplevel: maplevel
      });

      res.redirect('/lobby/' + gameid);
    });
  });

  router.get('/get_map/:userid/:level/:howmany/:gameid', function(req, res) {
    var userid = req.params.userid;
    var maplevel = req.params.level;
    var howmany = req.params.howmany;
    var gameid = req.params.gameid;
    console.log(userid);
    res.render('index', { userid: userid, username: 'aloscuk', howmany: howmany, maplevel: maplevel, gameid: gameid });
  });

  router.get('/game/:gameid', function(req, res) {
    withAuthenticatedUser(req, res, function(user) {
      var gameid = String(req.params.gameid);
      var lobby = LobbyStore.getLobby(gameid);
      var match = MatchmakingStore.getMatch(gameid);

      if (lobby) {
        if (!LobbyStore.isParticipant(gameid, user.username)) return res.redirect('/lobby');
        if (!lobby.started) {
          if (match && MatchmakingStore.isParticipant(gameid, user.username)) {
            return res.redirect('/matchdraw/' + gameid);
          }
          return res.redirect('/lobby/' + gameid);
        }
      }

      Gameutils.getGameByID(Number(gameid), function(err, gameutil) {
        if (err) {
          console.log('annaerror', err);
          return res.redirect('/lobby');
        }

        var gameRecord = normalizeGameutil(gameutil);
        if (!gameRecord) return res.redirect('/lobby');

        var userid = user.username === gameRecord.creater ? 0 : 1;
        res.render('index', {
          userid: userid,
          username: user.username,
          howmany: gameRecord.howmany,
          maplevel: gameRecord.maplevel,
          creater: gameRecord.creater,
          gameid: gameid
        });
      });
    });
  });

  router.get('/get_map2', function(req, res) {
    res.sendFile(__dirname + '/public/map/user2.html');
  });

  router.get('/get_territories', function(req, res) {
    Territory.getAllTerritories(function(err, book) {
      if (err) res.send('Not found');
      else res.json(book);
    });
  });

  router.put('/putinfantry/:tid', function(req, res) {
    var tid = req.params.tid;
    var updateOnTerritory = {};
    Territory.putInfantry(tid, updateOnTerritory, {}, function(err, territory) {
      if (err) {
        console.log(err);
        res.send('An Error Occured');
      } else {
        res.send(territory);
      }
    });
  });

  return router;
};
