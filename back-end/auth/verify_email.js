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
    subject: 'Please confirm your account',
    html: `Hi ${name}! Thank you for your registration. Press <a href=http://${process.env.HOSTNAME}:${process.env.PORT}/api-control/users/verify/${verificationCode}> here </a> to verify your email.`
  }).catch(err => {
    console.log(err);
    return null;
  });
};