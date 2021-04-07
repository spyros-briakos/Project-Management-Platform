'use strict'

const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require('jsonwebtoken');
const multer = require("multer");

// Import User model
const User = require("../models/User");


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
  async (req, res, next) => {
    res.json({
      message: 'Signup successful',
      user: req.user
    });
});

// Login user
router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error('An error occurred.');
        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

          const body = { _id: user._id, email: user.email };
          const token = jwt.sign({ user: body }, 'TOP_SECRET');

          return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

// Get specific user
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Delete specific user
router.delete('/:userId', async (req, res) => {
  try {
    const removedUser = await User.remove({ _id: req.params.userId });    // User.remove is deprecated!!!!!!!
    res.json(removedUser);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Update specific user
router.patch('/:userId', async (req, res) => {
  try {
    const updatedUser = await User.updateOne({ _id: req.params.userId }, { $set: req.body }, { runValidators: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Export router
module.exports = router;