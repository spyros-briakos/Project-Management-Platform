// const express = require('express');
// const chai = require('chai');
// const request = require('supertest');
// const mocha = require('mocha');
const request = require('supertest');
const app = require('../app');
const fs = require('fs');

const baseURL = 'http://127.0.0.1:3000/api-control';
// const app = express();

describe('POST Login User', () => {
  it('should login on the system', async () => {
    // request(app)
    const res = await request(app)
    .post('/api-control/users/login')
    .trustLocalhost()
    .send({
      username: 'dion',
      password: 'dion1234'
    })
    .expect(200)
    .then((res) => {
      console.log(res)
      expect(res.body.message).to.be.eql('Η σύνδεσή σου ολοκληρώθηκε με επιτυχία.');
      expect(res.body.token.token).to.be.eql('123456/wallet');
      // more validations can be added here as required
    });
  });

// describe('POST Create project', () => {
//     it('', () => {
//           // code for testing the api
//   });
});