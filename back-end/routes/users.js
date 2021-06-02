'use strict'

const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require('jsonwebtoken');
const multer = require("multer");
const queryString = require("query-string");
const utils = require("../auth/utils");
const send_email = require("../auth/send_email");
const googleUtil = require("../auth/google-util");
const serializer = require("../serializers/users");

// Import User model
const { User } = require("../models/User");
// Import Invitation model (for invitations to a project)
const { Invitation } = require("../models/User");
// Import Project model
const Project = require("../models/Project");

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
    send_email.sendVerificationEmail(req.user.username, req.user.email, req.user.verificationCode);

    // Get serialized user
    const context = await serializer.userSerializer(req.user);

    res.json({
      message: 'Επιτυχής εγγραφή!\nΣου στείλαμε email επιβεβαίωσης. Παρακαλούμε δες το Gmail σου!',
      user: context
    });
});

// Verified user via email
router.get('/verify/:verificationCode', async (req, res) => {
  // Find the user in db with the passed verification code
  User.findOne({ verificationCode: req.params.verificationCode })
    .then(async (user) => {
      // If no such user in the db
      if(!user) {
        return res.status(400).json({ message: 'Σφάλμα: Δεν βρέθηκε τέτοιος χρήστης.' });
      }
      // If the account is already active
      if(user.status == 'Active') {
        return res.status(400).json({ message: 'Ο λογαριασμός σου είναι ήδη επιβεβαιωμένος και ενεργός.' });
      }

      // Update user's status & delete their verification code
      await User.updateOne({ _id: user._id }, { $set: { status: 'Active' }, $unset: { verificationCode: 1 } }, { runValidators: true });

      // Create user's authentication token (to log in user)
      const tokenObject = utils.issueJWT(user);

      res.json({ message: 'Το email σου επιβεβαιώθηκε με επιτυχία. Καλωσήρθες στο ScruManiac!' });
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
      // If there was an error
      if (err || !user) {
        res.statusCode = 500
        return res.status(400).json({ message: info.message });
      }

      // Create user's authentication token
      const tokenObject = utils.issueJWT(user);

      // Get serialized user
      const context = await serializer.userSerializer(user);

      return res.json({
        message: info.message,
        user: context,
        token: tokenObject
      });
    } catch (error) {
      return next({ message: error });
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
        status: 'Active',
        plan_in_use: user.plan_in_use
      });

      user.image.url = userInfo.picture;

      const savedUser = await user.save();

      // Create user's authentication token (to log in user)
      const tokenObject = utils.issueJWT(savedUser);

      // Get serialized user
      const context = await serializer.userSerializer(user);

      res.json({
        message: 'Ο λογαριασμός σου δημιουργήθηκε με επιτυχία! Είσαι πλέον συνδεδεμένος/-η στο ScruManiac.',
        user: context,
        token: tokenObject.token
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
        return res.status(500).json({ message: 'Σφάλμα: Δεν βρέθηκε τέτοιος χρήστης.' });
      }

      // Create user's authentication token (to log in user)
      const tokenObject = utils.issueJWT(user);

      // Get serialized user
      const context = await serializer.userSerializer(user);

      res.json({
        message: 'Η σύνδεσή σου ολοκληρώθηκε με επιτυχία.',
        user: context,
        token: tokenObject.token
      });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
});

// Send email to the user to set a new password
router.patch('/forgot-password', async(req, res) => {
  try{
    // Find user in db
    const user = await User.findOne({ email: req.body.email }).exec();

    // If no such user
    if(!user) {
      return res.status(400).json({ message: 'Σφάλμα: Δεν βρέθηκε τέτοιος χρήστης.' });
    }

    // If the user's account is still pending, refuse to send email to change password
    if(user.status === 'Pending') {
      return res.status(400).json({ message: 'Σφάλμα: ο λογαριασμός δεν έχει ενεργοποιηθεί ακόμα! Παρακαλούμε επιβεβαίωσε πρώτα το email σου.' });
    }

    // Create a verification code for the user (will be deleted after the new password is created)
    const verificationCode = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET);

    // Update user
    await User.updateOne({ email: req.body.email }, { $set: { verificationCode: verificationCode } }, { runValidators: true });

    // Send email to the user to change their password
    send_email.changePassword(user.username, req.body.email, verificationCode);

    res.json({ message: 'Σου στείλαμε email! Παρακαλούμε δες το Gmail σου για να δημιουργήσεις νέο κωδικό πρόσβασης.' });
  } catch(error) {
    res.status(400).json({ message: error });
  }
})

// User forgot their password & have set a new one
router.post('/set-password/:verificationCode', async(req, res) => {
  try {
    // Find user in db
    const user = await User.findOne({ verificationCode: req.params.verificationCode }).exec();

    // If no such user
    if(!user) {
      return res.status(400).json({ message: 'Μη έγκυρο αίτημα για ανανέωση κωδικού πρόσβασης. Έλεγξε αν έχεις ήδη ανανεώσει τον κωδικό σου.' });
    }

    // If the new password and the confirmation don't match
    if(req.body.new !== req.body.confirm) {
      return res.status(400).json({ message: 'Σφάλμα: ο νέος κωδικός πρόσβασης και η επιβεβαίωσή του διαφέρουν.' });
    }

    // Update user's password
    user.password = req.body.new;
    // Delete user's verification code
    user.verificationCode = undefined;
    // Save user so that the new password will be hashed
    const saved = await user.save();

    // Create user's authentication token (to log in user)
    const tokenObject = utils.issueJWT(user);

    // Get serialized user
    const context = await serializer.userSerializer(user);

    res.json({
      message: 'Ο νέος σου κωδικός δημιουργήθηκε με επιτυχία! Είσαι πλέον συνδεδεμένος/-η στο ScruManiac.',
      user: context,
      token: tokenObject
    });
  } catch(error) {
    res.status(400).json({ message: error });
  }
})

// Answer to invitation to a project
router.get('/answer-invitation/:invitationCode', async(req, res) => {
  try {
    // Find invitation in the db by the invitationCode
    const invitation = await Invitation.findOne({ invitationCode: req.params.invitationCode }).exec();

    // If no such invitation found
    if(!invitation) {
      return res.status(400).json({ message: 'Σφάλμα: μη έγκυρη πρόσκληση σε project. Ελέγξτε εάν η πρόσκληση έχει ήδη απαντηθεί.' });
    }

    // Find the user that answered the invitation
    const user = await User.findById(invitation.receiver);

    // If no such user in the db
    if(!user) {
      return res.status(400).json({ message: 'Σφάλμα: Δεν βρέθηκε τέτοιος χρήστης.' });
    }

    // Find project in db
    const project = await Project.findById(invitation.project);

    // If no such project in db
    if(!project) {
      return res.status(400).json({ message: 'Σφάλμα: δεν βρέθηκε το αντίστοιχο project.' });
    }

    if(req.query.answer) {      
      // If the user accepted the invitation
      if(req.query.answer === 'accept') {
        // Add current user to the project's members
        const members = project.members;
        members.push(user._id);
        await Project.updateOne({ _id: project._id }, { $set: { members: members } }, { runValidators: true });

        // Update user's projects
        const projects = user.projects;
        projects.push(project._id);
        // Delete user's invitation
        const invitations = user.invitations;
        // Get invitation's position in the list of user's invitations
        const index = invitations.findIndex((invitationId) => { return invitationId === invitation._id });
        // At position index, remove 1 item
        invitations.splice(index, 1);
        // Update user
        const updatedUser = await User.findByIdAndUpdate(user._id, { projects: projects, invitations: invitations }, { runValidators: true, new: true });

        // Delete invtitation from the db as well
        await Invitation.deleteOne({ _id: invitation._id });

        // Get serialized user
        const context = await serializer.userSerializer(updatedUser);

        return res.json({
          message: `Επιτυχής αποδοχή πρόσκλησης. Είσαι πλέον μέλος στο project ${project.name}!`,
          user: context
        });
      }
      // If the user rejected the invitation
      else if(req.query.answer === 'reject') {
        // Delete user's invitation
        const invitations = user.invitations;
        // Get invitation's position in the list of user's invitations
        const index = invitations.findIndex((invitationId) => { return invitationId === invitation._id });
        // At position index, remove 1 item
        invitations.splice(index, 1);
        // Update user
        const updatedUser = await User.findByIdAndUpdate(user._id, { invitations: invitations }, { runValidators: true, new: true });

        // Get serialized user
        const context = await serializer.userSerializer(updatedUser);

        // Delete invtitation from the db as well
        await Invitation.deleteOne({ _id: invitation._id });
        return res.json({
          message: `Η πρόσκληση στο project ${project.name} απορρίφθηκε με επιτυχία.`,
          user: context
        });
      } else{
        return res.status(400).json({ message: 'Προέκυψε κάποιο σφάλμα.' });
      }
    } else {
      return res.status(400).json({ message: 'Προέκυψε κάποιο σφάλμα.' });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
})


// Export router
module.exports = router;