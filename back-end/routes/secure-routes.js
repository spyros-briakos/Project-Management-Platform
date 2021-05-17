const express = require('express');
const router = express.Router();
const utils = require("../auth/utils");
const send_email = require("../auth/send_email");
const jwt = require('jsonwebtoken');

// Import User model
const { User } = require("../models/User");
// Import InvalidToken model (created after a user logs out)
const { InvalidToken } = require("../models/User");


// Get specific user
router.get('/user', async (req, res) => {
  try {
    // Find user in db
    const user = await User.findById(req.user._id);

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Log out user
router.get('/logout', async(req, res) => {
  try {
    // After the user logs out, their token will be left in the system
    // So it should be marked as invalid until it expires (1 day max)
    const token = new InvalidToken({ value: utils.extractToken(req) });
    await token.save();

    req.logout();
    res.json({ message: 'Επιτυχής αποσύνδεση.' });
  } catch (error) {
    res.json({ message: error });
  }
});

// // Get all invalid tokens
// router.get('/tokens', async(req, res) => {
//   try {
//     const tokens = await InvalidToken.find({});
//     res.json(tokens);
//   } catch (error) {
//     res.status(400).json({ message: error });
//   }
// });

// Update specific user
router.patch('/edit-user', async (req, res) => {
  try {
    // If a new email was given by the user
    if(req.body.email && req.body.email != req.user.email) {
      // Create a verification code for the user (will be deleted after the new email address is verified)
      const verificationCode = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET);

      // The account will be pending until the new email is verified
      req.body['status'] = 'Pending';
      req.body['verificationCode'] = verificationCode;

      // Update user
      const updatedUser = await User.updateOne({ _id: req.user._id }, { $set: req.body }, { runValidators: true });
      const user = await User.findById(req.user._id);

      // Send verification to the user's email
      send_email.sendVerificationEmail(req.user.username, req.body.email, verificationCode);

      // Log out the user until the new email is verified
      const token = new InvalidToken({ value: utils.extractToken(req) });
      await token.save();
      req.logout();

      res.json({
        message: 'Ο λογαριασμός σου ενημερώθηκε με επιτυχία.\nΣου στείλαμε email επιβεβαίωσης. Παρακαλούμε δες το Gmail σου!',
        user: {
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          projects: user.projects,
          plan_in_use: user.plan_in_use
        },
        email: 'updated'
      });
    }
    else {
      // Update user
      const updatedUser = await User.updateOne({ _id: req.user._id }, { $set: req.body }, { runValidators: true });
      const user = await User.findById(req.user._id);

      res.json({
        message: 'Ο λογαριασμός σου ενημερώθηκε με επιτυχία.',
        user: {
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          projects: user.projects,
          plan_in_use: user.plan_in_use
        }
      });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Reset user's password
router.patch('/reset-password', async (req, res) => {
  try {
    // Find user in db
    const user = await User.findById(req.user._id);

    // If no such user
    if(!user) {
      return res.status(400).json({ message: 'Δεν βρέθηκε τέτοιος χρήστης.' });
    }

    // Check the right password was passed
    const validate = await user.isValidPassword(req.body.old);

    // If the given password was wrong
    if(!validate) {
      return res.status(400).json({ message: 'Σφάλμα: λάθος κωδικός πρόσβασης.' });
    }

    // If the new password and the confirmation don't match
    if(req.body.new !== req.body.confirm) {
      return res.status(400).json({ message: 'Σφάλμα: ο νέος κωδικός πρόσβασης και η επιβεβαίωσή του διαφέρουν.' });
    }

    // Update user's password
    user.password = req.body.new;
    // Save it so that the new password will be hashed
    const saved = await user.save();

    res.json({ message: 'Επιτυχής ενημέρωση του κωδικού πρόσβασης.' });

  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Upgrade user's plan to premium
router.patch('/upgrade-plan', async (req, res) => {
  try {
    /// Find user
    const user = await User.findById(req.user._id);

    // If no such user in the db
    if(!user) {
      return res.status(400).json({ message: 'Δεν βρέθηκε τέτοιος χρήστης.' });
    }

    // If user's plan is already premium
    if(user.plan_in_use === 'premium') {
      const ending_date = user.premium_ending_date.toLocaleDateString();
      return res.status(400).json({ message: `Ο λογαριασμός σου είναι ήδη προνομιούχος και λήγει στις ${ending_date}.` });
    }

    // Get today's date
    const today = new Date();

    // If the user wants to be premium for a month
    if(req.body.plan_in_use === 'month') {
      req.body.premium_ending_date = today.add(1).month();
    // If the user wants to be premium for a year
    } else if(req.body.plan_in_use === 'year') {
      req.body.premium_ending_date = today.add(12).month();
    }

    // Keep only the premium value after setting the expiration date
    req.body.plan_in_use = 'premium';

    // Upgrade user's plan
    const updatedUser = await User.updateOne({ _id: req.user._id }, { $set: { plan_in_use: req.body.plan_in_use, premium_ending_date: req.body.premium_ending_date } }, { runValidators: true });
    user = await User.findById(req.user._id);

    res.json({
      message: 'Ο λογαριασμός σου αναβαθμίστηκε με επιτυχία σε προνομιούχος!',
      user: {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        projects: user.projects,
        plan_in_use: user.plan_in_use
      }
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Delete specific user
router.delete('/delete-user', async (req, res) => {
  try {
    // Delete user from db
    const removedUser = await User.deleteOne({ _id: req.user._id });

    // Mark user's auth token as invalid
    const token = new InvalidToken({ value: utils.extractToken(req) });
    await token.save();
    // Log out user
    req.logout();

    res.json({ message: 'Επιτυχής διαγραφή λογαριασμού.' });
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

module.exports = router;