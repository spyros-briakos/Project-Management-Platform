'use strict'

const express = require("express");
const router = express.Router();

// Import Report model
const Report = require("../models/Report");

// Get all reports
router.get("/", async (req, res) => {
  try {
    const reports = await Report.find({});
    res.json(reports);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Create report
router.post("/", async (req, res) => {
  try {
    const report = new Report(req.body);
    const savedReport = await report.save();
    res.json(savedReport);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Get specific report
router.get('/:reportId', async (req, res) => {
  try {
    const report = await Report.findById(req.params.reportId);
    res.json(report);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Delete specific report
router.delete('/:reportId', async (req, res) => {
  try {
    const removedReport = await Report.remove({ _id: req.params.reportId });
    res.json(removedReport);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Update specific report
router.patch('/:reportId', async (req, res) => {
  try {
    const updatedReport = await Report.updateOne({ _id: req.params.reportId }, { $set: req.body });
    res.json(updatedReport);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Export router
module.exports = router;