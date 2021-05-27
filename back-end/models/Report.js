'use strict'

const mongoose = require("mongoose");

// Report Schema
const ReportSchema = new mongoose.Schema({
  // Report's author
  author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
  },
  // Report's title
  title: {
    type: String,
    required: true
  },
  // Report's content
  text: {
    type: String,
    required: true
  },
  // Publish date
  date: {
      type: Date,
      default: Date.now
  },
  // Referred task
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task"
  },
  // Its comments. It might be empty
  comments: [
      {
          // Comment's content
          comment: {
              type: String,
              required: true
          },
          // Comment's author
          author: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User"
          },
          // Publish date
          date: {
              type: Date,
              default: Date.now
          }
      }
  ]
});

// Report model
module.exports = mongoose.model('Report', ReportSchema);