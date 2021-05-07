const jwt = require('jsonwebtoken');
const passport = require('passport');

// Import User model
const { User } = require("../models/User");

// Create an authentication token for the logged in user
function issueJWT(user) {
  const _id = user._id;
  const expiresIn = '1d';   // 1 day

  const payload = {
    sub: _id,
    iat: Date.now()
  };

  const signedToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiresIn });

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

// Create a unique, random username (will be ScrumManiacX, where X is a number)
module.exports.generateUsername = async() => {
  // Get all users in db
  const users = await User.find({});
  // Number of all users + 1
  const number = users.length + 1;

  return `ScrumUser${number}`;
}

module.exports.issueJWT = issueJWT;
module.exports.extractToken = extractToken;