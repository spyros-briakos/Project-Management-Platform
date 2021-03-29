'use strict'

const mongoose = require("mongoose");

// User Story Schema
const UserStorySchema = new mongoose.Schema({
  name: {
      type: String,
      required: true
  },
  description: String,
  label: {
      type: String,
      enum: ['issue', 'epic']
  },
  tasks: [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Task"
      }
  ],
//   creator: {     // Project's Product Owner
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User"
//   },
  status: {
      type: String,
      enum: ['toDo', 'inProgress', 'done'],
      default: 'toDo'
  },
  starting_date: Date,
  estimated_duration: {
      type: Number,
      required: true
  },
  sprints: [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Sprint"
      }
  ]
});

// User Story model
module.exports = mongoose.model('UserStory', UserStorySchema);