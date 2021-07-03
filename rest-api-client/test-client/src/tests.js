const requests = require('../../requests');
const restAPI = require('../../restAPI');

const sample = {
  user: {
    _id: '000000000000000000000',
    username: 'sample_user',
    firstName: 'Sample',
    lastName: 'User',
    email: 'sample_user@gmail.com',
    status: 'Pending',
    projects: [],
    invitations: [],
    plan_in_use: 'standard'
  },
  project: null,
  tokenObject: null
}

export const runTests = async () => {

  // Requests will be made for testing
  requests.setTesting(true);
  
  // Sign up sample user
  // ------------------
  var data = {
    username: 'sample_user',
    password: 'some_pwd',
    email: 'sample_user@gmail.com',
    firstName: 'Sample',
    lastName: 'User',
  }
  await restAPI.actions.signup(data)
  .then(function(message) {
    if(!message)  throw '\n--- Testing sign up: '+'\x1b[31m%s\x1b[0m','FAILED\n'
    else console.log('\n--- Testing sign up: '+'\x1b[32m%s\x1b[0m','SUCCESSFUL\n');
  })
  .catch(function(error) { throw '\n--- Testing sign up: '+'\x1b[31m%s\x1b[0m', error.message +'\n' });
  
  // Log in sample user
  // ------------------
  await restAPI.actions.login('sample_user', 'some_pwd')
  .then(function(message) {
    if(!message)  throw '\n--- Testing log in: '+'\x1b[31m%s\x1b[0m','FAILED\n'
    else console.log('\n--- Testing log in: '+'\x1b[32m%s\x1b[0m','SUCCESSFUL\n');
  })
  .catch(function(error) { throw '\n--- Testing log in: '+'\x1b[31m%s\x1b[0m', error.message +'\n' });

  // Get all users
  // -------------
  await restAPI.actions.getUsers()
  .then(function(response) {
    if(!response)  throw '\n--- Testing get all users: '+'\x1b[31m%s\x1b[0m','FAILED\n'
    else console.log('\n--- Testing get all users: '+'\x1b[32m%s\x1b[0m','SUCCESSFUL\n');
  })
  .catch(function(error) { throw '\n--- Testing get all users: '+'\x1b[31m%s\x1b[0m', error.message +'\n' });

  // User forgot password
  // --------------------
  await restAPI.actions.forgotPassword('sample_user@gmail.com')
  .then(function(message) {
    if(!message)  throw '\n--- Testing user forgot their password: '+'\x1b[31m%s\x1b[0m','FAILED\n'
    else console.log('\n--- Testing user forgot their password: '+'\x1b[32m%s\x1b[0m','SUCCESSFUL\n');
  })
  .catch(function(error) { throw '\n--- Testing user forgot their password: '+'\x1b[31m%s\x1b[0m', error.message +'\n' });

  // Url to sign up with google
  // --------------------------
  await restAPI.actions.signupGoogle()
  .then(function(url) {
    if(!url)  throw '\n--- Testing url to sign up with Google: '+'\x1b[31m%s\x1b[0m','FAILED\n'
    else console.log('\n--- Testing url to sign up with Google: '+'\x1b[32m%s\x1b[0m','SUCCESSFUL\n');
  })
  .catch(function(error) { throw '\n--- Testing url to sign up with Google: '+'\x1b[31m%s\x1b[0m', error.message +'\n' });

  // Url to log in with google
  // -------------------------
  await restAPI.actions.loginGoogle()
  .then(function(url) {
    if(!url)  throw '\n--- Testing url to log in with Google: '+'\x1b[31m%s\x1b[0m','FAILED\n'
    else console.log('\n--- Testing url to log in with Google: '+'\x1b[32m%s\x1b[0m','SUCCESSFUL\n');
  })
  .catch(function(error) { throw '\n--- Testing url to log in with Google: '+'\x1b[31m%s\x1b[0m', error.message +'\n' });

  // Get sample user
  // ---------------
  await restAPI.actions.getUser()
  .then(function() {
    console.log('\n--- Testing get user\'s info: '+'\x1b[32m%s\x1b[0m','SUCCESSFUL\n');
  })
  .catch(function(error) { throw '\n--- Testing get user\'s info: '+'\x1b[31m%s\x1b[0m', error.message +'\n' });

  // Edit sample user
  // ----------------
  await restAPI.actions.updateUser({})
  .then(function(response) {
    if(!response || !response.message)  throw '\n--- Testing edit user\'s info: '+'\x1b[31m%s\x1b[0m','FAILED\n'
    else console.log('\n--- Testing edit user\'s info: '+'\x1b[32m%s\x1b[0m','SUCCESSFUL\n');
  })
  .catch(function(error) { throw '\n--- Testing edit user\'s info: '+'\x1b[31m%s\x1b[0m', error.message +'\n' });

  // Reset user's password
  // ---------------------
  data = {
    old: 'some_pwd',
    new: 'some_pwd',
    confirm: 'some_pwd',
  }
  await restAPI.actions.resetPassword(data)
  .then(function(message) {
    if(!message)  throw '\n--- Testing reset user\'s password: '+'\x1b[31m%s\x1b[0m','FAILED\n'
    else console.log('\n--- Testing reset user\'s password: '+'\x1b[32m%s\x1b[0m','SUCCESSFUL\n');
  })
  .catch(function(error) { throw '\n--- Testing reset user\'s password: '+'\x1b[31m%s\x1b[0m', error.message +'\n' });

  // Make user's plan premium
  // ------------------------
  await restAPI.actions.getPremium('month')
  .then(function(message) {
    if(!message)  throw '\n--- Testing upgrade user\'s plan to premium: '+'\x1b[31m%s\x1b[0m','FAILED\n'
    else console.log('\n--- Testing upgrade user\'s plan to premium: '+'\x1b[32m%s\x1b[0m','SUCCESSFUL\n');
  })
  .catch(function(error) { throw '\n--- Testing upgrade user\'s plan to premium: '+'\x1b[31m%s\x1b[0m', error.message +'\n' });

  // Create sample project
  // ---------------------
  data = sampleHandler.initProject();
  await restAPI.actions.addProject(data)
  .then(function(message) {
    if(!message)  throw '\n--- Testing add new project: '+'\x1b[31m%s\x1b[0m','FAILED\n'
    else console.log('\n--- Testing add new project: '+'\x1b[32m%s\x1b[0m','SUCCESSFUL\n');
  })
  .catch(function(error) { throw '\n--- Testing add new project: '+'\x1b[31m%s\x1b[0m', error.message +'\n' });

  // Invite user to project
  // ----------------------------
  data = {
    users: [sample.user.username],
    project: sample.project.name
  }
  await restAPI.actions.inviteUser(restAPI.client.project._id, data)
  .then(function(message) {
    if(!message)  throw '\n--- Testing invite user to project: '+'\x1b[31m%s\x1b[0m','FAILED\n'
    else console.log('\n--- Testing invite user to project: '+'\x1b[32m%s\x1b[0m','SUCCESSFUL\n');
  })
  .catch(function(error) { throw '\n--- Testing invite user to project: '+'\x1b[31m%s\x1b[0m', error.message +'\n' });

  // Get user's invitations
  // ----------------------
  await restAPI.actions.getInvitations()
  .then(function(invitations) {
    if(!invitations)  throw '\n--- Testing get user\'s invitation(s) to project(s): '+'\x1b[31m%s\x1b[0m','FAILED\n'
    else console.log('\n--- Testing get user\'s invitation(s) to project(s): '+'\x1b[32m%s\x1b[0m','SUCCESSFUL\n');
  })
  .catch(function(error) { throw '\n--- Testing get user\'s invitation(s) to project(s): '+'\x1b[31m%s\x1b[0m', error.message +'\n' });

  // Accept invitation to project
  // ----------------------------
  await restAPI.actions.answerInvitation('accept', restAPI.client.user.invitations[0].invitationCode)
  .then(function(message) {
    if(!message)  throw '\n--- Testing accept invitation to project: '+'\x1b[31m%s\x1b[0m','FAILED\n'
    else console.log('\n--- Testing accept invitation to project: '+'\x1b[32m%s\x1b[0m','SUCCESSFUL\n');
  })
  .catch(function(error) { throw '\n--- Testing accept invitation to project: '+'\x1b[31m%s\x1b[0m', error.message +'\n' });

  // Reject invitation to project
  // ----------------------------
  // Send invitation to the user first
  data = {
    users: [sample.user.username],
    project: sample.project.name
  }
  await restAPI.actions.inviteUser(restAPI.client.project._id, data);
  // Let user receive the invitation
  await restAPI.actions.getInvitations();
  await restAPI.actions.answerInvitation('reject', restAPI.client.user.invitations[0].invitationCode)
  .then(function(message) {
    if(!message)  throw '\n--- Testing reject invitation to project: '+'\x1b[31m%s\x1b[0m','FAILED\n'
    else console.log('\n--- Testing reject invitation to project: '+'\x1b[32m%s\x1b[0m','SUCCESSFUL\n');
  })
  .catch(function(error) { throw '\n--- Testing reject invitation to project: '+'\x1b[31m%s\x1b[0m', error.message +'\n' });

  // Get sample project
  // ------------------
  await restAPI.actions.getProject(sample.project.name)
  .then(function() {
    console.log('\n--- Testing get a project\'s info: '+'\x1b[32m%s\x1b[0m','SUCCESSFUL\n');
  })
  .catch(function(error) { throw '\n--- Testing get a project\'s info: '+'\x1b[31m%s\x1b[0m', error.message +'\n' });

  // Get user's projects
  // -------------------
  await restAPI.actions.getProjects()
  .then(function() {
    console.log('\n--- Testing get user\'s all projects: '+'\x1b[32m%s\x1b[0m','SUCCESSFUL\n');
  })
  .catch(function(error) { throw '\n--- Testing get user\'s all projects: '+'\x1b[31m%s\x1b[0m', error.message +'\n' });

  // Edit sample project
  // -------------------
  data = sampleHandler.initProject();
  await restAPI.actions.editProject(data)
  .then(function(message) {
    if(!message)  throw '\n--- Testing edit a project: '+'\x1b[31m%s\x1b[0m','FAILED\n'
    else console.log('\n--- Testing edit a project: '+'\x1b[32m%s\x1b[0m','SUCCESSFUL\n');
  })
  .catch(function(error) { throw '\n--- Testing edit a project: '+'\x1b[31m%s\x1b[0m', error.message +'\n' });

  // Add sample sprint
  // -----------------
  data = sampleHandler.initSprint();
  await restAPI.actions.addSprint(data)
  .then(function(message) {
    if(!message)  throw '\n--- Testing add a sprint: '+'\x1b[31m%s\x1b[0m','FAILED\n'
    else console.log('\n--- Testing add a sprint: '+'\x1b[32m%s\x1b[0m','SUCCESSFUL\n');
  })
  .catch(function(error) { throw '\n--- Testing add a sprint: '+'\x1b[31m%s\x1b[0m', error.message +'\n' });

  // Get a project's sprints
  // -----------------------
  await restAPI.actions.getSprints()
  .then(function() {
    console.log('\n--- Testing get a project\'s sprints: '+'\x1b[32m%s\x1b[0m','SUCCESSFUL\n');
  })
  .catch(function(error) { throw '\n--- Testing get a project\'s sprints: '+'\x1b[31m%s\x1b[0m', error.message +'\n' });

  // Add sample user story
  // ---------------------
  data = sampleHandler.initUserStory();
  await restAPI.actions.addUserStory(data)
  .then(function(message) {
    if(!message)  throw '\n--- Testing add a user story: '+'\x1b[31m%s\x1b[0m','FAILED\n'
    else console.log('\n--- Testing add a user story: '+'\x1b[32m%s\x1b[0m','SUCCESSFUL\n');
  })
  .catch(function(error) { throw '\n--- Testing add a user story: '+'\x1b[31m%s\x1b[0m', error.message +'\n' });

  // Get a project's user stories
  // ----------------------------
  await restAPI.actions.getUserStories()
  .then(function() {
    console.log('\n--- Testing get a project\'s user stories: '+'\x1b[32m%s\x1b[0m','SUCCESSFUL\n');
  })
  .catch(function(error) { throw '\n--- Testing get a project\'s user stories: '+'\x1b[31m%s\x1b[0m', error.message +'\n' });

  // Add sample task
  // ---------------
  data = sampleHandler.initTask();
  await restAPI.actions.addTask(data)
  .then(function(message) {
    if(!message)  throw '\n--- Testing add a task: '+'\x1b[31m%s\x1b[0m','FAILED\n'
    else console.log('\n--- Testing add a task: '+'\x1b[32m%s\x1b[0m','SUCCESSFUL\n');
  })
  .catch(function(error) { throw '\n--- Testing add a user story: '+'\x1b[31m%s\x1b[0m', error.message +'\n' });

  // Get user's tasks in a project
  // -----------------------------
  let myTasks = restAPI.actions.getMyTasks()
  if(myTasks) {
    console.log('\n--- Testing get user\'s tasks in a project: '+'\x1b[32m%s\x1b[0m','SUCCESSFUL\n');
  } else {
    throw '\n--- Testing get user\'s tasks in a project: '+'\x1b[31m%s\x1b[0m', 'FAILED' +'\n'
  }

  // Edit sample sprint
  // ------------------
  data = sampleHandler.initSprint()
  await restAPI.actions.editSprint(data)
  .then(function(message) {
    if(!message)  throw '\n--- Testing edit a sprint: '+'\x1b[31m%s\x1b[0m','FAILED\n'
    else console.log('\n--- Testing edit a sprint: '+'\x1b[32m%s\x1b[0m','SUCCESSFUL\n');
  })
  .catch(function(error) { throw '\n--- Testing edit a sprint: '+'\x1b[31m%s\x1b[0m', error.message +'\n' });

  // Edit sample user story
  // ----------------------
  data = sampleHandler.initUserStory()
  await restAPI.actions.editUserStory(data)
  .then(function(message) {
    if(!message)  throw '\n--- Testing edit a user story: '+'\x1b[31m%s\x1b[0m','FAILED\n'
    else console.log('\n--- Testing edit a user story: '+'\x1b[32m%s\x1b[0m','SUCCESSFUL\n');
  })
  .catch(function(error) { throw '\n--- Testing edit a user story: '+'\x1b[31m%s\x1b[0m', error.message +'\n' });

  // Edit sample task
  // ----------------
  data = sampleHandler.initTask()
  await restAPI.actions.editTask(data)
  .then(function(message) {
    if(!message)  throw '\n--- Testing edit a task: '+'\x1b[31m%s\x1b[0m','FAILED\n'
    else console.log('\n--- Testing edit a task: '+'\x1b[32m%s\x1b[0m','SUCCESSFUL\n');
  })
  .catch(function(error) { throw '\n--- Testing edit a task: '+'\x1b[31m%s\x1b[0m', error.message +'\n' });

  // Join sample task
  // ----------------
  data = sampleHandler.initTask()
  await restAPI.actions.editTask(data)
  .then(function(message) {
    if(!message)  throw '\n--- Testing join a task: '+'\x1b[31m%s\x1b[0m','FAILED\n'
    else console.log('\n--- Testing join a task: '+'\x1b[32m%s\x1b[0m','SUCCESSFUL\n');
  })
  .catch(function(error) { throw '\n--- Testing join a task: '+'\x1b[31m%s\x1b[0m', error.message +'\n' });

  // Leave sample task
  // -----------------
  data = sampleHandler.initTask()
  await restAPI.actions.leaveTask(data)
  .then(function(message) {
    if(!message)  throw '\n--- Testing leave a task: '+'\x1b[31m%s\x1b[0m','FAILED\n'
    else console.log('\n--- Testing leave a task: '+'\x1b[32m%s\x1b[0m','SUCCESSFUL\n');
  })
  .catch(function(error) { throw '\n--- Testing leave a task: '+'\x1b[31m%s\x1b[0m', error.message +'\n' });

  // Connect sample tasks
  // --------------------
  let task1 = sampleHandler.initTask();
  let task2 = sampleHandler.initTask();
  let conn = 'before';
  await restAPI.actions.connectTasks(task1, task2, conn)
  .then(function(message) {
    if(!message)  throw '\n--- Testing connect two tasks: '+'\x1b[31m%s\x1b[0m','FAILED\n'
    else console.log('\n--- Testing connect two tasks: '+'\x1b[32m%s\x1b[0m','SUCCESSFUL\n');
  })
  .catch(function(error) { throw '\n--- Testing connect two tasks: '+'\x1b[31m%s\x1b[0m', error.message +'\n' });

  // Disconnect sample tasks
  // -----------------------
  task1 = sampleHandler.initTask();
  task2 = sampleHandler.initTask();
  conn = 'before';
  await restAPI.actions.disconnectTasks(task1, task2, conn)
  .then(function(message) {
    if(!message)  throw '\n--- Testing disconnect two tasks: '+'\x1b[31m%s\x1b[0m','FAILED\n'
    else console.log('\n--- Testing disconnect two tasks: '+'\x1b[32m%s\x1b[0m','SUCCESSFUL\n');
  })
  .catch(function(error) { throw '\n--- Testing disconnect two tasks: '+'\x1b[31m%s\x1b[0m', error.message +'\n' });

  // Connect task to sprint
  // ----------------------
  let task = sampleHandler.initTask();
  let sprint = sampleHandler.initSprint();
  await restAPI.actions.connectSprint(task, sprint)
  .then(function(message) {
    if(!message)  throw '\n--- Testing connect a task to a sprint: '+'\x1b[31m%s\x1b[0m','FAILED\n'
    else console.log('\n--- Testing connect a task to a sprint: '+'\x1b[32m%s\x1b[0m','SUCCESSFUL\n');
  })
  .catch(function(error) { throw '\n--- Testing connect a task to a sprint: '+'\x1b[31m%s\x1b[0m', error.message +'\n' });

  // Disconnect task from sprint
  // ---------------------------
  task = JSON.parse(JSON.stringify(sample.project.userStories[0].tasks[0]));
  await restAPI.actions.disconnectSprint(task)
  .then(function(message) {
    if(!message)  throw '\n--- Testing disconnect a task from sprint: '+'\x1b[31m%s\x1b[0m','FAILED\n'
    else console.log('\n--- Testing disconnect a task from sprint: '+'\x1b[32m%s\x1b[0m','SUCCESSFUL\n');
  })
  .catch(function(error) { throw '\n--- Testing disconnect a task from a sprint: '+'\x1b[31m%s\x1b[0m', error.message +'\n' });

  // Delete sample task
  // ------------------
  data = JSON.parse(JSON.stringify(sample.project.userStories[0].tasks[0]))
  await restAPI.actions.deleteTask(data)
  .then(function(message) {
    if(!message)  throw '\n--- Testing delete a task: '+'\x1b[31m%s\x1b[0m','FAILED\n'
    else console.log('\n--- Testing delete a task: '+'\x1b[32m%s\x1b[0m','SUCCESSFUL\n');
  })
  .catch(function(error) { throw '\n--- Testing delete a task: '+'\x1b[31m%s\x1b[0m', error.message +'\n' });

  // Delete sample user story
  // ------------------------
  data = sampleHandler.initUserStory()
  await restAPI.actions.deleteUserStory(data)
  .then(function(message) {
    if(!message)  throw '\n--- Testing delete a user story: '+'\x1b[31m%s\x1b[0m','FAILED\n'
    else console.log('\n--- Testing delete a user story: '+'\x1b[32m%s\x1b[0m','SUCCESSFUL\n');
  })
  .catch(function(error) { throw '\n--- Testing delete a user story: '+'\x1b[31m%s\x1b[0m', error.message +'\n' });

  // Delete sample sprint
  // --------------------
  data = sampleHandler.initSprint()
  await restAPI.actions.deleteSprint(data)
  .then(function(message) {
    if(!message)  throw '\n--- Testing delete a sprint: '+'\x1b[31m%s\x1b[0m','FAILED\n'
    else console.log('\n--- Testing delete a sprint: '+'\x1b[32m%s\x1b[0m','SUCCESSFUL\n');
  })
  .catch(function(error) { throw '\n--- Testing delete a sprint: '+'\x1b[31m%s\x1b[0m', error.message +'\n' });

  // Leave sample project
  // --------------------
  await restAPI.actions.leaveProject()
  .then(function(message) {
    if(!message)  throw '\n--- Testing leave a project: '+'\x1b[31m%s\x1b[0m','FAILED\n'
    else console.log('\n--- Testing leave a project: '+'\x1b[32m%s\x1b[0m','SUCCESSFUL\n');
  })
  .catch(function(error) { throw '\n--- Testing leave a project: '+'\x1b[31m%s\x1b[0m', error.message +'\n' });

  // Delete sample project
  // ---------------------
  // Add project first and then delete it
  data = sampleHandler.initProject();
  await restAPI.actions.addProject(data);
  await restAPI.actions.deleteProject()
  .then(function(message) {
    if(!message)  throw '\n--- Testing delete a project: '+'\x1b[31m%s\x1b[0m','FAILED\n'
    else console.log('\n--- Testing delete a project: '+'\x1b[32m%s\x1b[0m','SUCCESSFUL\n');
  })
  .catch(function(error) { throw '\n--- Testing delete a project: '+'\x1b[31m%s\x1b[0m', error.message +'\n' });
  
  // Log out sample user
  // -------------------
  await restAPI.actions.logout()
  .then(function(message) {
    if(!message)  throw '\n--- Testing log out: '+'\x1b[31m%s\x1b[0m','FAILED\n'
    else console.log('\n--- Testing log out: '+'\x1b[32m%s\x1b[0m','SUCCESSFUL\n');
  })
  .catch(function(error) { throw '\n--- Testing log out: '+'\x1b[31m%s\x1b[0m', error.message +'\n' });

  // Delete sample user
  // ------------------
  await restAPI.actions.deleteUser()
  .then(function(message) {
    if(!message)  throw '\n--- Testing delete user: '+'\x1b[31m%s\x1b[0m','FAILED\n'
    else console.log('\n--- Testing delete user: '+'\x1b[32m%s\x1b[0m','SUCCESSFUL\n');
  })
  .catch(function(error) { throw '\n--- Testing delete user: '+'\x1b[31m%s\x1b[0m', error.message +'\n' });

  return 'Testing client was successfully completed!';
}

export const test = async (method, url, data, headers) => {
  if(url === 'users/login') {
    // Check method
    if(method !== 'POST') {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed data
    if(!data || !data.username || !data.password) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }

    sampleHandler.loginUser();

    return {
      message: 'Η σύνδεσή σου ολοκληρώθηκε με επιτυχία.',
      user: JSON.parse(JSON.stringify(sample.user)),
      token: JSON.parse(JSON.stringify(sample.tokenObject))
    }
  }
  else if(url === 'users') {
    // Check method
    if(method !== 'GET') {
      throw { message: 'Προέκυψε σφάλμα.' };
    }

    return [sample.user];
  }
  else if(url === 'users/signup') {
    // Check method
    if(method !== 'POST') {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed data
    if(!data || !data.username || !data.password || !data.email || !data.firstName || !data.lastName
      || (data.plan_in_use && data.plan_in_use !== 'standard' && data.plan_in_use !== 'premium-monthly' && data.plan_in_use !== 'premium-yearly')) {
        throw { message: 'Προέκυψε σφάλμα.' };
    }

    return {
      message: 'Επιτυχής εγγραφή!\nΣου στείλαμε email επιβεβαίωσης. Παρακαλούμε δες το Gmail σου!',
      user: JSON.parse(JSON.stringify(sample.user))
    }
  }
  else if(url === 'users/forgot-password'){
    // Check method
    if(method !== 'PATCH') {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed data
    if(!data || !data.email) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }

    return {
      message: 'Σου στείλαμε email! Παρακαλούμε δες το Gmail σου για να δημιουργήσεις νέο κωδικό πρόσβασης.'
    }
  }
  else if(url === 'users/signup-google') {
    // Check method
    if(method !== 'GET') {
      throw { message: 'Προέκυψε σφάλμα.' };
    }

    return { url: '/some/url/to/signup/with/google' }
  }
  else if(url === 'users/login-google') {
    // Check method
    if(method !== 'GET') {
      throw { message: 'Προέκυψε σφάλμα.' };
    }

    return { url: '/some/url/to/login/with/google' }
  }
  else if(sample.user.invitations[0] && url === `users/answer-invitation/${sample.user.invitations[0].invitationCode}?answer=accept`) {
    // Check method
    if(method !== 'GET') {
      throw { message: 'Προέκυψε σφάλμα.' };
    }

    sampleHandler.answerInvitation('accept');

    return {
      message: `Επιτυχής αποδοχή πρόσκλησης. Είσαι πλέον μέλος στο project ${sample.project.name}!`,
      user: JSON.parse(JSON.stringify(sample.user))
    }
  }
  else if(sample.user.invitations[0] && url === `users/answer-invitation/${sample.user.invitations[0].invitationCode}?answer=reject`) {
    // Check method
    if(method !== 'GET') {
      throw { message: 'Προέκυψε σφάλμα.' };
    }

    sampleHandler.answerInvitation('reject');

    return {
        message: `Η πρόσκληση στο project ${sample.project.name} απορρίφθηκε με επιτυχία.`,
        user: JSON.parse(JSON.stringify(sample.user))
    }
  }
  else if(url === 'secure-routes/user') {
    // Check method
    if(method !== 'GET') {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed headers
    if(!headers || !headers["Authorization"]) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }

    return {
      user: JSON.parse(JSON.stringify(sample.user))
    }
  }
  else if(url === 'secure-routes/invitations') {
    // Check method
    if(method !== 'GET') {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed headers
    if(!headers || !headers["Authorization"]) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }

    return {
      invitations: JSON.parse(JSON.stringify(sample.user.invitations)),
      user: JSON.parse(JSON.stringify(sample.user))
    }
  }
  else if(url === 'secure-routes/logout') {
    // Check method
    if(method !== 'GET') {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed headers
    if(!headers || !headers["Authorization"]) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }

    sampleHandler.logoutUser();

    return { message: 'Επιτυχής αποσύνδεση.' }
  }
  else if(url === 'secure-routes/edit-user') {
    // Check method
    if(method !== 'PATCH') {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed headers
    if(!headers || !headers["Authorization"]) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }

    if(data.email) {
      return {
        message: 'Ο λογαριασμός σου ενημερώθηκε με επιτυχία.\nΣου στείλαμε email επιβεβαίωσης. Παρακαλούμε δες το Gmail σου!',
        user: sample.user,
        email: 'updated'
      }
    }

    return {
      message: 'Ο λογαριασμός σου ενημερώθηκε με επιτυχία.',
      user: JSON.parse(JSON.stringify(sample.user))
    }
  }
  else if(url === 'secure-routes/reset-password') {
    // Check method
    if(method !== 'PATCH') {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed data
    if(!data || !data.old || !data.new || !data.confirm) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed headers
    if(!headers || !headers["Authorization"]) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }

    return {
      message: 'Επιτυχής ενημέρωση του κωδικού πρόσβασης.'
    }
  }
  else if(url === 'secure-routes/upgrade-plan') {
    // Check method
    if(method !== 'PATCH') {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed data
    if(!data || !data.plan_in_use) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed headers
    if(!headers || !headers["Authorization"]) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }

    sampleHandler.upgradeUserPlan();

    return {
      message: 'Ο λογαριασμός σου αναβαθμίστηκε με επιτυχία σε προνομιούχος!',
      user: JSON.parse(JSON.stringify(sample.user))
    }
  }
  else if(url === 'secure-routes/delete-user') {
    // Check method
    if(method !== 'DELETE') {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed headers
    if(!headers || !headers["Authorization"]) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }

    sampleHandler.logoutUser();

    return { message: 'Επιτυχής διαγραφή λογαριασμού.' }
  }
  else if(sample.project && url === `secure-routes/project-invite/${sample.project._id}`) {
    // Check method
    if(method !== 'POST') {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed data
    if(!data || !data.users || !data.project) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed headers
    if(!headers || !headers["Authorization"]) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }

    sampleHandler.inviteUser();

    if(data.users.length == 1) {
      return { message: `Η πρόσκληση του χρήστη ${data.users[0]} στο project ${data.project} στάλθηκε με επιτυχία!` }
    }

    return { message: `Όλες οι προσκλήσεις μελών στο project ${data.project} στάλθηκαν με επιτυχία!` }
  }
  else if(url === 'add-project') {
    // Check method
    if(method !== 'POST') {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed data
    if(!data || !data.project) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed headers
    if(!headers || !headers["Authorization"]) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    sampleHandler.addProject();

    return {
      status: 'OK',
      message: 'Το Project δημιουργήθηκε με επιτυχία.',
      project: JSON.parse(JSON.stringify(sample.project))
    }
  }
  else if(url === 'get-details') {
    // Check method
    if(method !== 'POST') {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed data
    if(!data || !data.projectID) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed headers
    if(!headers || !headers["Authorization"]) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }

    return {
      status: 'OK',
      project: JSON.parse(JSON.stringify(sample.project))
    }
  }
  else if(url === 'get-projects') {
    // Check method
    if(method !== 'POST') {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed headers
    if(!headers || !headers["Authorization"]) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }

    return {
      status: 'OK',
      projects: JSON.parse(JSON.stringify(sample.user.projects))
    }
  }
  else if(url === 'edit-project') {
    // Check method
    if(method !== 'POST') {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed data
    if(!data || !data.project) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed headers
    if(!headers || !headers["Authorization"]) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }

    return {
      status: 'OK',
      message: 'Το Project τροποποιήθηκε με επιτυχία.',
      project: JSON.parse(JSON.stringify(sample.project))
    }
  }
  else if(url === 'add-sprint') {
    // Check method
    if(method !== 'POST') {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed data
    if(!data || !data.projectID || !data.sprint) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed headers
    if(!headers || !headers["Authorization"]) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }

    sampleHandler.addSprint();

    return {
      status: 'OK',
      message: 'Το Sprint δημιουργήθηκε με επιτυχία.',
      sprint: JSON.parse(JSON.stringify(sample.project.sprints[0]))
    }
  }
  else if(url === 'get-sprints') {
    // Check method
    if(method !== 'POST') {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed headers
    if(!headers || !headers["Authorization"]) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }

    return {
      status: 'OK',
      sprints: JSON.parse(JSON.stringify(sample.project.sprints))
    }
  }
  else if(url === 'add-userstory') {
    // Check method
    if(method !== 'POST') {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed data
    if(!data || !data.projectID || !data.userStory) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed headers
    if(!headers || !headers["Authorization"]) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }

    sampleHandler.addUserStory();

    return {
      status: 'OK',
      message: 'Το UserStory δημιουργήθηκε με επιτυχία.',
      userStory: JSON.parse(JSON.stringify(sample.project.userStories[0]))
    }
  }
  else if(url === 'get-userstories') {
    // Check method
    if(method !== 'POST') {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed headers
    if(!headers || !headers["Authorization"]) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }

    return {
      status: 'OK',
      userStories: JSON.parse(JSON.stringify(sample.project.userStories))
    }
  }
  else if(url === 'add-task') {
    // Check method
    if(method !== 'POST') {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed data
    if(!data || !data.projectID || !data.task) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed headers
    if(!headers || !headers["Authorization"]) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }

    sampleHandler.addTask();

    return {
      status: 'OK',
      message: 'Το Task δημιουργήθηκε με επιτυχία.',
      task: JSON.parse(JSON.stringify(sample.project.userStories[0].tasks[0]))
    }
  }
  else if(url === 'edit-sprint') {
    // Check method
    if(method !== 'POST') {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed data
    if(!data || !data.projectID || !data.sprint) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed headers
    if(!headers || !headers["Authorization"]) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }

    return {
      status: 'OK',
      message: 'Το Sprint τροποποιήθηκε με επιτυχία.',
      sprint: JSON.parse(JSON.stringify(sample.project.sprints[0]))
    }
  }
  else if(url === 'edit-userstory') {
    // Check method
    if(method !== 'POST') {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed data
    if(!data || !data.projectID || !data.userStory) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed headers
    if(!headers || !headers["Authorization"]) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }

    return {
      status: 'OK',
      message: 'Το UserStory τροποποιήθηκε με επιτυχία.',
      userStory: JSON.parse(JSON.stringify(sample.project.userStories[0]))
    }
  }
  else if(url === 'edit-task') {
    // Check method
    if(method !== 'POST') {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed data
    if(!data || !data.projectID || !data.task) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed headers
    if(!headers || !headers["Authorization"]) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }

    return {
      status: 'OK',
      message: 'Το Task τροποποιήθηκε με επιτυχία.',
      task: JSON.parse(JSON.stringify(sample.project.userStories[0].tasks[0]))
    }
  }
  else if(url === 'join-task') {
    // Check method
    if(method !== 'POST') {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed data
    if(!data || !data.projectID || !data.taskID) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed headers
    if(!headers || !headers["Authorization"]) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }

    sampleHandler.joinTask();

    return {
      status: 'OK',
      message: 'Ο χρήστης έγινε μέλος του Task.',
      task: JSON.parse(JSON.stringify(sample.project.userStories[0].tasks[0]))
    }
  }
  else if(url === 'leave-task') {
    // Check method
    if(method !== 'POST') {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed data
    if(!data || !data.projectID || !data.taskID) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed headers
    if(!headers || !headers["Authorization"]) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }

    sampleHandler.leaveTask();

    return {
      status: 'OK',
      message: 'Ο χρήστης αποχώρησε από το Task.',
      task: JSON.parse(JSON.stringify(sample.project.userStories[0].tasks[0]))
    }
  }
  else if(url === 'connect-task-task') {
    // Check method
    if(method !== 'POST') {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed data
    if(!data || !data.projectID || !data.task1ID || !data.task2ID || !data.conn) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed headers
    if(!headers || !headers["Authorization"]) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }

    sampleHandler.connectTasks();

    return {
      status: 'OK',
      message: 'Τα Tasks συνδέθηκαν μεταξύ τους.',
      task1: JSON.parse(JSON.stringify(sample.project.userStories[0].tasks[0])),
      task2: JSON.parse(JSON.stringify(sample.project.userStories[0].tasks[0]))
    }
  }
  else if(url === 'disconnect-task-task') {
    // Check method
    if(method !== 'POST') {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed data
    if(!data || !data.projectID || !data.task1ID || !data.task2ID || !data.conn) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed headers
    if(!headers || !headers["Authorization"]) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }

    sampleHandler.disconnectTasks();

    return {
      status: 'OK',
      message: 'Τα Tasks αποδεσμεύτηκαν.',
      task1: JSON.parse(JSON.stringify(sample.project.userStories[0].tasks[0])),
      task2: JSON.parse(JSON.stringify(sample.project.userStories[0].tasks[0]))
    }
  }
  else if(url === 'connect-task-sprint') {
    // Check method
    if(method !== 'POST') {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed data
    if(!data || !data.projectID || !data.taskID || !data.sprintID) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed headers
    if(!headers || !headers["Authorization"]) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }

    sampleHandler.connectTaskSprint();

    return {
      status: 'OK',
      message: 'Το Task συνδέθηκε στο Sprint.',
      userStory: JSON.parse(JSON.stringify(sample.project.userStories[0])),
      sprint: JSON.parse(JSON.stringify(sample.project.sprints[0]))
    }
  }
  else if(url === 'disconnect-task-sprint') {
    // Check method
    if(method !== 'POST') {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed data
    if(!data || !data.projectID || !data.taskID) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed headers
    if(!headers || !headers["Authorization"]) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }

    sampleHandler.disconnectTaskSprint();

    return {
      status: 'OK',
      message: 'Το Task αποδεσμεύτηκε από το Sprint.',
      userStory: JSON.parse(JSON.stringify(sample.project.userStories[0])),
      sprint: JSON.parse(JSON.stringify(sample.project.sprints[0]))
    }
  }
  else if(url === 'delete-task') {
    // Check method
    if(method !== 'POST') {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed data
    if(!data || !data.projectID || !data.taskID) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed headers
    if(!headers || !headers["Authorization"]) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
  
    sampleHandler.deleteTask();

    return {
      status: 'OK',
      message: 'Το Task διαγράφθηκε με επιτυχία.',
      project: JSON.parse(JSON.stringify(sample.project))
    }
  }
  else if(url === 'delete-userstory') {
    // Check method
    if(method !== 'POST') {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed data
    if(!data || !data.projectID || !data.userStoryID) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed headers
    if(!headers || !headers["Authorization"]) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
  
    sampleHandler.deleteUserStory();

    return {
      status: 'OK',
      message: 'Το UserStory διαγράφθηκε με επιτυχία.',
      project: JSON.parse(JSON.stringify(sample.project))
    }
  }
  else if(url === 'delete-sprint') {
    // Check method
    if(method !== 'POST') {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed data
    if(!data || !data.projectID || !data.sprintID) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed headers
    if(!headers || !headers["Authorization"]) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
  
    sampleHandler.deleteSprint();

    return {
      status: 'OK',
      message: 'Το Sprint διαγράφθηκε με επιτυχία.',
      project: JSON.parse(JSON.stringify(sample.project))
    }
  }
  else if(url === 'delete-project') {
    // Check method
    if(method !== 'POST') {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed data
    if(!data || !data.projectID) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed headers
    if(!headers || !headers["Authorization"]) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }

    sampleHandler.deleteProject();

    return {
      status: 'OK',
      message: 'Το Project διαγράφθηκε με επιτυχία.'
    }
  }
  else if(url === 'leave-project') {
    // Check method
    if(method !== 'POST') {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed data
    if(!data || !data.projectID) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
    // Check passed headers
    if(!headers || !headers["Authorization"]) {
      throw { message: 'Προέκυψε σφάλμα.' };
    }
  
    sampleHandler.leaveProject();

    return {
      status: 'OK',
      message: 'Ο χρήστης αποχώρησε από το Project.',
      project: JSON.parse(JSON.stringify(sample.project))
    }
  }
  else {
    throw { message: 'Προέκυψε σφάλμα.' };
  }
}

const sampleHandler = {
  initProject() {
    return {
      _id: '111111111111111111111',
      name: 'sample_project',
      description: 'This is a sample project to test the client',
      productOwner: { _id: '000000000000000000000', username: 'sample_user' },
      scrumMaster: { _id: '000000000000000000000', username: 'sample_user' },
      sprints: [],
      userStories: [],
      members: [{ _id: '000000000000000000000', username: 'sample_user' }],
      status: 'inProgress',
      plan_in_use: 'standard',
      startingDate: '2021-06-02'
    }
  },

  initToken() {
    return {
      token: 'TOKEN',
      expires: 'inOneDay'
    }
  },

  initSprint() {
    return {
      _id: '333333333333333333333',
      name: 'sample_sprint',
      description: 'This is a spirnt',
      tasks: [],
      status: 'standard',
      startingDate: '2021-06-02',
      estimated_duration: '3weeks'
    }
  },

  initUserStory() {
    return {
      _id: '444444444444444444444',
      name: 'sample_userStory',
      description: 'This is a user story',
      label: 'issue',
      tasks: [],
      sprints: [],
      status: 'standard',
      startingDate: '2021-06-02',
      estimated_duration: '1week'
    }
  },

  initTask() {
    return {
      _id: '555555555555555555555',
      name: 'sample_task',
      description: 'This is a task',
      sprint: null,
      userStory: '444444444444444444444',
      status: 'standard',
      startingDate: '2021-06-02',
      estimated_duration: '2days',
      beforeTasks: [],
      afterTasks: [],
      members: [{ _id: '000000000000000000000', username: 'sample_user' }]
    }
  },

  loginUser() {
    // Verify user's account
    if(sample.user.status === 'Pending') {
      sample.user.status = 'Active';
    }

    sample.tokenObject = sampleHandler.initToken();
  },

  logoutUser() {
    sample.tokenObject = null;
    sample.project = null;
  },

  upgradeUserPlan() {
    sample.user.plan_in_use = 'premium';
    sample.user['premium_ending_date'] = 'In_a_month_or_a_year';
  },

  inviteUser() {
    sample.user.invitations = [{
      receiver: 'sample_user',
      sender: 'sample_user',
      project: 'sample_project',
      invitationCode: '222222222222222222222'
    }];
  },

  answerInvitation(answer) {
    sample.user.invitations = [];

    if(answer == 'accept') {
      sample.user.projects = [sample.project];
    }
  },

  addProject() {
    sample.user.projects[0] = sampleHandler.initProject();
    sample.project = sampleHandler.initProject();
  },

  addSprint() {
    sample.project.sprints[0] = sampleHandler.initSprint();
    sample.user.projects[0].sprints[0] = sampleHandler.initSprint();
  },

  addUserStory() {
    sample.project.userStories[0] = sampleHandler.initUserStory();
    sample.user.projects[0].userStories[0] = sampleHandler.initUserStory();
  },

  addTask() {
    sample.project.userStories[0].tasks[0] = sampleHandler.initTask();
    sample.user.projects[0].userStories[0].tasks[0] = sampleHandler.initTask();
  },

  joinTask() {
    sample.project.userStories[0].tasks[0].members = [{ _id: '000000000000000000000', username: 'sample_user' }]
  },

  leaveTask() {
    sample.project.userStories[0].tasks[0].members = []
  },

  connectTasks() {
    sample.project.userStories[0].tasks[0].beforeTasks = [sample.project.userStories[0].tasks[0]._id];
    sample.project.userStories[0].tasks[0].afterTasks = [sample.project.userStories[0].tasks[0]._id];
  },

  disconnectTasks() {
    sample.project.userStories[0].tasks[0].beforeTasks = [];
    sample.project.userStories[0].tasks[0].afterTasks = [];
  },

  connectTaskSprint() {
    sample.project.userStories[0].tasks[0].sprint = sampleHandler.initSprint()._id;
    sample.project.userStories[0].sprints[0] = sampleHandler.initSprint();
    sample.project.sprints[0].tasks[0] = sampleHandler.initTask();
  },

  disconnectTaskSprint() {
    sample.project.userStories[0].tasks[0].sprint = null;
    sample.project.userStories[0].sprints = [];
    sample.project.sprints[0].tasks = [];
  },

  deleteTask() {
    sample.project.userStories[0].tasks = [];
    sample.user.projects[0].userStories[0].tasks = [];
    sample.project.sprints[0].tasks = [];
    sample.user.projects[0].sprints[0].tasks = [];
  },

  deleteUserStory() {
    sample.project.userStories = [];
    sample.user.projects[0].userStories = [];
  },

  deleteSprint() {
    sample.project.sprints = [];
    sample.user.projects[0].sprints = [];
  },

  deleteProject() {
    sample.project = null;
    sample.user.projects = [];
  },

  leaveProject() {
    sample.user.projects = [];
  }
}