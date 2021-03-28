'use strict'

const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

// Check email type
require("mongoose-type-email");

// User schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
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
    required: true
  },
	picture: {
		url: {
			type: String,
			default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZL12v4NCVMfrCwtG1huVb4zXxrVIu-ibumA&usqp=CAU"
		},
		public_id: {
			type: String,
			default: "Default"
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
    default: 'standard',
    required: true
  },
  premium_ending_date: Date
});

UserSchema.plugin(passportLocalMongoose);

// User model
module.exports = mongoose.model('User', UserSchema);