const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const fs = require('fs');

const { User } = require('../models/User');

// Signup middleware
passport.use('signup', new localStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, username, password, done) => {
    try {
      const user = new User(req.body);

      // If an image was uploaded, save it locally
      if(req.file) {
        user.image.data = fs.readFileSync(path.join(__dirname + '../uploads' + req.file.filename)),
        user.image.contentType = 'image/png'
      }

      // Create a verification code for the user (will be deleted after the email address is verified)
      user.verificationCode = jwt.sign({ email: user.email }, process.env.JWT_SECRET);

      const savedUser = await user.save();

      done(null, user);
    } catch (error) {
      done(error);
    }
  })
);

// Login middleware
passport.use('login', new localStrategy(
  {
    usernameField: 'username',
    passwordField: 'password'
  }, async (username, password, done) => {
    try {
      // Find user in the db
      const user = await User.findOne({ username: username });
      // If no such user
      if (!user) {
        return done(null, false, { message: 'Δεν βρέθηκε τέτοιος χρήστης.' });
      }

      // Confirm password is valid
      const validate = await user.isValidPassword(password);
      // If wrong password
      if (!validate) {
        return done(null, false, { message: 'Λάθος κωδικός πρόσβασης.' });
      }

      // If the account is still pending
      if (user.status != 'Active') {
        return done(null, false, { message: 'Ο λογαριασμός δεν έχει ενεργοποιηθεί ακόμα. Παρακαλούμε επιβεβαιώσε πρώτα το email σου!' });
      }

      return done(null, user, { message: 'Η σύνδεσή σου ολοκληρώθηκε με επιτυχία.' });
    } catch (error) {
      return done(error, null, { message: 'Προέκυψε σφάλμα.' });
    }
  })
);

// Passport-jwt authentication strategy
passport.use(new JWTstrategy(
  {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    passReqToCallback: true
  }, async (req, payload, done) => {
    // Find user in the db
    User.findOne({ _id: payload.sub })
      .then((user) => {
        if(user) {
          // req.user will be used in '../routes/secure-routes'
          req.user = user;
          return done(null, user, { message: 'Επιτυχής έλεγχος ταυτότητας.' });
        } else {
          return done(null, false, { message: 'Δεν βρέθηκε τέτοιος χρήστης.' });
        }
      })
      .catch(error => done(error, null, { message: 'Προέκυψε σφάλμα.' }));
  })
);