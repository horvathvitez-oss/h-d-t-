const mongoose = require('mongoose');

const playersSchema = new mongoose.Schema({
  gameid: { type: Number, required: true, index: true },
  pid: { type: Number, required: true },
  name: { type: String, required: true },
  territories: { type: [Number], default: [] },
  score: { type: Number, default: 0 },
  defenseBonus: { type: Number, default: 0 },
  castleCaptureBonus: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  eliminated: { type: Boolean, default: false },
  connected: { type: Boolean, default: false },
}, { minimize: false });

playersSchema.index({ gameid: 1, pid: 1 }, { unique: true });

const Players = module.exports = mongoose.model('Players', playersSchema);

module.exports.createPlayers = function createPlayers(players, callback) {
  return Players.insertMany(players, { ordered: true }, callback);
};

module.exports.getPlayersByGame = function getPlayersByGame(gameid, callback) {
  return Players.find({ gameid }).sort({ pid: 1 }).exec(callback);
};

module.exports.getPlayer = function getPlayer(where, callback) {
  return Players.findOne({ gameid: where.gameid, pid: where.playerid ?? where.pid }).exec(callback);
};

module.exports.updatePlayer = function updatePlayer(where, update, callback) {
  return Players.findOneAndUpdate(
    { gameid: where.gameid, pid: where.playerid ?? where.pid },
    update,
    { new: true },
    callback,
  );
};

module.exports.updateManyPlayers = function updateManyPlayers(filter, update, callback) {
  return Players.updateMany(filter, update, callback);
};

module.exports.deleteGamePlayers = function deleteGamePlayers(gameid, callback) {
  return Players.deleteMany({ gameid }, callback);
};
