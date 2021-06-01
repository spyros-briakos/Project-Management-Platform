// // const request = require('supertest');
// const mocha = require('mocha');
const expect = require('chai').expect;
const request = require('supertest');
const server = require('../app');
const fs = require('fs');

const baseURL = 'http://127.0.0.1:3000/api-control';

describe('API Test', () => {
  // it('Reset database', async () => {
  //   await request(server)
  //   .get('/api-control/db/reset')
  //   .trustLocalhost()
  //   .expect(200)
  //   .then((res) => {
  //     // console.log(res.body)
  //     expect(res.body.status).to.be.eql('OK');
  //   });
  // });

  it('Admin login', async () => {
    await request(server)
    .post('/api-control/users/login')
    .trustLocalhost()
    .send({
      username: 'admin',
      password: 'admin1234'
    })
    .expect(200)
    .then(async (res) => {
      // console.log(res.body.user)
      expect(res.body.message).to.be.eql('Η σύνδεσή σου ολοκληρώθηκε με επιτυχία.');
      await fs.writeFile('/tmp/admin-user.json', JSON.stringify(res.body.user), function(err){});
      await fs.writeFile('/tmp/admin-user-token.json', res.body.token.token, function(err){});
    });
  });

  it('Get User\'s Projects', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const data = await fs.readFileSync('/tmp/admin-user.json', 'utf8');
    const user = JSON.parse(data);
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
      user.projects = res.body.projects;
      await fs.writeFile('/tmp/admin-user.json', JSON.stringify(user), function(err){});
    });
  });

  it('Create a new Project', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const data = await fs.readFileSync('/tmp/admin-user.json', 'utf8');
    const user = JSON.parse(data);
    await request(server)
    .post('/api-control/add-project')
    .trustLocalhost()
    .send({
      project: {
        name: 'test',
        description: 'This is a test project'
      }
    })
    .set('Authorization', token)
    .expect(200)
    .then(async (res) => {
      // console.log(res.body)
      expect(res.body.status).to.be.eql('OK');
      await fs.writeFile('/tmp/curr-project.json', JSON.stringify(res.body.project), function(err){});

      user.projects.push(res.body.project);
      await fs.writeFile('/tmp/admin-user.json', JSON.stringify(user), function(err){});
    });
  });

  it('Choose a Project', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const data = await fs.readFileSync('/tmp/admin-user.json', 'utf8');
    const user = JSON.parse(data);
    await request(server)
    .post('/api-control/get-details')
    .trustLocalhost()
    .send({
      projectID: user.projects[0]._id,
    })
    .set('Authorization', token)
    .expect(200)
    .then(async (res) => {
      // console.log(res.body);
      expect(res.body.status).to.be.eql('OK');
      await fs.writeFile('/tmp/curr-project.json', JSON.stringify(res.body.project), function(err){});
    });
  });

  it('Edit Project', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const data = await fs.readFileSync('/tmp/curr-project.json', 'utf8');
    const project = JSON.parse(data);
    await request(server)
    .post('/api-control/edit-project')
    .trustLocalhost()
    .send({
      projectID: project._id,
      project: {
        name: 'new Test Name',
        description: 'This is a test project (new desc)'
      }
    })
    .set('Authorization', token)
    .expect(200)
    .then(async (res) => {
      // console.log(res.body);
      expect(res.body.status).to.be.eql('OK');
      await fs.writeFile('/tmp/curr-project.json', JSON.stringify(res.body.project), function(err){});
    });
  });

  it('Get Sprints of Project', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const data = await fs.readFileSync('/tmp/curr-project.json', 'utf8');
    const project = JSON.parse(data);
    await request(server)
    .post('/api-control/get-sprints')
    .trustLocalhost()
    .send({
      projectID: project._id
    })
    .set('Authorization', token)
    .expect(200)
    .then(async (res) => {
      // console.log(res.body);
      expect(res.body.status).to.be.eql('OK');
      project.sprints = res.body.sprints;
      await fs.writeFile('/tmp/curr-project.json', JSON.stringify(project), function(err){});
    });
  });

  it('Get UserStories of Project', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const data = await fs.readFileSync('/tmp/curr-project.json', 'utf8');
    const project = JSON.parse(data);
    await request(server)
    .post('/api-control/get-userstories')
    .trustLocalhost()
    .send({
      projectID: project._id
    })
    .set('Authorization', token)
    .expect(200)
    .then(async (res) => {
      // console.log(res.body);
      expect(res.body.status).to.be.eql('OK');
      project.userStories = res.body.userStories;
      await fs.writeFile('/tmp/curr-project.json', JSON.stringify(project), function(err){});
    });
  });

  // it('Get Tasks of Project', async () => {});
  it('Add new Sprint to Project', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const data = await fs.readFileSync('/tmp/curr-project.json', 'utf8');
    const project = JSON.parse(data);
    await request(server)
    .post('/api-control/add-sprint')
    .trustLocalhost()
    .send({
      projectID: project._id,
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
      project.sprints.push(res.body.sprint);
      await fs.writeFile('/tmp/curr-project.json', JSON.stringify(project), function(err){});
    });
  });

  it('Edit Sprint of Project', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const data = await fs.readFileSync('/tmp/curr-project.json', 'utf8');
    const project = JSON.parse(data);
    await request(server)
    .post('/api-control/edit-sprint')
    .trustLocalhost()
    .send({
      projectID: project._id,
      sprint: {
        _id: project.sprints[0]._id,
        name: '1st sprint (new name)',
        description: 'This is the first sprint (edited description)'
      }
    })
    .set('Authorization', token)
    .expect(200)
    .then(async (res) => {
      // console.log(res.body)
      expect(res.body.status).to.be.eql('OK');
      project.sprints[0] = res.body.sprint;
      await fs.writeFile('/tmp/curr-project.json', JSON.stringify(project), function(err){});
    });
  });

  it('Add new UserStory to Project', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const data = await fs.readFileSync('/tmp/curr-project.json', 'utf8');
    const project = JSON.parse(data);
    await request(server)
    .post('/api-control/add-userstory')
    .trustLocalhost()
    .send({
      projectID: project._id,
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
      project.userStories.push(res.body.userStory);
      await fs.writeFile('/tmp/curr-project.json', JSON.stringify(project), function(err){});
    });
  });

  it('Edit UserStory of Project', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const data = await fs.readFileSync('/tmp/curr-project.json', 'utf8');
    const project = JSON.parse(data);
    await request(server)
    .post('/api-control/edit-userstory')
    .trustLocalhost()
    .send({
      projectID: project._id,
      userStory: {
        _id: project.userStories[0]._id,
        name: '1st userstory (edited)',
        description: 'This is the first userstory (edited)'
      }
    })
    .set('Authorization', token)
    .expect(200)
    .then(async (res) => {
      // console.log(res.body)
      expect(res.body.status).to.be.eql('OK');
      project.userStories[0] = res.body.userStory;
      await fs.writeFile('/tmp/curr-project.json', JSON.stringify(project), function(err){});
    });
  });

  it('Add new Task to Project', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const data = await fs.readFileSync('/tmp/curr-project.json', 'utf8');
    const project = JSON.parse(data);
    await request(server)
    .post('/api-control/add-task')
    .trustLocalhost()
    .send({
      projectID: project._id,
      task: {
        name: '1st task',
        description: 'This is the first task',
        userStory: project.userStories[0]._id
      }
    })
    .set('Authorization', token)
    .expect(200)
    .then(async (res) => {
      // console.log(res.body)
      expect(res.body.status).to.be.eql('OK');
      project.userStories[0].tasks.push(res.body.task);
      await fs.writeFile('/tmp/curr-project.json', JSON.stringify(project), function(err){});
    });
  });

  it('Add second Task to Project', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const data = await fs.readFileSync('/tmp/curr-project.json', 'utf8');
    const project = JSON.parse(data);
    await request(server)
    .post('/api-control/add-task')
    .trustLocalhost()
    .send({
      projectID: project._id,
      task: {
        name: '2nd task',
        description: 'This is the second task',
        userStory: project.userStories[0]._id
      }
    })
    .set('Authorization', token)
    .expect(200)
    .then(async (res) => {
      // console.log(res.body)
      expect(res.body.status).to.be.eql('OK');
      project.userStories[0].tasks.push(res.body.task);
      await fs.writeFile('/tmp/curr-project.json', JSON.stringify(project), function(err){});
    });
  });

  it('Join first Task of Project', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const data = await fs.readFileSync('/tmp/curr-project.json', 'utf8');
    const project = JSON.parse(data);
    await request(server)
    .post('/api-control/join-task')
    .trustLocalhost()
    .send({
      projectID: project._id,
      taskID: project.userStories[0].tasks[0]._id
    })
    .set('Authorization', token)
    .expect(200)
    .then(async (res) => {
      // console.log(res.body)
      expect(res.body.status).to.be.eql('OK');
      project.userStories[0].tasks[0] = res.body.task;
      await fs.writeFile('/tmp/curr-project.json', JSON.stringify(project), function(err){});
    });
  });

  it('Edit first Task of Project', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const data = await fs.readFileSync('/tmp/curr-project.json', 'utf8');
    const project = JSON.parse(data);
    await request(server)
    .post('/api-control/edit-task')
    .trustLocalhost()
    .send({
      projectID: project._id,
      task: {
        _id: project.userStories[0].tasks[0]._id,
        name: '1st task (edited)',
        description: 'This is the first task (edited)'
      }
    })
    .set('Authorization', token)
    .expect(200)
    .then(async (res) => {
      // console.log(res.body)
      expect(res.body.status).to.be.eql('OK');
      project.userStories[0].tasks[0] = res.body.task;
      await fs.writeFile('/tmp/curr-project.json', JSON.stringify(project), function(err){});
    });
  });

  it('Set second Task after first Task of Project', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const data = await fs.readFileSync('/tmp/curr-project.json', 'utf8');
    const project = JSON.parse(data);
    await request(server)
    .post('/api-control/connect-task-task')
    .trustLocalhost()
    .send({
      projectID: project._id,
      task1ID: project.userStories[0].tasks[0]._id,
      task2ID: project.userStories[0].tasks[1]._id,
      conn:'after'
    })
    .set('Authorization', token)
    .expect(200)
    .then(async (res) => {
      // console.log(res.body)
      expect(res.body.status).to.be.eql('OK');
      project.userStories[0].tasks[0] = res.body.task1;
      project.userStories[0].tasks[1] = res.body.task2;
      await fs.writeFile('/tmp/curr-project.json', JSON.stringify(project), function(err){});
    });
  });

  it('Unlink the two Tasks of Project', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const data = await fs.readFileSync('/tmp/curr-project.json', 'utf8');
    const project = JSON.parse(data);
    await request(server)
    .post('/api-control/disconnect-task-task')
    .trustLocalhost()
    .send({
      projectID: project._id,
      task1ID: project.userStories[0].tasks[0]._id,
      task2ID: project.userStories[0].tasks[1]._id,
      conn:'after'
    })
    .set('Authorization', token)
    .expect(200)
    .then(async (res) => {
      // console.log(res.body)
      expect(res.body.status).to.be.eql('OK');
      project.userStories[0].tasks[0] = res.body.task1;
      project.userStories[0].tasks[1] = res.body.task2;
      await fs.writeFile('/tmp/curr-project.json', JSON.stringify(project), function(err){});
    });
  });

  it('Set second Task before first Task of Project', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const data = await fs.readFileSync('/tmp/curr-project.json', 'utf8');
    const project = JSON.parse(data);
    await request(server)
    .post('/api-control/connect-task-task')
    .trustLocalhost()
    .send({
      projectID: project._id,
      task1ID: project.userStories[0].tasks[0]._id,
      task2ID: project.userStories[0].tasks[1]._id,
      conn:'before'
    })
    .set('Authorization', token)
    .expect(200)
    .then(async (res) => {
      // console.log(res.body)
      expect(res.body.status).to.be.eql('OK');
      project.userStories[0].tasks[0] = res.body.task1;
      project.userStories[0].tasks[1] = res.body.task2;
      await fs.writeFile('/tmp/curr-project.json', JSON.stringify(project), function(err){});
    });
  });

  it('Set first Task to first Sprint of Project', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const data = await fs.readFileSync('/tmp/curr-project.json', 'utf8');
    const project = JSON.parse(data);
    await request(server)
    .post('/api-control/connect-task-sprint')
    .trustLocalhost()
    .send({
      projectID: project._id,
      sprintID: project.sprints[0]._id,
      taskID: project.userStories[0].tasks[0]._id
    })
    .set('Authorization', token)
    .expect(200)
    .then(async (res) => {
      // console.log(res.body)
      expect(res.body.status).to.be.eql('OK');
      project.sprints[0] = res.body.sprint;
      project.userStories[0] = res.body.userStory;
      await fs.writeFile('/tmp/curr-project.json', JSON.stringify(project), function(err){});
    });
  });

  it('Unlink first Task from Sprint of Project', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const data = await fs.readFileSync('/tmp/curr-project.json', 'utf8');
    const project = JSON.parse(data);
    await request(server)
    .post('/api-control/disconnect-task-sprint')
    .trustLocalhost()
    .send({
      projectID: project._id,
      taskID: project.userStories[0].tasks[0]._id
    })
    .set('Authorization', token)
    .expect(200)
    .then(async (res) => {
      // console.log(res.body)
      expect(res.body.status).to.be.eql('OK');
      project.sprints[0] = res.body.sprint;
      project.userStories[0] = res.body.userStory;
      await fs.writeFile('/tmp/curr-project.json', JSON.stringify(project), function(err){});
    });
  });

  it('Leave first Task of Project', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const data = await fs.readFileSync('/tmp/curr-project.json', 'utf8');
    const project = JSON.parse(data);
    await request(server)
    .post('/api-control/leave-task')
    .trustLocalhost()
    .send({
      projectID: project._id,
      taskID: project.userStories[0].tasks[0]._id
    })
    .set('Authorization', token)
    .expect(200)
    .then(async (res) => {
      // console.log(res.body)
      expect(res.body.status).to.be.eql('OK');
      project.userStories[0].tasks[0] = res.body.task;
      await fs.writeFile('/tmp/curr-project.json', JSON.stringify(project), function(err){});
    });
  });

  it('Delete Sprint of Project', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const data = await fs.readFileSync('/tmp/curr-project.json', 'utf8');
    const project = JSON.parse(data)
    await request(server)
    .post('/api-control/delete-sprint')
    .trustLocalhost()
    .send({
      projectID: project._id,
      sprintID: project.sprints[0]._id
    })
    .set('Authorization', token)
    .expect(200)
    .then(async (res) => {
      // console.log(res.body);
      expect(res.body.status).to.be.eql('OK');

      await fs.writeFile('/tmp/curr-project.json', JSON.stringify(res.body.project), function(err){});
    });
  });

  it('Delete Task of Project', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const data = await fs.readFileSync('/tmp/curr-project.json', 'utf8');
    const project = JSON.parse(data)
    await request(server)
    .post('/api-control/delete-task')
    .trustLocalhost()
    .send({
      projectID: project._id,
      taskID: project.userStories[0].tasks[0]._id
    })
    .set('Authorization', token)
    .expect(200)
    .then(async (res) => {
      // console.log(res.body);
      expect(res.body.status).to.be.eql('OK');

      await fs.writeFile('/tmp/curr-project.json', JSON.stringify(res.body.project), function(err){});
    });
  });

  it('Delete UserStory of Project', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const data = await fs.readFileSync('/tmp/curr-project.json', 'utf8');
    const project = JSON.parse(data)
    await request(server)
    .post('/api-control/delete-userstory')
    .trustLocalhost()
    .send({
      projectID: project._id,
      userStoryID: project.userStories[0]._id
    })
    .set('Authorization', token)
    .expect(200)
    .then(async (res) => {
      // console.log(res.body);
      expect(res.body.status).to.be.eql('OK');

      await fs.writeFile('/tmp/curr-project.json', JSON.stringify(res.body.project), function(err){});
    });
  });

  it('Delete Project', async () => {
    const token = await fs.readFileSync('/tmp/admin-user-token.json', 'utf8');
    const data2 = await fs.readFileSync('/tmp/admin-user.json', 'utf8');
    const user = JSON.parse(data2);
    const data = await fs.readFileSync('/tmp/curr-project.json', 'utf8');
    const project = JSON.parse(data)
    await request(server)
    .post('/api-control/delete-project')
    .trustLocalhost()
    .send({
      projectID: project._id
    })
    .set('Authorization', token)
    .expect(200)
    .then(async (res) => {
      // console.log(res.body);
      expect(res.body.status).to.be.eql('OK');
      
      user.projects = user.projects.filter((pID) => { pID !== project._id });
      await fs.writeFile('/tmp/admin-user.json', JSON.stringify(user), function(err){});
      await fs.unlinkSync('/tmp/curr-project.json');
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
      expect(res.body.message).to.be.eql('Επιτυχής αποσύνδεση.');
      await fs.unlinkSync('/tmp/admin-user.json');
      await fs.unlinkSync('/tmp/admin-user-token.json');
    });
  });

  // afterAll(async done => {
  // })
  server.close();
});