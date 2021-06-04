const program = require('commander');

const tests = require('./tests');
const requests = require('../../requests');

export function runTests(args) {
  program
  .command('run')
  .action(async () => {
    try {
      let message = await tests.runTests();
      requests.setTesting(false);
      console.log(message);
    } catch (error) {
      console.log(error);
    }
  });

  program.parse(process.argv);
}