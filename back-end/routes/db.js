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


// reset many users
router.get('/set-test-db-many-users', function(req, res) {
  db.db.dropDatabase()
  // const passwordHash = bcrypt.hashSync('admin1234', 10);
  var user;
  user = new User({
    username: 'admin',
    password: 'admin1234',
    email: 'dionysisbalaskas@gmail.com',
    firstName: 'Dionysis',
    lastName: 'Balaskas',
    status: 'Active',
  });
  user.save();

  user = new User({
    username: 'admin2',
    password: 'admin1234',
    email: 'dionysisbalaskas@gmail.com',
    firstName: 'Andreas',
    lastName: 'Giannoutsos',
    status: 'Active',
  });
  user.save();

  user = new User({
    username: 'admin3',
    password: 'admin1234',
    email: 'dionysisbalaskas@gmail.com',
    firstName: 'Meropi',
    lastName: 'Fanou',
    status: 'Active',
  });
  user.save();

  user = new User({
    username: 'admin4',
    password: 'admin1234',
    email: 'dionysisbalaskas@gmail.com',
    firstName: 'Spyros',
    lastName: 'Mpriakos',
    status: 'Active',
  });
  user.save();

  user = new User({
    username: 'admin5',
    password: 'admin1234',
    email: 'dionysisbalaskas@gmail.com',
    firstName: 'Alexandra',
    lastName: 'Apostolopoulou',
    status: 'Active',
  });
  user.save();

  user = new User({
    username: 'admin6',
    password: 'admin1234',
    email: 'dionysisbalaskas@gmail.com',
    firstName: 'Mixalhs',
    lastName: 'Bourtzoumhs',
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