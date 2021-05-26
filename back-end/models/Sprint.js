'use strict'

const mongoose = require("mongoose");

// Sprint Schema
const SprintSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  description: String,
  // Tasks that are scheduled to be done in the specific sprint
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task"
    }
  ],
  status: {
    type: String,
    enum: ['toDo', 'inProgress', 'done'],
    default: 'toDo',
  },
  starting_date: Date,
  ending_date: Date,
  // Estimated duration of sprint. Counting in days
  estimated_duration: {
    type: Number,
    default: 14
  },
});

// Sprint model
module.exports = mongoose.model('Sprint', SprintSchema);