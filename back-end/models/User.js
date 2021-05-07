'use strict'

const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

// Check email type
require("mongoose-type-email");

// User schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 4
  },
  password: {
    type: String,
    minLength: 8
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Active'],
    default: 'Pending'
  },
  verificationCode: {
    type: String,
    unique: true
  },
  image: {
    data: Buffer,
    contentType: {
      type: String,
      default: 'string'
    },
		url: {
			type: String,
			default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZL12v4NCVMfrCwtG1huVb4zXxrVIu-ibumA&usqp=CAU"
		}
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project"
    }
  ],
  plan_in_use: {
    type: String,
    enum: ['standard', 'premium'],
    default: 'standard'
  },
  premium_ending_date: Date
});

// Hash the user's password before saving the user in the db
UserSchema.pre('save', async function(next) {
  if(this.password){
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;
    next();
  }
});

// Hash given password to check if it is valid
UserSchema.methods.isValidPassword = async function(password) {
  const compare = await bcrypt.compare(password, this.password);

  return compare;
}

// Save invalid tokens in the systems until they expire
const InvalidTokenSchema = new mongoose.Schema({
  value: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create TTL Index (expire token 1 day after it was created)
InvalidTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds:86400 });

// User model
const User = mongoose.model('User', UserSchema);
// InvalidToken model
const InvalidToken = mongoose.model('InvalidToken', InvalidTokenSchema);

module.exports = {
  User: User,
  InvalidToken: InvalidToken
}