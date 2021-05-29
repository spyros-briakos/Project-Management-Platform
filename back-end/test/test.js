// const express = require('express');
const chai = require('chai');

// const request = require('supertest');
const mocha = require('mocha');
const request = require('supertest');
const app = require('../app');
const fs = require('fs');
var expect = chai.expect;

const baseURL = 'http://127.0.0.1:3000/api-control';
// const app = express();

var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MDg2ODA5NDMyMzY4MWE0NDZkY2Q5ODIiLCJpYXQiOjE2MjIyMzAxMTQ0MTQsImV4cCI6MTYyMjIzMDIwMDgxNH0.UFq66zE6b5NPwIbGy1dubQmotRlVr6jWxvFsrt1pGeE';

// describe('Authentication API Test', () => {
//   it('Admin login', async () => {
//     await request(app)
//     .post('/api-control/users/login')
//     .trustLocalhost()
//     .send({
//       username: 'dion',
//       password: 'dion1234'
//     })
//     .expect(200)
//     .then((res) => {
//       expect(res.body.message).to.be.eql('Η σύνδεσή σου ολοκληρώθηκε με επιτυχία.');
//       fs.writeFile('/tmp/admin-user.json', res.body.token.token.split(' ')[1], function(err){})
//     });
//   });

//   it('Admin logout', async () => {
//     fs.readFile('/tmp/admin-user.json', async function(err, data) {
//       const token = JSON.parse(data).token;
//       await request(app)
//       .post('/api-control/secure-routes/logout')
//       .trustLocalhost()
//       .send()
//       .set('Authorization', token)
//       .expect(200)
//       .then((res) => {
//         expect(res.body.message).to.be.eql('Η σύνδεσή σου ολοκληρώθηκε με επιτυχία.');
//       });
//     });
//   });

//   // it('Sign up new user', async () => {
//   //   fs.readFile('/tmp/admin-user.json', async function(err, data) {
//   //     const token = JSON.parse(data).token;
//   //     await request(app)
//   //     .post('/api-control/secure-routes/logout')
//   //     .trustLocalhost()
//   //     .send()
//   //     .set('Authorization', token)
//   //     .expect(200)
//   //     .then((res) => {
//   //       expect(res.body.message).to.be.eql('Η σύνδεσή σου ολοκληρώθηκε με επιτυχία.');
//   //     });
//   //   });
//   // });
// });

describe('API Test', () => {
  it('Admin login', async () => {
    await request(app)
    .post('/api-control/users/login')
    .trustLocalhost()
    .send({
      username: 'dion',
      password: 'dion1234'
    })
    .expect(200)
    .then((res) => {
      expect(res.body.message).to.be.eql('Η σύνδεσή σου ολοκληρώθηκε με επιτυχία.');
      // fs.writeFile('/tmp/admin-user.json', JSON.stringify(res.body.user), function(err){})
      fs.writeFile('/tmp/admin-user-token.json', res.body.token.token, function(err){})
    });
  });

  it('Get User\'s Projects', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    await request(app)
    .post('/api-control/get-projects')
    .trustLocalhost()
    .set('Accept', 'application/json')
    .send()
    .set('Authorization', token)
    .expect(200)
    .then((res) => {
      // fs.writeFile('/tmp/curr-project.json', JSON.stringify(res.body), function(err){})
    });
  });

  // it('Create a new Project', async () => {
  //   const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
  //   console.log(token);
  //   await request(app)
  //   .post('/api-control/add-project')
  //   .trustLocalhost()
  //   .send({
  //     project: {
  //       name: 'test',
  //       description: 'This is a test project'
  //     }
  //   })
  //   .set('Authorization', token)
  //   .expect(200)
  //   .then((res) => {
  //     console.log(res.body)
  //     fs.writeFile('/tmp/curr-project.json', JSON.stringify(res.body), function(err){})
  //   });
  // });

  it('Choose the new Project', async () => {
    const token = await fs.readFileSync('/tmp/.json', 'utf8');
    await request(app)
    .post('/api-control/get-details')
    .trustLocalhost()
    .send({
      name: 'test',
      description: 'This is a test project'
    })
    .set('Authorization', token)
    .expect(200)
    .then((res) => {
      console.log(res.body)
      fs.writeFile('/tmp/curr-project.json', JSON.stringify(res.body), function(err){})
    });
  });
  // it('Edit Project', async () => {
  //   const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
  //   await request(app)
  //   .post('/api-control/edit-project')
  //   .trustLocalhost()
  //   .send({
  //     name: 'test',
  //     description: 'This is a test project'
  //   })
  //   .set('Authorization', token)
  //   .expect(200)
  //   .then((res) => {
  //     console.log(res.body)
  //     fs.writeFile('/curr-project.json', JSON.stringify(res.body), function(err){})
  //   });
  // });
  // it('Get Sprints of Project', async () => {});
  // it('Get UserStories of Project', async () => {});
  // it('Get Tasks of Project', async () => {});
  // it('Add new Sprint to Project', async () => {});
  // it('Add new UserStory to Project', async () => {});
  // it('Add new Task to Project', async () => {});
  // it('Add second Task to Project', async () => {});
  // it('Edit Sprint of Project', async () => {});
  // it('Edit UserStory of Project', async () => {});
  // it('Join first Task of Project', async () => {});
  // it('Edit first Task of Project', async () => {});
  // it('Set first Task after second Task of Project', async () => {});
  // it('Unlink the two Tasks of Project', async () => {});
  // it('Set first Task before second Task of Project', async () => {});
  // it('Set first Task to first Sprint of Project', async () => {});
  // it('Unlink first Task from Sprint of Project', async () => {});
  // it('Delete second Task of Project', async () => {});
  // it('Leave first Task of Project', async () => {});

  // it('Admin logout', async () => {
  //   fs.readFile('/tmp/admin-user-token.json', async function(err, data) {
  //     const token = data;
  //     await request(app)
  //     .post('/api-control/secure-routes/logout')
  //     .trustLocalhost()
  //     .send()
  //     .set('Authorization', token)
  //     .expect(200)
  //     .then((res) => {
  //       expect(res.body.message).to.be.eql('Η σύνδεσή σου ολοκληρώθηκε με επιτυχία.');
  //     });
  //   });
  // });
});