const { google } = require('googleapis');
const oauth2 = google.oauth2('v2');

const Oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `http://${process.env.HOSTNAME}:${process.env.PORT}${process.env.GOOGLE_REDIRECT}`, // this must match your google api settings
);

//  This scope tells google what information we want to request.
const defaultScope = [
    // 'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
];

module.exports.getConnectionUrl = () => {
  return Oauth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: defaultScope,
      response_type: 'code'
  });
}

module.exports.getUserDetails = async (code) => {
  const {tokens} = await Oauth2Client.getToken(code);
  Oauth2Client.setCredentials(tokens);
  const usr_info = await oauth2.userinfo.get({auth: Oauth2Client});
  return usr_info;
} 
