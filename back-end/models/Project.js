'use strict'

const mongoose = require("mongoose");

// Project schema
const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
  startingDate: {
    type: Date,
    default: Date.now
  },
  endingDate: Date,
});

// Project model
module.exports = mongoose.model('Project', ProjectSchema);

