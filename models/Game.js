const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  player_id: {
    type: String,
    required: true
  },
  winner: {
    required: true,
    type: String
  },
  description: {
    required: true,
    type: String
  },
  action_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = Game = mongoose.model('game', GameSchema);