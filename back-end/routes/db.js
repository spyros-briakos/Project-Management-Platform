'use strict'

// IMPORT PACKAGES
const express = require('express');
const router = express.Router();

// DIONYSIS
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
const { User } = require("../models/User");
// DIONYSIS

// get system health
router.post('/health-check', function(req, res, next) {
  db.db.command({ping: 1}, function (err,result){
    console.log(result);
    if (err || !result.ok) {
      res.status(500).json(err);
      return;
    }
    res.json({ status : 'OK' });
  });
})


router.post('/set-test-db', function(req, res) {
  db.db.dropDatabase()
  // const passwordHash = bcrypt.hashSync('admin1234', 10);
  const user = new User({
    username: 'admin',
    password: 'admin1234',
    email: 'dionysisbalaskas@gmail.com',
    firstName: 'Dionysis',
    lastName: 'Balaskas',
    status: 'Active',
  });
  user.save();
  // const project
  res.json({ status : 'OK' })
})

// reset system
router.get('/reset', function(req, res) {
  db.db.dropDatabase()
  // const passwordHash = bcrypt.hashSync('admin1234', 10);
  const user = new User({
    username: 'admin',
    password: 'admin1234',
    email: 'dionysisbalaskas@gmail.com',
    firstName: 'Dionysis',
    lastName: 'Balaskas',
    status: 'Active',
  });
  user.save();
  res.json({ status : 'OK' })
})

module.exports = router;