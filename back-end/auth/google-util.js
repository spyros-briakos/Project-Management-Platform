const { google } = require('googleapis');
const oauth2 = google.oauth2('v2');

const Oauth2Client_Singup = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `http://${process.env.HOSTNAME}:${process.env.PORT}${process.env.GOOGLE_REDIRECT}/signup`, // this must match your google api settings
);

//  This scope tells google what information we want to request
const scope_Signup = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
];

module.exports.getConnectionUrl_Signup = () => {
  return Oauth2Client_Singup.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: scope_Signup,
      response_type: 'code'
  });
}

module.exports.getUserDetails_Signup = async (code) => {
  const {tokens} = await Oauth2Client_Singup.getToken(code);
  Oauth2Client_Singup.setCredentials(tokens);
  const usr_info = await oauth2.userinfo.get({auth: Oauth2Client_Singup});
  return usr_info.data;
}

const Oauth2Client_Login = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `http://${process.env.HOSTNAME}:${process.env.PORT}${process.env.GOOGLE_REDIRECT}/login`, // this must match your google api settings
);

//  This scope tells google what information we want to request
const scope_Login = [
  'https://www.googleapis.com/auth/userinfo.email'
];

module.exports.getConnectionUrl_Login = () => {
  return Oauth2Client_Login.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: scope_Login,
    response_type: 'code'
  });
}

module.exports.getUserDetails_Login = async (code) => {
  const {tokens} = await Oauth2Client_Login.getToken(code);
  Oauth2Client_Login.setCredentials(tokens);
  const usr_info = await oauth2.userinfo.get({auth: Oauth2Client_Login});
  return usr_info.data;
}