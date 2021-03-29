'use strict'

const mongoose = require("mongoose");

// Report Schema
const ReportSchema = new mongoose.Schema({
  author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date: {
      type: Date,
      default: Date.now
  },
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task"
  },
  comments: [
      {
          comment: {
              type: String,
              required: true
          },
          author: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User"
          },
          date: {
              type: Date,
              default: Date.now
          }
      }
  ]
});

// Report model
module.exports = mongoose.model('Report', ReportSchema);