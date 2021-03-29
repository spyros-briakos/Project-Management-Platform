'use strict'

const mongoose = require("mongoose");

// Sprint Schema
const SprintSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
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
    default: 'toDo',
  },
  starting_date: Date,
  ending_date: Date,
  estimated_duration: {
    type: Number,
    default: 14
  },
  // members: [
  //     {
  //         type: mongoose.Schema.Types.ObjectId,
  //         ref: "User"
  //     }
  // ]
});

// Sprint model
module.exports = mongoose.model('Sprint', SprintSchema);