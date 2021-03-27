'use strict'

const mongoose = require("mongoose");

const IN_PROGRESS = "In Progress"
const DONE = "Done"

// Project schema
const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  productOwner: {
    type: String,
    required: true,
  },
  scrumMaster: {
    type: String,
    required: true,
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
			ref: "Member"
		}
  ],
  status: {
    type: String,
    required: true,
    default: IN_PROGRESS
  },
  startingDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  endingDate: Date,
});

// Project model
module.exports = mongoose.model('Project', ProjectSchema);

