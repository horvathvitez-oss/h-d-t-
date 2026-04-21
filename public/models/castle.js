const mongoose = require('mongoose');

const MAX_CASTLE_HP = 3;

const castleSchema = new mongoose.Schema({
  gameid: { type: Number, required: true, index: true },
  pid: { type: Number, required: true },
  tid: { type: Number, required: true },
  hp: { type: Number, default: MAX_CASTLE_HP, min: 0, max: MAX_CASTLE_HP },
  active: { type: Boolean, default: true },
}, { minimize: false });

castleSchema.index({ gameid: 1, pid: 1 }, { unique: true });
castleSchema.index({ gameid: 1, tid: 1 }, { unique: true });

const Castle = module.exports = mongoose.model('Castle', castleSchema);

module.exports.createCastle = function createCastle(castle, callback) {
  return Castle.create(castle, callback);
};

module.exports.getCastlesByGame = function getCastlesByGame(gameid, callback) {
  return Castle.find({ gameid }).sort({ pid: 1 }).exec(callback);
};

module.exports.getCastleByTid = function getCastleByTid(gameid, tid, callback) {
  return Castle.findOne({ gameid, tid }).exec(callback);
};

module.exports.getCastleByPid = function getCastleByPid(gameid, pid, callback) {
  return Castle.findOne({ gameid, pid }).exec(callback);
};

module.exports.updateCastle = function updateCastle(filter, update, callback) {
  return Castle.findOneAndUpdate(filter, update, {
    new: true,
    runValidators: true
  }, callback);
};

module.exports.deleteGameCastles = function deleteGameCastles(gameid, callback) {
  return Castle.deleteMany({ gameid }, callback);
};
