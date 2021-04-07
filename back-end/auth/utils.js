const jwt = require('jsonwebtoken');
const passport = require('passport');

// Import InvalidToken model (created after a user logs out)
const { InvalidToken } = require("../models/User");

// Create an authentication token for the logged in user
function issueJWT(user) {
  const _id = user._id;
  const expiresIn = '1d';   // 1 day

  const payload = {
    sub: _id,
    iat: Date.now()
  };

  const signedToken = jwt.sign(payload, 'TOP_SECRET', { expiresIn: expiresIn, algorithm: 'HS256' });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn
  }
}

// Extract the token of the user that made a request
function extractToken(req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
}

// Authenticate a user that requested a secure route
const authenticateUser = async (req, res, next) => {
  // Passport authentication
  passport.authenticate('jwt', { session: false });

  // Get user's token
  const currentToken = extractToken(req);
  // Check if it is an invalid token
  const token = await InvalidToken.findOne({ value: currentToken }).exec();

  // If the token is valid, continue
  if(token === null) {
    return next();
  }

  res.json({ message: 'Error: Invalid authentication token used' });
}

module.exports.issueJWT = issueJWT;
module.exports.extractToken = extractToken;
module.exports.authenticateUser = authenticateUser;