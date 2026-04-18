var mongoose = require('mongoose');
var bcrypt = require('bcryptjs')

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  passwordConf: {
    type: String,
    required: true,
  },
  isonline: {
    type:Boolean,
    default: false,
    required: false
  },
  randomMatchmakingWins: {
    type: Number,
    default: 0,
    required: false
  },
  randomMatchmakingGames: {
    type: Number,
    default: 0,
    required: false
  }
});


//authenticate input against database
UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    console.log("selam");
    user.password = hash;
    next();
  })
});

var User = module.exports = mongoose.model('User', UserSchema );

var leaderboardCollator = new Intl.Collator('hu', { sensitivity: 'base' });

function normalizeLeaderboardNumber(value) {
  var number = Number(value || 0);
  return Number.isFinite(number) && number > 0 ? number : 0;
}

function buildLeaderboardRows(users) {
  return (Array.isArray(users) ? users : [])
    .map(function(user) {
      return {
        username: String((user && user.username) || '').trim(),
        randomMatchmakingWins: normalizeLeaderboardNumber(user && user.randomMatchmakingWins),
        randomMatchmakingGames: normalizeLeaderboardNumber(user && user.randomMatchmakingGames)
      };
    })
    .filter(function(user) {
      return Boolean(user.username);
    })
    .sort(function(a, b) {
      var winDiff = b.randomMatchmakingWins - a.randomMatchmakingWins;
      if (winDiff !== 0) return winDiff;
      return leaderboardCollator.compare(a.username, b.username);
    })
    .map(function(user, index) {
      user.rank = index + 1;
      return user;
    });
}

User.getRandomMatchmakingLeaderboardData = async function(viewerUsername) {
  var users = await this.find({}).select('username randomMatchmakingWins randomMatchmakingGames -_id').lean();
  var rows = buildLeaderboardRows(users);
  var top20 = rows.slice(0, 20);
  var viewer = null;
  var normalizedViewerUsername = String(viewerUsername || '').trim();

  if (normalizedViewerUsername) {
    viewer = rows.find(function(row) {
      return row.username === normalizedViewerUsername;
    }) || null;
  }

  return {
    top5: top20.slice(0, 5),
    top20: top20,
    totalPlayers: rows.length,
    viewer: viewer
  };
};

// Make a User Online
module.exports.setOnline = function(where, updateOnUser, options, callback){
  //updateOnUser = {isonline:true};
  User.findOneAndUpdate(where, updateOnUser, {new: true},callback); // It returns the updated version
}

// Get Book by Genre it only gets 1 as limit
module.exports.getOnlines = function(where, callback){
  User.find(where, callback).select('username -_id');
}


// Get Book by Genre it only gets 1 as limit
module.exports.getUser = function(where, callback){
  User.find(where, callback).select(' -_id').limit(1);
}


module.exports.setOffline = function(where, updateOnUser, options, callback){
  //updateOnUser = {isonline:true};
  User.findOneAndUpdate(where, updateOnUser, {new: true},callback); // It returns the updated version
}