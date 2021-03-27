'use strict'

const mongoose = require("mongoose");

// User schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
});

// User model
module.exports = mongoose.model('User', UserSchema);
