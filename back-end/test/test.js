// // const request = require('supertest');
// const mocha = require('mocha');
const expect = require('chai').expect;
const request = require('supertest');
const server = require('../app');
const fs = require('fs');

const test_data = require('./scrumMasterTest.json');
const baseURL = 'https://127.0.0.1:3080/api-control';

describe('API Test', () => {
  // it('Reset database for tests', function (done) {
  //   request(server)
  //   .get('/api-control/db/set-test-db-many-users')
  //   .trustLocalhost()
  //   .expect(200)
  //   .then((res) => {
  //     // console.log(res.body)
  //     expect(res.body.status).to.be.eql('OK');
  //   });
  // });

  it('Sign Up new user', function (done) {
    request(server)
    .post('/api-control/users/signup')
    .trustLocalhost()
    .send({
      username: 'testUser',
      firstName: 'TestFirstName',
      lastName: 'TestLastName',
      password: 'testUser1234',
      email: 'test@testmail.gr',
    })
    .expect(200)
    .then((res) => {
      // console.log(res.body.user)
      expect(res.body.message).to.be.eql(test_data.message.signup);
      done();
    });
    setTimeout(()=>{}, 10);
  });

  it('Admin login', function (done) {
    request(server)
    .post('/api-control/users/login')
    .trustLocalhost()
    .send({
      username: test_data.user.username,
      password: test_data.user.password
    })
    .expect(200)
    .then((res) => {
      // console.log(res.body)
      fs.writeFile('/tmp/admin-user-token.json', res.body.token.token, function(err){});
      expect(res.body.message).to.be.eql(test_data.message.login);
      expect(res.body.user.username).to.be.eql(test_data.user.username);
      expect(res.body.user.firstName).to.be.eql(test_data.user.firstName);
      expect(res.body.user.lastName).to.be.eql(test_data.user.lastName);
      expect(res.body.user.email).to.be.eql(test_data.user.email);
      expect(res.body.user.plan_in_use).to.be.eql(test_data.user.plan_in_use);
      expect(res.body.user.status).to.be.eql(test_data.user.status);
      done();
    });
    setTimeout(()=>{}, 10);
  });

  it('Get User\'s Projects', function (done) {
    const token = fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    request(server)
    .post('/api-control/get-projects')
    .trustLocalhost()
    .set('Accept', 'application/json')
    .send()
    .set('Authorization', token)
    .expect(200)
    .then((res) => {
      // console.log(res.body)
      expect(res.body.status).to.be.eql('OK');
      done();
    });
    setTimeout(()=>{}, 10);
  });

  it('Create a new Project', function (done) {
    const token = fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    request(server)
    .post('/api-control/add-project')
    .trustLocalhost()
    .send({
      project: {
        name: test_data.project.name,
        description: test_data.project.description
      }
    })
    .set('Authorization', token)
    .expect(200)
    .then((res) => {
      // console.log(res.body)
      expect(res.body.status).to.be.eql('OK');
      expect(res.body.message).to.be.eql(test_data.message.add_project);
      fs.writeFile('/tmp/project-id.txt', res.body.project._id, function(err){});
      done();
    });
    setTimeout(()=>{}, 10);
  });

  it('Choose a Project', function (done) {
    const token = fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const project_id = fs.readFileSync('/tmp/project-id.txt', 'utf8');
    request(server)
    .post('/api-control/get-details')
    .trustLocalhost()
    .send({
      projectID: project_id,
    })
    .set('Authorization', token)
    .expect(200)
    .then((res) => {
      // console.log(res.body);
      expect(res.body.status).to.be.eql('OK');
      done();
    });
    setTimeout(()=>{}, 10);
  });

  it('Edit Project', function (done) {
    const token = fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const project_id = fs.readFileSync('/tmp/project-id.txt', 'utf8');
    request(server)
    .post('/api-control/edit-project')
    .trustLocalhost()
    .send({
      projectID: project_id,
      project: {
        name: 'new Test Name',
        description: 'This is a test project (new desc)'
      }
    })
    .set('Authorization', token)
    .expect(200)
    .then((res) => {
      // console.log(res.body);
      expect(res.body.message).to.be.eql(test_data.message.edit_project);
      expect(res.body.status).to.be.eql('OK');
      done();
    });
    setTimeout(()=>{}, 10);
  });

  it('Get Sprints of Project', function (done) {
    const token = fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const project_id = fs.readFileSync('/tmp/project-id.txt', 'utf8');
    request(server)
    .post('/api-control/get-sprints')
    .trustLocalhost()
    .send({
      projectID: project_id
    })
    .set('Authorization', token)
    .expect(200)
    .then((res) => {
      // console.log(res.body);
      expect(res.body.status).to.be.eql('OK');
      done();
    });
    setTimeout(()=>{}, 10);
  });

  it('Get UserStories of Project', function (done) {
    const token = fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const project_id = fs.readFileSync('/tmp/project-id.txt', 'utf8');
    request(server)
    .post('/api-control/get-userstories')
    .trustLocalhost()
    .send({
      projectID: project_id
    })
    .set('Authorization', token)
    .expect(200)
    .then((res) => {
      // console.log(res.body);
      expect(res.body.status).to.be.eql('OK');
      done();
    });
    setTimeout(()=>{}, 10);
  });

  it('Add new Sprint to Project', function (done) {
    const token = fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const project_id = fs.readFileSync('/tmp/project-id.txt', 'utf8');
    request(server)
    .post('/api-control/add-sprint')
    .trustLocalhost()
    .send({
      projectID: project_id,
      sprint: {
        name: '1st sprint',
        description: 'This is the first sprint'
      }
    })
    .set('Authorization', token)
    .expect(200)
    .then((res) => {
      // console.log(res.body)
      expect(res.body.status).to.be.eql('OK');
      expect(res.body.message).to.be.eql(test_data.message.add_sprint);
      fs.writeFile('/tmp/sprint-id.txt', res.body.sprint._id, function(err){});
      done();
    });
    setTimeout(()=>{}, 10);
  });

  it('Edit Sprint of Project', function (done) {
    const token = fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const project_id = fs.readFileSync('/tmp/project-id.txt', 'utf8');
    const sprint_id = fs.readFileSync('/tmp/sprint-id.txt', 'utf8');
    request(server)
    .post('/api-control/edit-sprint')
    .trustLocalhost()
    .send({
      projectID: project_id,
      sprint: {
        _id: sprint_id,
        name: '1st sprint (new name)',
      description: 'This is the first sprint (edited description)'
      }
    })
    .set('Authorization', token)
    .expect(200)
    .then((res) => {
      // console.log(res.body)
      expect(res.body.status).to.be.eql('OK');
      expect(res.body.message).to.be.eql(test_data.message.edit_sprint);
      done();
    });
    setTimeout(()=>{}, 10);
  });

  it('Add new UserStory to Project', function (done) {
    const token = fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const project_id = fs.readFileSync('/tmp/project-id.txt', 'utf8');
    request(server)
    .post('/api-control/add-userstory')
    .trustLocalhost()
    .send({
      projectID: project_id,
      userStory: {
        name: '1st userstory',
        description: 'This is the first userstory'
      }
    })
    .set('Authorization', token)
    .expect(200)
    .then((res) => {
      // console.log(res.body)
      expect(res.body.status).to.be.eql('OK');
      expect(res.body.message).to.be.eql(test_data.message.add_userStory);
      fs.writeFile('/tmp/userStory-id.txt', res.body.userStory._id, function(err){});
      done();
    });
    setTimeout(()=>{}, 10);
  });

  it('Edit UserStory of Project', function (done) {
    const token = fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const project_id = fs.readFileSync('/tmp/project-id.txt', 'utf8');
    const userStory_id = fs.readFileSync('/tmp/userStory-id.txt', 'utf8');
    request(server)
    .post('/api-control/edit-userstory')
    .trustLocalhost()
    .send({
      projectID: project_id,
      userStory: {
        _id: userStory_id,
        name: '1st userstory (edited)',
        description: 'This is the first userstory (edited)'
      }
    })
    .set('Authorization', token)
    .expect(200)
    .then((res) => {
      // console.log(res.body)
      expect(res.body.status).to.be.eql('OK');
      expect(res.body.message).to.be.eql(test_data.message.edit_userStory);
      done();
    });
    setTimeout(()=>{}, 10);
  });

  it('Add new Task to Project', function (done) {
    const token = fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const project_id = fs.readFileSync('/tmp/project-id.txt', 'utf8');
    const userStory_id = fs.readFileSync('/tmp/userStory-id.txt', 'utf8');
    request(server)
    .post('/api-control/add-task')
    .trustLocalhost()
    .send({
      projectID: project_id,
      task: {
        name: '1st task',
        description: 'This is the first task',
        userStory: userStory_id
      }
    })
    .set('Authorization', token)
    .expect(200)
    .then((res) => {
      // console.log(res.body)
      expect(res.body.status).to.be.eql('OK');
      expect(res.body.message).to.be.eql(test_data.message.add_task);
      fs.writeFile('/tmp/task-id1.txt', res.body.task._id, function(err){});
      done();
    });
    setTimeout(()=>{}, 10);
  });

  it('Add second Task to Project', function (done) {
    const token = fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const project_id = fs.readFileSync('/tmp/project-id.txt', 'utf8');
    const userStory_id = fs.readFileSync('/tmp/userStory-id.txt', 'utf8');
    request(server)
    .post('/api-control/add-task')
    .trustLocalhost()
    .send({
      projectID: project_id,
      task: {
        name: '2nd task',
        description: 'This is the second task',
        userStory: userStory_id
      }
    })
    .set('Authorization', token)
    .expect(200)
    .then((res) => {
      // console.log(res.body)
      expect(res.body.status).to.be.eql('OK');
      expect(res.body.message).to.be.eql(test_data.message.add_task);
      fs.writeFile('/tmp/task-id2.txt', res.body.task._id, function(err){});
      done();
    });
    setTimeout(()=>{}, 10);
  });

  // it('Join first Task of Project', function (done) {
  //   const token = fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
  //   const project_id = fs.readFileSync('/tmp/project-id.txt', 'utf8');
  //   const task_id = fs.readFileSync('/tmp/task-id1.txt', 'utf8');
  //   request(server)
  //   .post('/api-control/join-task')
  //   .trustLocalhost()
  //   .send({
  //     projectID: project_id,
  //     taskID: task_id
  //   })
  //   .set('Authorization', token)
  //   .expect(200)
  //   .then((res) => {
  //     // console.log(res.body)
  //     expect(res.body.status).to.be.eql('OK');
  //     expect(res.body.message).to.be.eql(test_data.message.join_task);
  //   });
  // });

  it('Edit first Task of Project', function (done) {
    const token = fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const project_id = fs.readFileSync('/tmp/project-id.txt', 'utf8');
    const task_id = fs.readFileSync('/tmp/task-id1.txt', 'utf8');
    request(server)
    .post('/api-control/edit-task')
    .trustLocalhost()
    .send({
      projectID: project_id,
      task: {
        _id: task_id,
        name: '1st task (edited)',
        description: 'This is the first task (edited)'
      }
    })
    .set('Authorization', token)
    .expect(200)
    .then((res) => {
      // console.log(res.body)
      expect(res.body.status).to.be.eql('OK');
      expect(res.body.message).to.be.eql(test_data.message.edit_task);
      done();
    });
    setTimeout(()=>{}, 10);
  });

  it('Set second Task after first Task of Project', function (done) {
    const token = fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const project_id = fs.readFileSync('/tmp/project-id.txt', 'utf8');
    const task_id1 = fs.readFileSync('/tmp/task-id1.txt', 'utf8');
    const task_id2 = fs.readFileSync('/tmp/task-id2.txt', 'utf8');
    request(server)
    .post('/api-control/connect-task-task')
    .trustLocalhost()
    .send({
      projectID: project_id,
      task1ID: task_id1,
      task2ID: task_id2,
      conn:'after'
    })
    .set('Authorization', token)
    .expect(200)
    .then((res) => {
      // console.log(res.body)
      expect(res.body.status).to.be.eql('OK');
      expect(res.body.message).to.be.eql(test_data.message.connect_task_task);
      done();
    });
    setTimeout(()=>{}, 10);
  });

  it('Unlink the two Tasks of Project', function (done) {
    const token = fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const project_id = fs.readFileSync('/tmp/project-id.txt', 'utf8');
    const task_id1 = fs.readFileSync('/tmp/task-id1.txt', 'utf8');
    const task_id2 = fs.readFileSync('/tmp/task-id2.txt', 'utf8');
    request(server)
    .post('/api-control/disconnect-task-task')
    .trustLocalhost()
    .send({
      projectID: project_id,
      task1ID: task_id1,
      task2ID: task_id2,
      conn:'after'
    })
    .set('Authorization', token)
    .expect(200)
    .then((res) => {
      // console.log(res.body)
      expect(res.body.status).to.be.eql('OK');
      expect(res.body.message).to.be.eql(test_data.message.disconnect_task_task);
      done();
    });
    setTimeout(()=>{}, 10);
  });

  it('Set second Task before first Task of Project', function (done) {
    const token = fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const project_id = fs.readFileSync('/tmp/project-id.txt', 'utf8');
    const task_id1 = fs.readFileSync('/tmp/task-id1.txt', 'utf8');
    const task_id2 = fs.readFileSync('/tmp/task-id2.txt', 'utf8');
    request(server)
    .post('/api-control/connect-task-task')
    .trustLocalhost()
    .send({
      projectID: project_id,
      task1ID: task_id1,
      task2ID: task_id2,
      conn:'before'
    })
    .set('Authorization', token)
    .expect(200)
    .then((res) => {
      // console.log(res.body)
      expect(res.body.status).to.be.eql('OK');
      expect(res.body.message).to.be.eql(test_data.message.connect_task_task);
      done();
    });
    setTimeout(()=>{}, 10);
  });

  it('Set first Task to first Sprint of Project', function (done) {
    const token = fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const project_id = fs.readFileSync('/tmp/project-id.txt', 'utf8');
    const task_id = fs.readFileSync('/tmp/task-id1.txt', 'utf8');
    const sprint_id = fs.readFileSync('/tmp/sprint-id.txt', 'utf8');
    request(server)
    .post('/api-control/connect-task-sprint')
    .trustLocalhost()
    .send({
      projectID: project_id,
      sprintID: sprint_id,
      taskID: task_id
    })
    .set('Authorization', token)
    .expect(200)
    .then((res) => {
      // console.log(res.body)
      expect(res.body.status).to.be.eql('OK');
      expect(res.body.message).to.be.eql(test_data.message.connect_task_sprint);
      done();
    });
    setTimeout(()=>{}, 10);
  });

  it('Unlink first Task from Sprint of Project', function (done) {
    const token = fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const project_id = fs.readFileSync('/tmp/project-id.txt', 'utf8');
    const task_id = fs.readFileSync('/tmp/task-id1.txt', 'utf8');
    request(server)
    .post('/api-control/disconnect-task-sprint')
    .trustLocalhost()
    .send({
      projectID: project_id,
      taskID: task_id
    })
    .set('Authorization', token)
    .expect(200)
    .then((res) => {
      // console.log(res.body)
      expect(res.body.status).to.be.eql('OK');
      expect(res.body.message).to.be.eql(test_data.message.disconnect_task_sprint);
      done();
    });
    setTimeout(()=>{}, 10);
  });

  it('Leave first Task of Project', function (done) {
    const token = fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const project_id = fs.readFileSync('/tmp/project-id.txt', 'utf8');
    const task_id = fs.readFileSync('/tmp/task-id1.txt', 'utf8');
    request(server)
    .post('/api-control/leave-task')
    .trustLocalhost()
    .send({
      projectID: project_id,
      taskID: task_id
    })
    .set('Authorization', token)
    .expect(200)
    .then((res) => {
      // console.log(res.body)
      expect(res.body.status).to.be.eql('OK');
      expect(res.body.message).to.be.eql(test_data.message.leave_task);
      done();
    });
    setTimeout(()=>{}, 10);
  });

  it('Delete Sprint of Project', function (done) {
    const token = fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const project_id = fs.readFileSync('/tmp/project-id.txt', 'utf8');
    const sprint_id = fs.readFileSync('/tmp/sprint-id.txt', 'utf8');
    request(server)
    .post('/api-control/delete-sprint')
    .trustLocalhost()
    .send({
      projectID: project_id,
      sprintID: sprint_id
    })
    .set('Authorization', token)
    .expect(200)
    .then((res) => {
      // console.log(res.body);
      expect(res.body.status).to.be.eql('OK');
      expect(res.body.message).to.be.eql(test_data.message.delete_sprint);
      done();
    });
    setTimeout(()=>{}, 10);
  });

  it('Delete Task of Project', function (done) {
    const token = fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const project_id = fs.readFileSync('/tmp/project-id.txt', 'utf8');
    const task_id = fs.readFileSync('/tmp/task-id1.txt', 'utf8');
    request(server)
    .post('/api-control/delete-task')
    .trustLocalhost()
    .send({
      projectID: project_id,
      taskID: task_id
    })
    .set('Authorization', token)
    .expect(200)
    .then((res) => {
      // console.log(res.body);
      expect(res.body.status).to.be.eql('OK');
      expect(res.body.message).to.be.eql(test_data.message.delete_task);
      done();
    });
    setTimeout(()=>{}, 10);
  });

  it('Delete UserStory of Project', function (done) {
    const token = fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const project_id = fs.readFileSync('/tmp/project-id.txt', 'utf8');
    const userStory_id = fs.readFileSync('/tmp/userStory-id.txt', 'utf8');
    request(server)
    .post('/api-control/delete-userstory')
    .trustLocalhost()
    .send({
      projectID: project_id,
      userStoryID: userStory_id
    })
    .set('Authorization', token)
    .expect(200)
    .then((res) => {
      // console.log(res.body);
      expect(res.body.status).to.be.eql('OK');
      expect(res.body.message).to.be.eql(test_data.message.delete_userStory);
      done();
    });
    setTimeout(()=>{}, 10);
  });

  it('Delete Project', function (done) {
    const token = fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const project_id = fs.readFileSync('/tmp/project-id.txt', 'utf8');
    request(server)
    .post('/api-control/delete-project')
    .trustLocalhost()
    .send({
      projectID: project_id
    })
    .set('Authorization', token)
    .expect(200)
    .then((res) => {
      // console.log(res.body);
      expect(res.body.status).to.be.eql('OK');
      expect(res.body.message).to.be.eql(test_data.message.delete_project);
      done();
    });
    setTimeout(()=>{}, 10);
  });

  it('Admin logout', function (done) {
    const token = fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    request(server)
    .get('/api-control/secure-routes/logout')
    .trustLocalhost()
    .set('Authorization', token)
    .expect(200)
    .then((res) => {
      expect(res.body.message).to.be.eql(test_data.message.logout);
      done();
    });
    setTimeout(()=>{}, 10);
  });

  it('Reset database for tests', function (done) {
    request(server)
    .get('/api-control/db/reset')
    .trustLocalhost()
    .expect(200)
    .then((res) => {
      // console.log(res.body)
      expect(res.body.status).to.be.eql('OK');
      done();
    });
    setTimeout(()=>{}, 10);
  });

  server.close();
});