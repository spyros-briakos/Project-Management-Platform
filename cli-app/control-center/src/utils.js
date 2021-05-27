fs = require('fs');
// require('datejs');

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
  try {
    if(fs.existsSync(userPath)) {
      const data = fs.readFileSync(userPath);
      const user = JSON.parse(data);

      // If a user is already logged in
      if(fs.existsSync(tokenPath)) {
        // If it is another user than the one trying to log in
        if(username !== user.username) {
          return { result: false, message: 'Σφαλμά: παρακαλούμε να έχεις αποσυνδεθεί πρωτού συνδεθείς σε άλλο λογαριασμό!' }
        } else {
          // Get token file's creation date
          const { birthtime } = fs.statSync(tokenPath);
          // The token expires 1 day after its creation
          const expireDate = birthtime.add(1).day();
          // Get today
          const today = new Date();

          // If the token has expired
          if(Number(expireDate) < Number(today)) {
            // Silently log out the user, so they can log in again
            fs.unlink('/tmp/user.json', function(err) {
              if(err) return { result: false, message: `Σφάλμα κατά τη διαγραφή του ${userPath}: ${err}` };
            });
            fs.unlink('/tmp/token.json', function(err) {
              if(err) return { result: false, message: `Σφάλμα κατά τη διαγραφή του ${tokenPath}: ${err}` };
            });

            return { result: true }
          }

          // The token is valid
          return { result: false, message: 'Είσαι ήδη συνδεδεμένος/-η!' } 
        }
      }
    }

    return { result: true }
  } catch (error) {
    return { result: false, message: `Προέκυψε σφάλμα: ${error.message}` }
  }
}

module.exports.getToken = getToken;
module.exports.checkLogInfo = checkLogInfo;