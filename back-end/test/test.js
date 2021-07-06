// // const request = require('supertest');
// const mocha = require('mocha');
const expect = require('chai').expect;
const request = require('supertest');
const server = require('../app');
const fs = require('fs');

const test_data = require('./scrumMasterTest.json');
const baseURL = 'https://127.0.0.1:3080/api-control';


describe('API Test', () => {
  // it('Reset database for tests', async () => {
  //   await request(server)
  //   .get('/api-control/db/set-test-db-many-users')
  //   .trustLocalhost()
  //   .expect(200)
  //   .then((res) => {
  //     // console.log(res.body)
  //     expect(res.body.status).to.be.eql('OK');
  //   });
  // });

  it('Sign Up new user', async () => {
    await request(server)
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
    .then(async (res) => {
      // console.log(res.body.user)
      expect(res.body.message).to.be.eql(test_data.message.signup);
    });
  });

  it('Admin login', async () => {
    await request(server)
    .post('/api-control/users/login')
    .trustLocalhost()
    .send({
      username: test_data.user.username,
      password: test_data.user.password
    })
    .expect(200)
    .then(async (res) => {
      // console.log(res.body.user)
      await fs.writeFile('/tmp/admin-user-token.json', res.body.token.token, function(err){});
      expect(res.body.message).to.be.eql(test_data.message.login);
      expect(res.body.user.username).to.be.eql(test_data.user.username);
      expect(res.body.user.firstName).to.be.eql(test_data.user.firstName);
      expect(res.body.user.lastName).to.be.eql(test_data.user.lastName);
      expect(res.body.user.email).to.be.eql(test_data.user.email);
      expect(res.body.user.plan_in_use).to.be.eql(test_data.user.plan_in_use);
      expect(res.body.user.status).to.be.eql(test_data.user.status);
    });
  });

  it('Get User\'s Projects', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    await request(server)
    .post('/api-control/get-projects')
    .trustLocalhost()
    .set('Accept', 'application/json')
    .send()
    .set('Authorization', token)
    .expect(200)
    .then(async (res) => {
      // console.log(res.body)
      expect(res.body.status).to.be.eql('OK');
    });
  });

  it('Create a new Project', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    await request(server)
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
    .then(async (res) => {
      // console.log(res.body)
      expect(res.body.status).to.be.eql('OK');
      expect(res.body.message).to.be.eql(test_data.message.add_project);
      await fs.writeFile('/tmp/project-id.txt', res.body.project._id, function(err){});
    });
  });

  it('Choose a Project', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const project_id = await fs.readFileSync('/tmp/project-id.txt', 'utf8');
    await request(server)
    .post('/api-control/get-details')
    .trustLocalhost()
    .send({
      projectID: project_id,
    })
    .set('Authorization', token)
    .expect(200)
    .then(async (res) => {
      // console.log(res.body);
      expect(res.body.status).to.be.eql('OK');
    });
  });

  it('Edit Project', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const project_id = await fs.readFileSync('/tmp/project-id.txt', 'utf8');
    await request(server)
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
    .then(async (res) => {
      // console.log(res.body);
      expect(res.body.message).to.be.eql(test_data.message.edit_project);
      expect(res.body.status).to.be.eql('OK');
    });
  });

  it('Get Sprints of Project', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const project_id = await fs.readFileSync('/tmp/project-id.txt', 'utf8');
    await request(server)
    .post('/api-control/get-sprints')
    .trustLocalhost()
    .send({
      projectID: project_id
    })
    .set('Authorization', token)
    .expect(200)
    .then(async (res) => {
      // console.log(res.body);
      expect(res.body.status).to.be.eql('OK');
    });
  });

  it('Get UserStories of Project', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const project_id = await fs.readFileSync('/tmp/project-id.txt', 'utf8');
    await request(server)
    .post('/api-control/get-userstories')
    .trustLocalhost()
    .send({
      projectID: project_id
    })
    .set('Authorization', token)
    .expect(200)
    .then(async (res) => {
      // console.log(res.body);
      expect(res.body.status).to.be.eql('OK');
    });
  });

  // it('Get Tasks of Project', async () => {});
  it('Add new Sprint to Project', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const project_id = await fs.readFileSync('/tmp/project-id.txt', 'utf8');
    await request(server)
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
    .then(async (res) => {
      // console.log(res.body)
      expect(res.body.status).to.be.eql('OK');
      expect(res.body.message).to.be.eql(test_data.message.add_sprint);
      await fs.writeFile('/tmp/sprint-id.txt', res.body.sprint._id, function(err){});
    });
  });

  it('Edit Sprint of Project', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const project_id = await fs.readFileSync('/tmp/project-id.txt', 'utf8');
    const sprint_id = await fs.readFileSync('/tmp/sprint-id.txt', 'utf8');
    await request(server)
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
    .then(async (res) => {
      // console.log(res.body)
      expect(res.body.status).to.be.eql('OK');
      expect(res.body.message).to.be.eql(test_data.message.edit_sprint);
    })
    // .catch(err => {
    //   console.log(err)
    // })
  });

  it('Add new UserStory to Project', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const project_id = await fs.readFileSync('/tmp/project-id.txt', 'utf8');
    await request(server)
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
    .then(async (res) => {
      // console.log(res.body)
      expect(res.body.status).to.be.eql('OK');
      expect(res.body.message).to.be.eql(test_data.message.add_userStory);
      await fs.writeFile('/tmp/userStory-id.txt', res.body.userStory._id, function(err){});
    });
  });

  it('Edit UserStory of Project', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const project_id = await fs.readFileSync('/tmp/project-id.txt', 'utf8');
    const userStory_id = await fs.readFileSync('/tmp/userStory-id.txt', 'utf8');
    await request(server)
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
    .then(async (res) => {
      // console.log(res.body)
      expect(res.body.status).to.be.eql('OK');
      expect(res.body.message).to.be.eql(test_data.message.edit_userStory);
    });
  });

  it('Add new Task to Project', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const project_id = await fs.readFileSync('/tmp/project-id.txt', 'utf8');
    const userStory_id = await fs.readFileSync('/tmp/userStory-id.txt', 'utf8');
    await request(server)
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
    .then(async (res) => {
      // console.log(res.body)
      expect(res.body.status).to.be.eql('OK');
      expect(res.body.message).to.be.eql(test_data.message.add_task);
      await fs.writeFile('/tmp/task-id1.txt', res.body.task._id, function(err){});
    });
  });

  it('Add second Task to Project', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const project_id = await fs.readFileSync('/tmp/project-id.txt', 'utf8');
    const userStory_id = await fs.readFileSync('/tmp/userStory-id.txt', 'utf8');
    await request(server)
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
    .then(async (res) => {
      // console.log(res.body)
      expect(res.body.status).to.be.eql('OK');
      expect(res.body.message).to.be.eql(test_data.message.add_task);
      await fs.writeFile('/tmp/task-id2.txt', res.body.task._id, function(err){});
    });
  });

  // it('Join first Task of Project', async () => {
  //   const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
  //   const project_id = await fs.readFileSync('/tmp/project-id.txt', 'utf8');
  //   const task_id = await fs.readFileSync('/tmp/task-id1.txt', 'utf8');
  //   await request(server)
  //   .post('/api-control/join-task')
  //   .trustLocalhost()
  //   .send({
  //     projectID: project_id,
  //     taskID: task_id
  //   })
  //   .set('Authorization', token)
  //   .expect(200)
  //   .then(async (res) => {
  //     // console.log(res.body)
  //     expect(res.body.status).to.be.eql('OK');
  //     expect(res.body.message).to.be.eql(test_data.message.join_task);
  //   });
  // });

  it('Edit first Task of Project', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const project_id = await fs.readFileSync('/tmp/project-id.txt', 'utf8');
    const task_id = await fs.readFileSync('/tmp/task-id1.txt', 'utf8');
    await request(server)
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
    .then(async (res) => {
      // console.log(res.body)
      expect(res.body.status).to.be.eql('OK');
      expect(res.body.message).to.be.eql(test_data.message.edit_task);
    });
  });

  it('Set second Task after first Task of Project', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const project_id = await fs.readFileSync('/tmp/project-id.txt', 'utf8');
    const task_id1 = await fs.readFileSync('/tmp/task-id1.txt', 'utf8');
    const task_id2 = await fs.readFileSync('/tmp/task-id2.txt', 'utf8');
    await request(server)
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
    .then(async (res) => {
      // console.log(res.body)
      expect(res.body.status).to.be.eql('OK');
      expect(res.body.message).to.be.eql(test_data.message.connect_task_task);
    });
  });

  it('Unlink the two Tasks of Project', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const project_id = await fs.readFileSync('/tmp/project-id.txt', 'utf8');
    const task_id1 = await fs.readFileSync('/tmp/task-id1.txt', 'utf8');
    const task_id2 = await fs.readFileSync('/tmp/task-id2.txt', 'utf8');
    await request(server)
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
    .then(async (res) => {
      // console.log(res.body)
      expect(res.body.status).to.be.eql('OK');
      expect(res.body.message).to.be.eql(test_data.message.disconnect_task_task);
    });
  });

  it('Set second Task before first Task of Project', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const project_id = await fs.readFileSync('/tmp/project-id.txt', 'utf8');
    const task_id1 = await fs.readFileSync('/tmp/task-id1.txt', 'utf8');
    const task_id2 = await fs.readFileSync('/tmp/task-id2.txt', 'utf8');
    await request(server)
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
    .then(async (res) => {
      // console.log(res.body)
      expect(res.body.status).to.be.eql('OK');
      expect(res.body.message).to.be.eql(test_data.message.connect_task_task);
    });
  });

  it('Set first Task to first Sprint of Project', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const project_id = await fs.readFileSync('/tmp/project-id.txt', 'utf8');
    const task_id = await fs.readFileSync('/tmp/task-id1.txt', 'utf8');
    const sprint_id = await fs.readFileSync('/tmp/sprint-id.txt', 'utf8');
    await request(server)
    .post('/api-control/connect-task-sprint')
    .trustLocalhost()
    .send({
      projectID: project_id,
      sprintID: sprint_id,
      taskID: task_id
    })
    .set('Authorization', token)
    .expect(200)
    .then(async (res) => {
      // console.log(res.body)
      expect(res.body.status).to.be.eql('OK');
      expect(res.body.message).to.be.eql(test_data.message.connect_task_sprint);
    });
  });

  it('Unlink first Task from Sprint of Project', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const project_id = await fs.readFileSync('/tmp/project-id.txt', 'utf8');
    const task_id = await fs.readFileSync('/tmp/task-id1.txt', 'utf8');
    await request(server)
    .post('/api-control/disconnect-task-sprint')
    .trustLocalhost()
    .send({
      projectID: project_id,
      taskID: task_id
    })
    .set('Authorization', token)
    .expect(200)
    .then(async (res) => {
      // console.log(res.body)
      expect(res.body.status).to.be.eql('OK');
      expect(res.body.message).to.be.eql(test_data.message.disconnect_task_sprint);
    });
  });

  it('Leave first Task of Project', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const project_id = await fs.readFileSync('/tmp/project-id.txt', 'utf8');
    const task_id = await fs.readFileSync('/tmp/task-id1.txt', 'utf8');
    await request(server)
    .post('/api-control/leave-task')
    .trustLocalhost()
    .send({
      projectID: project_id,
      taskID: task_id
    })
    .set('Authorization', token)
    .expect(200)
    .then(async (res) => {
      // console.log(res.body)
      expect(res.body.status).to.be.eql('OK');
      expect(res.body.message).to.be.eql(test_data.message.leave_task);
    });
  });

  it('Delete Sprint of Project', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const project_id = await fs.readFileSync('/tmp/project-id.txt', 'utf8');
    const sprint_id = await fs.readFileSync('/tmp/sprint-id.txt', 'utf8');
    await request(server)
    .post('/api-control/delete-sprint')
    .trustLocalhost()
    .send({
      projectID: project_id,
      sprintID: sprint_id
    })
    .set('Authorization', token)
    .expect(200)
    .then(async (res) => {
      // console.log(res.body);
      expect(res.body.status).to.be.eql('OK');
      expect(res.body.message).to.be.eql(test_data.message.delete_sprint);
    });
  });

  it('Delete Task of Project', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const project_id = await fs.readFileSync('/tmp/project-id.txt', 'utf8');
    const task_id = await fs.readFileSync('/tmp/task-id1.txt', 'utf8');
    await request(server)
    .post('/api-control/delete-task')
    .trustLocalhost()
    .send({
      projectID: project_id,
      taskID: task_id
    })
    .set('Authorization', token)
    .expect(200)
    .then(async (res) => {
      // console.log(res.body);
      expect(res.body.status).to.be.eql('OK');
      expect(res.body.message).to.be.eql(test_data.message.delete_task);
    });
  });

  it('Delete UserStory of Project', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const project_id = await fs.readFileSync('/tmp/project-id.txt', 'utf8');
    const userStory_id = await fs.readFileSync('/tmp/userStory-id.txt', 'utf8');
    await request(server)
    .post('/api-control/delete-userstory')
    .trustLocalhost()
    .send({
      projectID: project_id,
      userStoryID: userStory_id
    })
    .set('Authorization', token)
    .expect(200)
    .then(async (res) => {
      // console.log(res.body);
      expect(res.body.status).to.be.eql('OK');
      expect(res.body.message).to.be.eql(test_data.message.delete_userStory);
    });
  });

  it('Delete Project', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const project_id = await fs.readFileSync('/tmp/project-id.txt', 'utf8');
    await request(server)
    .post('/api-control/delete-project')
    .trustLocalhost()
    .send({
      projectID: project_id
    })
    .set('Authorization', token)
    .expect(200)
    .then(async (res) => {
      // console.log(res.body);
      expect(res.body.status).to.be.eql('OK');
      expect(res.body.message).to.be.eql(test_data.message.delete_project);
    });
  });

  it('Admin logout', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    await request(server)
    .get('/api-control/secure-routes/logout')
    .trustLocalhost()
    .set('Authorization', token)
    .expect(200)
    .then(async (res) => {
      expect(res.body.message).to.be.eql(test_data.message.logout);
    });
  });

  it('Reset database for tests', async () => {
    await request(server)
    .get('/api-control/db/reset')
    .trustLocalhost()
    .expect(200)
    .then((res) => {
      // console.log(res.body)
      expect(res.body.status).to.be.eql('OK');
    });
  });

  // afterAll(async done => {
  // })
  server.close();

});