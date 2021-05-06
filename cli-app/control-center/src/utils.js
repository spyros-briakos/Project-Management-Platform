fs = require('fs');

function getToken(path) {
  try {
    const data = fs.readFileSync(path);
    const tokenObject = JSON.parse(data);
    const token = tokenObject.token;

    return token.substring(7);
  } catch(error) {
      return error;
  }
}

function checkLogInfo(username, userPath, tokenPath) {
  if(fs.existsSync(userPath)) {
    // If a user is already logged in
    if(fs.existsSync(tokenPath)) {
      return { result: false, message: 'Error: Please log out first!' } 
    } else {
      const data = fs.readFileSync(userPath);
      const user = JSON.parse(data);

      if(username !== user.username) {
          return { result: true, message: 'Warning: another account was created last. Are you sure you want to log in with another account? (y/n)' }
      }
    }
  }

  return { result: true }
}

module.exports.getToken = getToken;
module.exports.checkLogInfo = checkLogInfo;