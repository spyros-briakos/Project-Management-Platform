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
  // requests.TESTING = true;
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

  // // Invite user to project
  // // ----------------------------
  // await restAPI.actions.inviteUser(restAPI.client, restAPI.client.user.invitations[0].invitationCode)
  // .then(function(message) {
  //   if(!message)  throw '\n--- Testing accept invitation to project: '+'\x1b[31m%s\x1b[0m','FAILED\n'
  //   else console.log('\n--- Testing accept invitation to project: '+'\x1b[32m%s\x1b[0m','SUCCESSFUL\n');
  // })
  // .catch(function(error) { throw '\n--- Testing accept invitation to project: '+'\x1b[31m%s\x1b[0m', error.message +'\n' });

  // // Get user's invitations
  // // ----------------------
  // await restAPI.actions.getInvitations()
  // .then(function(invitations) {
  //   if(!invitations)  throw '\n--- Testing get user\'s invitation(s) to project(s): '+'\x1b[31m%s\x1b[0m','FAILED\n'
  //   else console.log('\n--- Testing get user\'s invitation(s) to project(s): '+'\x1b[32m%s\x1b[0m','SUCCESSFUL\n');
  // })
  // .catch(function(error) { throw '\n--- Testing get user\'s invitation(s) to project(s): '+'\x1b[31m%s\x1b[0m', error.message +'\n' });

  // // Accept invitation to project
  // // ----------------------------
  // await restAPI.actions.answerInvitation('accept', restAPI.client.user.invitations[0].invitationCode)
  // .then(function(message) {
  //   if(!message)  throw '\n--- Testing accept invitation to project: '+'\x1b[31m%s\x1b[0m','FAILED\n'
  //   else console.log('\n--- Testing accept invitation to project: '+'\x1b[32m%s\x1b[0m','SUCCESSFUL\n');
  // })
  // .catch(function(error) { throw '\n--- Testing accept invitation to project: '+'\x1b[31m%s\x1b[0m', error.message +'\n' });

  // // Reject invitation to project
  // // ----------------------------
  // await restAPI.actions.answerInvitation('reject', restAPI.client.user.invitations[0].invitationCode)
  // .then(function(message) {
  //   if(!message)  throw '\n--- Testing reject invitation to project: '+'\x1b[31m%s\x1b[0m','FAILED\n'
  //   else console.log('\n--- Testing reject invitation to project: '+'\x1b[32m%s\x1b[0m','SUCCESSFUL\n');
  // })
  // .catch(function(error) { throw '\n--- Testing reject invitation to project: '+'\x1b[31m%s\x1b[0m', error.message +'\n' });

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
      user: sample.user,
      token: sample.tokenObject
    }
  }
  else if(url === 'users/signup') {
    // Check method
    if(method !== 'POST') {
      throw { message: 'Προέκυψε σφάλμα.' };
    console.log(method);
    }
    // Check passed data
    if(!data || !data.username || !data.password || !data.email || !data.firstName || !data.lastName
      || (data.plan_in_use && data.plan_in_use !== 'standard' && data.plan_in_use !== 'premium-monthly' && data.plan_in_use !== 'premium-yearly')) {
        throw { message: 'Προέκυψε σφάλμα.' };
    }

    return {
      message: 'Επιτυχής εγγραφή!\nΣου στείλαμε email επιβεβαίωσης. Παρακαλούμε δες το Gmail σου!',
      user: sample.user
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
  else if(sample.user.invitations[0] && url === `users/answer-invitation/${sample.user.invitations[0].invitationCode}?answer='accept'`) {
    // Check method
    if(method !== 'GET') {
      throw { message: 'Προέκυψε σφάλμα.' };
    }

    sampleHandler.answerInvitation('accept');

    return {
      message: `Επιτυχής αποδοχή πρόσκλησης. Είσαι πλέον μέλος στο project ${sample.project.name}!`,
      user: sample.user
    }
  }
  else if(sample.user.invitations[0] && url === `users/answer-invitation/${sample.user.invitations[0].invitationCode}?answer='reject'`) {
    // Check method
    if(method !== 'GET') {
      throw { message: 'Προέκυψε σφάλμα.' };
    }

    sampleHandler.answerInvitation('reject');

    return {
        message: `Η πρόσκληση στο project ${sample.project.name} απορρίφθηκε με επιτυχία.`,
        user: sample.user
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
      user: sample.user
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
      invitations: sample.user.invitations,
      user: sample.user
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
      user: sample.user
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
      user: sample.user
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
      return { message: `Η πρόσκληση του χρήστη ${req.body.users[0]} στο project ${data.project} στάλθηκε με επιτυχία!` }
    }

    return { message: `Όλες οι προσκλήσεις μελών στο project ${data.project} στάλθηκαν με επιτυχία!` }
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
      status: inProgress,
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
  }
}