const { google } = require('googleapis');
const oauth2 = google.oauth2('v2');

// Use an authentication client to sign up user with google
const Oauth2Client_Singup = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `https://${process.env.HOST}:${process.env.PORT}${process.env.GOOGLE_REDIRECT}/signup`, // this must match your google api settings
    // `http://${process.env.HOSTNAME}:${process.env.PORT}${process.env.GOOGLE_REDIRECT}/signup`, // this must match your google api settings
);

//  Will ask google to allow us access to the user's email & profile info
const scope_Signup = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
];

// Get url that will let the user log in to their google account (for the sign up)
module.exports.getConnectionUrl_Signup = () => {
  return Oauth2Client_Singup.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: scope_Signup,
      response_type: 'code'
  });
}

// Exchange google 'code' with the user's info
module.exports.getUserDetails_Signup = async (code) => {
  // Exchange google 'code' with google tokens
  const {tokens} = await Oauth2Client_Singup.getToken(code);
  // Tell which info we want to retrieve
  Oauth2Client_Singup.setCredentials(tokens);
  // Get user's info
  const usr_info = await oauth2.userinfo.get({auth: Oauth2Client_Singup});
  return usr_info.data;
}

// Use an authentication client to log in user with google
const Oauth2Client_Login = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `https://${process.env.HOST}:${process.env.PORT}${process.env.GOOGLE_REDIRECT}/login`, // this must match your google api settings
  // `http://${process.env.HOSTNAME}:${process.env.PORT}${process.env.GOOGLE_REDIRECT}/login`, // this must match your google api settings
);

//  Will ask google to allow us access to the user's email
const scope_Login = [
  'https://www.googleapis.com/auth/userinfo.email'
];

// Get url that will let the user log in to their google account (for the log in)
module.exports.getConnectionUrl_Login = () => {
  return Oauth2Client_Login.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: scope_Login,
    response_type: 'code'
  });
}

module.exports.getUserDetails_Login = async (code) => {
  // Exchange google 'code' with google tokens
  const {tokens} = await Oauth2Client_Login.getToken(code);
  // Tell which info we want to retrieve
  Oauth2Client_Login.setCredentials(tokens);
  // Get user's info
  const usr_info = await oauth2.userinfo.get({auth: Oauth2Client_Login});
  return usr_info.data;
}