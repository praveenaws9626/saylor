const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  action_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = User = mongoose.model('user', UserSchema);