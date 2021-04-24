'use strict'

const express = require("express");
const router = express.Router();
const passport = require("passport");
// const jwt = require('jsonwebtoken');
const multer = require("multer");
const utils = require("../auth/utils");
const verify = require("../auth/verify_email");

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
    // // Create user's authentication token (to log in user)
    // const jwt = utils.issueJWT(req.user);

    verify.sendVerificationEmail(req.user.username, req.user.email, req.user.verificationCode);

    res.json({
      message: 'Signup successful!\n We sent you a verification email. Please check your gmail!',
      user: req.user
      // token: jwt.token,
      // expiresIn: jwt.expires
    });
});

// Verified user via email
router.get('/verify/:verificationCode', async (req, res, next) => {
  User.findOne({ verificationCode: req.params.verificationCode })
    .then(async (user) => {
      if(!user) {
        res.status(400).json({ message: 'User not found' });
      }

      // Update user's status
      user.status = "Active";
      const savedUser = await user.save();

      // Create user's authentication token (to log in user)
      const jwt = utils.issueJWT(user);

      console.log(jwt.token);

      res.json({
        message: 'Your Account was created successfully! You are now logged in.'
        // user: user,
        // token: jwt.token,
        // expiresIn: jwt.expires
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: err });
    })
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

// router.delete('/delete-user', async (req, res) => {
//   try {
//     // Delete user from db
//     const removedUser = await User.deleteOne({ id: req.params.id });

//     // // Mark user's auth token as invalid
//     // const token = new InvalidToken({ value: utils.extractToken(req) });
//     // await token.save();
//     // Log out user
//     req.logout();

//     res.json({
//       result: removedUser,
//       message: 'Deleted user successfully'
//     });
//   } catch (error) {
//     res.status(400).json({ message: error });
//   }
// })

// Export router
module.exports = router;