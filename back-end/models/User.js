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
    required: true,
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
  image: {
    data: Buffer,
    contentType: String,
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
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
    next();
  }
);

// Hash given password to check if it is valid
UserSchema.methods.isValidPassword = async function(password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
}

// UserSchema.plugin(passportLocalMongoose);

// User model
module.exports = mongoose.model('User', UserSchema);