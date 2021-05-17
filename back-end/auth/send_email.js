const nodemailer = require('nodemailer');

// Create sender
const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_PSW
  }
});

// Send a verification email to the given Gmail address
module.exports.sendVerificationEmail = (name, email, verificationCode) => {
  transport.sendMail({
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: 'ScruManiac: Επιβεβαίωση email',
    html: `Γεια σου ${name}! Ευχαριστούμε για την εγγραφή σου στο ScruManiac. Πάτα <a href=http://${process.env.HOSTNAME}:${process.env.PORT}/api-control/users/verify/${verificationCode}> εδώ </a> για να επιβεβαιώσεις το email σου και να ενεργοποιηθεί ο λογαριασμός σου.`
  }).catch(err => {
    console.log(err);
    return null;
  });
};

// Send email so that the user can change password
module.exports.changePassword = (name, email, verificationCode) => {
  transport.sendMail({
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: 'ScruManiac: Ανανέωση κωδικού πρόσβασης',
    // html: `Hi ${name}! Press <a href=http://${process.env.HOSTNAME}:${process.env.PORT}/api-control/users/set-password/${verificationCode}> here </a> to set your new password in ScruManiac.`
    html: `<h3>Ανανέωσε τον κωδικό πρόσβασής σου στο ScruManiac</h3>
          <form action="http://${process.env.HOSTNAME}:${process.env.PORT}/api-control/users/set-password/${verificationCode}" method="POST">
            <label for='newPsw'>Νέος κωδικός πρόσβασης</label>
            <input id='newPsw' type="password" name="new">
            <label for='confPsw'>Επιβεβαίωση νέου κωδικού πρόσβασης</label>
            <input id='confPsw' type="password" name="confirm">
            <button>Υποβολή</button>
          </form>`
  }).catch(err => {
    console.log(err);
    return null;
  });
};

// Send email to invite a user to a project
module.exports.sendInvitation = (email, sender, project, invitationCode) => {
  transport.sendMail({
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: 'ScruManiac: Πρόσκληση σε project',
    html: `<h3>Ο χρήστης ${sender} σε προσκαλεί να συμμετέχεις στο project του με όνομα ${project}!</h3>
          Επίλεξε αν θες να κάνεις <a href='http://${process.env.HOSTNAME}:${process.env.PORT}/api-control/users/answer-invitation/${invitationCode}?answer=accept'>ΑΠΟΔΟΧΗ</a> 
          ή <a href='http://${process.env.HOSTNAME}:${process.env.PORT}/api-control/users/answer-invitation/${invitationCode}?answer=reject'>ΑΠΟΡΡΙΨΗ</a> της πρόσκλησης.`
  }).catch(err => {
    console.log(err);
    return null;
  });
}