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

      user.verificationCode = jwt.sign({ email: user.email }, 'EMAIL_SECRET');

      const savedUser = await user.save();

      done(null, user);
    } catch (error) {
      // console.log(error);
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
      const user = await User.findOne({ username });

      if (!user) {
        return done(null, false, { message: 'User not found' });
      }

      const validate = await user.isValidPassword(password);
  
      if (!validate) {
        return done(null, false, { message: 'Wrong Password' });
      }

      if (user.status != 'Active') {
        return done(null, false, { message: 'Pending Account. Please verify your email!' });
      }

      return done(null, user, { message: 'Logged in Successfully' });
    } catch (error) {
      return done(error, null, { message: 'An error occured' });
    }
  })
);

// Passport-jwt authentication strategy
passport.use(new JWTstrategy(
  {
    secretOrKey: 'TOP_SECRET',
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    passReqToCallback: true
  }, async (req, payload, done) => {
    User.findOne({ _id: payload.sub })
      .then((user) => {
        if(user) {
          req.user = user;
          return done(null, user, { message: 'User authenticated successfully' });
        } else {
          return done(null, false, { message: 'Could not find user' });
        }
      })
      .catch(error => done(error, null, { message: 'An error occurred' }));
  })
);