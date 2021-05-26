'use strict'

const mongoose = require("mongoose");

// User Story Schema
const UserStorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  // Type of user story. 'Issue' is referred to small user stories and 'epic' is referred to all the others
  label: {
    type: String,
    enum: ['issue', 'epic']
  },
  // Tasks that are needed for the story to be implemented
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task"
    }
  ],
  status: {
      type: String,
      enum: ['toDo', 'inProgress', 'done'],
      default: 'toDo'
  },
  starting_date: Date,
  ending_date: Date,
  estimated_duration: {
    type: Number,
    // required: true
  },
  // Sprints in which the user story is predicted to be implemented
  sprints: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sprint"
    }
  ]
});

// User Story model
module.exports = mongoose.model('UserStory', UserStorySchema);