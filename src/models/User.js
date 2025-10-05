const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2
  },
  username: {
    type: String,
    required: true,
    minlength: 5,
    unique: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
