const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/User');

// Signup middleware
passport.use('signup', new localStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, username, password, done) => {
    try {
      const user = new User(req.body);
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

      return done(null, user, { message: 'Logged in Successfully' });
    } catch (error) {
      console.log(error);
      return done(error);
    }
  })
);

passport.use(new JWTstrategy(
  {
    secretOrKey: 'TOP_SECRET',
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
  }, async (token, done) => {
    try {
      return done(null, token.user);
    } catch (error) {
      done(error);
    }
  })
);