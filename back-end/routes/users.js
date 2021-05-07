'use strict'

const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const utils = require("../auth/utils");
const verify = require("../auth/verify_email");
const googleUtil = require("../auth/google-util");
const queryString = require("query-string");

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
    // Send verification to the user's email
    verify.sendVerificationEmail(req.user.username, req.user.email, req.user.verificationCode);

    res.json({
      message: 'Signup successful!\nWe sent you a verification email. Please check your Gmail!',
      user: {
        username: req.user.username,
        email: req.user.email
      }
    });
});

// Verified user via email
router.get('/verify/:verificationCode', async (req, res) => {
  // Find the user in db with the passed verification code
  User.findOne({ verificationCode: req.params.verificationCode })
    .then(async (user) => {
      // If no such user in the db
      if(!user) {
        res.status(400).json({ message: 'User not found.' });
      }
      // If the account is already active
      if(user.status == 'Active') {
        res.status(400).json({ message: 'Account already verified and active.' });
      }

      // Update user's status & delete their verification code
      await User.updateOne({ _id: user._id }, { $set: { status: 'Active' } , $unset: { verificationCode: "" } }, { runValidators: true });

      // Create user's authentication token (to log in user)
      const tokenObject = utils.issueJWT(user);
      // console.log(tokenObject.token);

      res.json({ message: 'Your email was verified successfully. Welcome to ScruManiac!' });
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    })
});

// Log in user
router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      // If there was an error
      if (err || !user) {
        res.statusCode = 500
        return res.json({ message: info.message });
      }

      // Create user's authentication token
      const tokenObject = utils.issueJWT(user);

      return res.json({
        message: info.message,
        user: {
          username: user.username,
          email: user.email
        },
        token: tokenObject
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

// Get url to sign up user with google
router.get('/signup-google', async(req, res) => {
  var url = googleUtil.getConnectionUrl_Signup();
  res.json({ url: url });
});

// Google-signup callback
router.get('/oauth2callback/signup', async(req, res) => {
  // Get url parameters (google returned a 'code' parameter)
  const urlParams = queryString.parse(req._parsedUrl.search);

  if (urlParams.error) {
    console.log(`An error occurred: ${urlParams.error}`);
  } else {
    try{
      // Get 'code' parameter
      const code = urlParams.code;

      // Exchange 'code' with the user's email & profile info
      const userInfo = await googleUtil.getUserDetails_Signup(code);

      // Generate a unique, random username (will be ScrumManiacX, where X is a number)
      const username = await utils.generateUsername();

      // Create new user with the retrieved data
      const user = new User({
        username: username,
        firstName: userInfo.given_name,
        lastName: userInfo.family_name,
        email: userInfo.email,
        status: 'Active'
      });

      user.image.url = userInfo.picture;

      const savedUser = await user.save();

      // Create user's authentication token (to log in user)
      const jwt = utils.issueJWT(savedUser);

      console.log(jwt.token);

      res.json({
        message: 'Your Account was created successfully! You are now logged in.'
        // user: {
        //   username: user.username,
        //   email: user.email
        // },
        // token: jwt.token
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  }
});

// Get url to log in user with google
router.get('/login-google', async(req, res) => {
  var url = googleUtil.getConnectionUrl_Login();
  res.json({ url: url });
});

// Google-login callback
router.get('/oauth2callback/login', async(req, res) => {
  // Get url parameters (google returned a 'code' parameter)
  const urlParams = queryString.parse(req._parsedUrl.search);

  if (urlParams.error) {
    console.log(`An error occurred: ${urlParams.error}`);
  } else {
    try{
      // Get 'code' parameter
      const code = urlParams.code;

      // Exchange 'code' with the user's email
      const userInfo = await googleUtil.getUserDetails_Login(code);

      // Find user in db
      const [ user ] = await User.find({ email: userInfo.email });

      // If no such user in the db
      if(!user) {
        res.status(500).json({ message: 'User not found' });
      }

      // Create user's authentication token (to log in user)
      const jwt = utils.issueJWT(user);

      console.log(jwt.token);

      res.json({
        message: 'Logged in Successfully'
        // user: {
        //   username: user.username,
        //   email: user.email
        // },
        // token: jwt.token
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  }
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