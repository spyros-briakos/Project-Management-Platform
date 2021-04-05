const jwt = require('jsonwebtoken');

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

module.exports.issueJWT = issueJWT;