'use strict'

const passport = require('passport');

// Import InvalidToken model (created after a user logs out)
const { InvalidToken } = require("../models/User");
const utils = require("../auth/utils");

// Authenticate a user that requested a secure route
const authenticateUser = async (req, res, next) => {
  // Passport authentication
  const middleware = passport.authenticate('jwt', { session: false }, async(err, user, info) => {
    if(err !== null || user === false || user === null) {
      return next(info.message);
    }

    // Get user's token
    const currentToken = utils.extractToken(req);
    // Check if it is an invalid token
    const token = await InvalidToken.findOne({ value: currentToken }).exec();

    // If the token is valid, continue
    if(token === null) {
      return next();
    }
  
    res.status(400).json({ message: 'Error: Invalid authentication token used' });
  });

  middleware(req, res, next);
}

module.exports = authenticateUser;
