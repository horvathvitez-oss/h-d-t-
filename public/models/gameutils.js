const mongoose = require('mongoose');

const Mixed = mongoose.Schema.Types.Mixed;

const gameutilsSchema = new mongoose.Schema({
  gameid: { type: Number, required: true, unique: true },
  phase: { type: String, default: 'WAITING_FOR_PLAYERS' },
  currentplayer: { type: Number, default: -1 },
  players: { type: [Number], required: true },
  playernames: { type: [String], required: true },
  gamefinish: { type: Boolean, default: false, required: true },
  howmany: { type: Number, required: true },
  maplevel: { type: String, required: true },
  creater: { type: String, required: true },
  baseOrder: { type: [Number], default: [] },
  orderCycle: { type: [[Number]], default: [] },
  baseSelectionIndex: { type: Number, default: 0 },
  expansionRound: { type: Number, default: 0 },
  expansionCycleIndex: { type: Number, default: 0 },
  battleRound: { type: Number, default: 0 },
  battleTurnIndex: { type: Number, default: 0 },
  currentOrder: { type: [Number], default: [] },
  pendingSelections: { type: Mixed, default: {} },
  reservedTerritories: { type: [Number], default: [] },
  activeQuestion: { type: Mixed, default: null },
}, { minimize: false });

const Gameutils = module.exports = mongoose.model('Gameutils', gameutilsSchema);

module.exports.addGameUtil = function addGameUtil(gameutil, callback) {
  return Gameutils.create(gameutil, callback);
};

module.exports.getGameByID = function getGameByID(gameid, callback) {
  return Gameutils.findOne({ gameid }).exec(callback);
};

module.exports.updateGame = function updateGame(gameid, update, callback) {
  return Gameutils.findOneAndUpdate({ gameid }, update, { new: true }, callback);
};

module.exports.deleteGame = function deleteGame(gameid, callback) {
  return Gameutils.deleteOne({ gameid }, callback);
};
module.exports.getOnlineGames = function(whichgames, callback){
  Gameutils.find(whichgames, callback).select('-_id');
};

module.exports.getGameByID = function(gameid, callback){
  Gameutils.findOne({ gameid: gameid }, callback).select('-_id');
};

module.exports.getCurrentGameid = function(gameid, callback){
  Gameutils.find({ gameid: gameid }, callback).select('gameid -_id').limit(1);
};

module.exports.getCurrentPlayer = function(gameid, callback){
  Gameutils.find({ gameid: gameid }, callback).select('currentplayer players -_id').limit(1);
};