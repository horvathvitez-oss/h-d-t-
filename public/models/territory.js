const mongoose = require('mongoose');

const territorySchema = new mongoose.Schema({
  gameid: { type: Number, required: true, index: true },
  tid: { type: Number, required: true },
  continent: { type: Number, required: true },
  tname: { type: String, required: true },
  neighbors: { type: [Number], required: true },
  ownsto: { type: Number, default: -1, required: true },
}, { minimize: false });

territorySchema.index({ gameid: 1, tid: 1 }, { unique: true });

const Territory = module.exports = mongoose.model('Territory', territorySchema);

module.exports.createTerritories = function createTerritories(territories, callback) {
  return Territory.insertMany(territories, { ordered: true }, callback);
};

module.exports.getAllTerritories = function getAllTerritories(gameid, callback) {
  return Territory.find({ gameid }).sort({ tid: 1 }).exec(callback);
};

module.exports.getByTid = function getByTid(where, callback) {
  return Territory.findOne({ gameid: where.gameid, tid: where.tid }).exec(callback);
};

module.exports.updateTerritory = function updateTerritory(where, update, callback) {
  return Territory.findOneAndUpdate(
    { gameid: where.gameid, tid: where.tid },
    update,
    { new: true },
    callback,
  );
};

module.exports.updateManyTerritories = function updateManyTerritories(filter, update, callback) {
  return Territory.updateMany(filter, update, callback);
};

module.exports.deleteGameTerritories = function deleteGameTerritories(gameid, callback) {
  return Territory.deleteMany({ gameid }, callback);
};
