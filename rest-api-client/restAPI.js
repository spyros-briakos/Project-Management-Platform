const apiUrl = `http://${process.env.HOSTNAME}:${process.env.PORT}/api-control`;
const agent = new https.Agent({
  rejectUnauthorized: false,
});

const program = require('commander');
const axios = require('axios');

// Export client commands
export function client(args) {

  // ---------------------- USER ----------------------
  












  program.parse(process.argv);
}