'use strict'

const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require('jsonwebtoken');
// const multer = require("multer");
// const cloudinary = require("cloudinary");

// Import User model
const User = require("../models/User");


// --------------------- Image upload handling ---------------------

// // MULTER CONFIGURATION
// // Whenever a file gets uploaded we create a custom name for that file
// // The name we are giving is gonna have the current time stamp + the original name of the file
// var storage = multer.diskStorage({
// 	filename: function(req, file, callback){
// 		callback(null, Date.now() + file.originalname);
// 	}
// });
// var imageFilter = function(req, file, cb){
// 	// Accept image files only
// 	if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)){
// 		return cb(new Error("Only image files are allowed!"), false);
// 	}
// 	cb(null,true);
// };
// // We pass the configuration variables
// var upload = multer({storage: storage, fileFilter: imageFilter});

// // CLOUDINARY CONFIGURATION
// cloudinary.config({
// 	cloud_name: "meryf",
// 	api_key: process.env.CLOUDINARY_API_KEY,
// 	api_secret: process.env.CLOUDINARY_API_SECRET
// });

// USAGE
// add middleware: upload.single("image")
// and inside function add:
// // If an image file was uploaded
// if(req.file){
//   cloudinary.uploader.upload(req.file.path, async (result) => {
//     try {
//       // We want to store the image's secure_url (https://)
//       user["picture"] = {
//         url: result.secure_url,
//         public_id: result.public_id
//       }
//     } catch (err) {
//       res.status(400).json({ message: err });
//     }
//   })
// }

//------------------------------------------------------------------


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
router.post('/signup', passport.authenticate('signup', { session: false }),
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

// router.post("/login", passport.authenticate("local", 
//   {
//   //   failureRedirect: "",
//   //   failureFlash: true
//   }), async (req, res) => {
//   try {
//     // Connected user: req.user
//     console.log('Hi' + req.user.firstName + ' ' + req.user.lastName);
//     // if(req.user.plan_in_use == 'standard'){
//     // } else {
//     // }
//     res.json(req.user);
//   } catch(error) {
//     res.status(400).json({ message: error });
//   }
// })

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
    const updatedUser = await User.updateOne({ _id: req.params.userId }, { $set: req.body });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Export router
module.exports = router;