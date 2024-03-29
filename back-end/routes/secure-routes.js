'use strict'

// IMPORT PACKAGES
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const multer = require("multer");
const utils = require("../auth/utils");
const send_email = require("../auth/send_email");
const serializer = require("../serializers/users");

// Import User model
const { User } = require("../models/User");
// Import InvalidToken model (created after a user logs out)
const { InvalidToken } = require("../models/User");
// Import Invitation model (for invitations to a project)
const { Invitation } = require("../models/User");
// Import Project model
const Project = require('../models/Project');
// Import Sprint model
const Sprint = require('../models/Sprint');
// Import User Story model
const UserStory = require('../models/UserStory');
// Import Task model
const Task = require('../models/Task');


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


// Get specific user
router.get('/user', async (req, res) => {
  try {
    // Get serialized user
    const context = await serializer.userSerializer(req.user._id);

    res.json({ user: context });
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Get user's invitations
router.get('/invitations', async(req, res) => {
  try {
    // Get serialized user
    const context = await serializer.userSerializer(req.user._id);

    // Keep only the needed info for each invitation
    let invitations = [];
    for(var invitation of context.invitations) {
      invitations.push({
        sender: invitation.sender,
        project: invitation.project,
        date: invitation.date
      });
    }

    res.json({
      invitations: invitations,
      user: context
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

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
  
      // // If an image was uploaded, save it locally
      // if(req.file) {
      //   req.body.image.data = fs.readFileSync(path.join(__dirname + '../uploads' + req.file.filename));
      //   req.body.image.contentType = 'image/png';
      // }

      // Update user
      const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, { runValidators: true, new: true });

      // Get serialized user
      const context = await serializer.userSerializer(updatedUser);

      // Send verification to the user's email
      send_email.sendVerificationEmail(context.username, context.email, verificationCode);

      // Log out the user until the new email is verified
      const token = new InvalidToken({ value: utils.extractToken(req) });
      await token.save();
      req.logout();

      res.json({
        status: 'OK', 
        message: 'Ο λογαριασμός σου ενημερώθηκε με επιτυχία.\nΣου στείλαμε email επιβεβαίωσης. Παρακαλούμε δες το Gmail σου!',
        user: context,
        email: 'updated'
      });
    }
    else {
      // // If an image was uploaded, save it locally
      // if(req.file) {
      //   req.body.image.data = fs.readFileSync(path.join(__dirname + '../uploads' + req.file.filename));
      //   req.body.image.contentType = 'image/png';
      // }
      console.log(req.file);

      // Update user
      const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, { runValidators: true, new: true });

      // Get serialized user
      const context = await serializer.userSerializer(updatedUser);

      res.json({
        message: 'Ο λογαριασμός σου ενημερώθηκε με επιτυχία.',
        user: context
      });
    }
  } catch (error) {
    console.log(error);
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
      return res.status(400).json({ message: 'Σφάλμα: Δεν βρέθηκε τέτοιος χρήστης.' });
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

    res.json({ status: 'OK', message: 'Επιτυχής ενημέρωση του κωδικού πρόσβασης.' });

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
      return res.status(400).json({ message: 'Σφάλμα: Δεν βρέθηκε τέτοιος χρήστης.' });
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
    const updatedUser = await User.findByIdAndUpdate(req.user._id, { plan_in_use: req.body.plan_in_use, premium_ending_date: req.body.premium_ending_date }, { runValidators: true, new: true });

    // Get serialized user
    const context = await serializer.userSerializer(updatedUser);

    res.json({
      status: 'OK', 
      message: 'Ο λογαριασμός σου αναβαθμίστηκε με επιτυχία σε προνομιούχος!',
      user: context
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Delete specific user
router.delete('/delete-user', async (req, res) => {
  try {
    // Serialize user
    const user = await serializer.userSerializer(req.user);

    // For the user's each project
    for(var project of user.projects) {
      // If current user is the product owner of the project, the whole project will be deleted
      if(user._id.equals(project.productOwner._id)) {
        // Remove project from all members' projects lists (except the product owner)
        for (let memberObj of project.members) {
          if (!memberObj._id.equals(user._id)) {
            const member = await User.findById(memberObj._id);
            member.projects = member.projects.filter((pID) => { return !pID.equals(project._id) });

            // Update member's info
            await User.findByIdAndUpdate(member._id, { projects: member.projects }, { runValidators: true });
          }
        }

        // Delete project
        for (let i in project.sprints) {
          await Sprint.deleteOne({ _id: project.sprints[i] });
        }
        for (let i in project.userStories) {
          const userStory = await UserStory.findById(project.userStories[i]);
          for (let j in project.tasks) {
            await Task.deleteOne({ _id: userStory.tasks[j] });
          }
          await UserStory.deleteOne({ _id: userStory._id });
        }
        // Remove project from db
        const removedProject = await Project.deleteOne({ _id: project._id });
      } else {
        // Remove user from current project
        project.members = project.members.filter((member) => { return !member._id.equals(user._id) });

        // Keep only the ids of the rest of the members
        const members = [];
        for(var member of project.members)
          members.push(member._id);

        // Update project
        await Project.findByIdAndUpdate(project._id, { members: members }, { runValidators: true });
      }
    }

    // For the user's each invitation
    for(var invitationId of req.user.invitations) {
      // Delete invitation from the db
      await Invitation.deleteOne({ _id: invitationId });
    }

    // Delete user from db
    await User.deleteOne({ _id: req.user._id });

    // Mark user's auth token as invalid
    const token = new InvalidToken({ value: utils.extractToken(req) });
    await token.save();
    // Log out user
    req.logout();

    res.json({ status: 'OK', message: 'Επιτυχής διαγραφή λογαριασμού.' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
})

// Invite user(s) to a specific project
router.post('/project-invite/:projectId', async(req, res) => {
  try {
    const sent = [];

    // For each user specified in the request
    for (let username of req.body.users) {
        // Find user in the db
        const user = await User.findOne({ username: username }).exec();

        // If no such user in the db
        if(!user) {
          if(sent.length > 0) {
            const users = set.toString();
            return res.status(400).json({ message: `Δεν βρέθηκε χρήστης με το username ${username}.\nΣτάλθηκε πρόσκληση στον χρήστη ${users}.` });
          } else if(sent.length > 1) {            
            const users = set.toString();
            return res.status(400).json({ message: `Δεν βρέθηκε χρήστης με το username ${username}.\nΣτάλθηκαν προσκλήσεις στους χρήστες ${users}.` });
          } else {
            return res.status(400).json({ message: `Δεν βρέθηκε χρήστης με το username ${username}.` });
          }
        }

        // If the requested user is already in the project
        if(user.projects.includes(req.params.projectId)) {
          if(sent.length == 1) {
            const users = set.toString();
            return res.status(400).json({ message: `Ο χρήστης με το username ${username} είναι ήδη μέλος αυτού του project.\nΣτάλθηκε πρόσκληση στον χρήστη ${users}.` });
          } else if(sent.length > 1) {            
            const users = set.toString();
            return res.status(400).json({ message: `Ο χρήστης με το username ${username} είναι ήδη μέλος αυτού του project.\nΣτάλθηκαν προσκλήσεις στους χρήστες ${users}.` });
          } else {
            return res.status(400).json({ message: `Ο χρήστης με το username ${username} είναι ήδη μέλος αυτού του project.` });
          }
        }

        // Create the invitation
        const newInvitation = new Invitation({
          receiver: user._id,
          sender: req.user._id,
          project: req.params.projectId
        });

        // Save invitation in the db
        const invitation = await newInvitation.save();

        // Create an invitation code
        const invitationCode = jwt.sign({ id: invitation._id }, process.env.JWT_SECRET);
        await Invitation.updateOne({ _id: invitation._id }, { $set: { invitationCode: invitationCode } }, { runValidators: true });

        // Update user's invitations in the app
        const invitations = user.invitations;
        invitations.push(invitation._id);
        await User.updateOne({ username: username }, { $set: { invitations: invitations } }, { runValidators: true });

        // Send the invitation to the user's email
        send_email.sendInvitation(user.email, req.user.username, req.body.project, invitationCode);

        // Keep usernames that will receive an invitation, to report them to the user in case of an error
        sent.push(username);
    }

    if(req.body.users.length == 1) {
      res.json({ status: 'OK', message: `Η πρόσκληση του χρήστη ${req.body.users[0]} στο project ${req.body.project} στάλθηκε με επιτυχία!` });
    } else {
      res.json({ status: 'OK', message: `Όλες οι προσκλήσεις μελών στο project ${req.body.project} στάλθηκαν με επιτυχία!` });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;