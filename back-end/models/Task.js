'use strict'

const mongoose = require("mongoose");

// Task Schema
const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  // User story in which task is contained
  userStory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserStory",
    required: true
  },
  // Sprint in which task is contained
  sprint: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sprint"
  },
  //   creator: {     // Project's Product Owner
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "User"
  //   },
  status: {
    type: String,
    enum: ['toDo', 'inProgress', 'done'],
    default: 'toDo',
  },
  startingDate: Date,
  endingDate: Date,
  estimated_duration:  Number,
  // Members of the team on who the task is assigned
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  beforeTasks: [
    {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Task"
		}
  ],
  afterTasks: [
    {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Task"
		}
  ],
});

// Task model
module.exports = mongoose.model('Task', TaskSchema);