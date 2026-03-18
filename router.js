module.exports = function(app, io, db) {
  var express = require('express');
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

  require('./lobby')(io, db);

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

  router.get('/lobby', function(req, res) {
    withAuthenticatedUser(req, res, function(user) {
      res.render('lobby', { username: user.username });
    });
  });

  router.get('/newgame', function(req, res) {
    withAuthenticatedUser(req, res, function(user) {
      res.render('creategame', { username: user.username });
    });
  });

  router.get('/lobby/:gameid', function(req, res) {
    withAuthenticatedUser(req, res, function(user) {
      var gameid = String(req.params.gameid);
      var lobby = LobbyStore.getLobby(gameid);

      if (!lobby) return res.redirect('/lobby');

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
      var err = new Error('Passwords do not match.');
      err.status = 400;
      res.send('passwords dont match');
      return next(err);
    }

    if (req.body.email && req.body.username && req.body.password && req.body.passwordConf) {
      var userData = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        passwordConf: req.body.passwordConf
      };

      User.create(userData, function(error, user) {
        if (error) return next(error);
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
      var err = new Error('All fields required.');
      err.status = 400;
      return next(err);
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

      if (lobby) {
        if (!LobbyStore.isParticipant(gameid, user.username)) return res.redirect('/lobby');
        if (!lobby.started) return res.redirect('/lobby/' + gameid);
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
