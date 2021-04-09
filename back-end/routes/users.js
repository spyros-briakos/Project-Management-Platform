'use strict'

const express = require("express");
const router = express.Router();
const passport = require("passport");
// const jwt = require('jsonwebtoken');
const multer = require("multer");
const utils = require("../auth/utils");

// Import User model
const { User } = require("../models/User");


// Handling of image upload
 
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
var upload = multer({ storage: storage });


// ROUTES

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Sign up user
router.post('/signup', [upload.single('image'), passport.authenticate('signup', { session: false })],
  async (req, res) => {
    // Create user's authentication token (to log in user)
    const jwt = utils.issueJWT(req.user);

    res.json({
      message: 'Signup successful',
      user: req.user,
      token: jwt.token,
      expiresIn: jwt.expires
    });
});

// Log in user
router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error(info.message);
        return next(error);
      }

      // Create user's authentication token
      const tokenObject = utils.issueJWT(user);

      return res.json({
        message: info.message,
        user: user,
        token: tokenObject
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

// Export router
module.exports = router;