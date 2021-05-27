'use strict'

const mongoose = require("mongoose");

// Project schema
const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  productOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  scrumMaster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  sprints: [
    {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Sprint"
		}
  ],
  userStories: [
    {
			type: mongoose.Schema.Types.ObjectId,
			ref: "UserStory"
		}
  ],
  members: [
    {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
  ],
  status: {
    type: String,
    enum: ['inProgress', 'done'],
    default: 'inProgress',
  },
  // Plan of the project that, specifies the user rights
  plan_in_use: {
    type: String,
    enum: ['standard', 'premium'],
    default: 'standard'
  },
  startingDate: {
    type: Date,
    default: Date.now
  },
  endingDate: Date,
});

// Project model
module.exports = mongoose.model('Project', ProjectSchema);

