
const sample = {
  user: {
    _id: '000000000000000000000',
    username: 'sample_user',
    firstName: 'Sample',
    lastName: 'User',
    email: 'sample_user@gmail.com',
    status: 'Pending',
    projects: [{
        _id: '111111111111111111111',
        name: 'sample_project',
        description: 'This is a sample project to test the client',
        productOwner: { _id: '000000000000000000000', username: 'sample_user' },
        scrumMaster: { _id: '000000000000000000000', username: 'sample_user' },
        members: [{ _id: '000000000000000000000', username: 'sample_user' }],
        status: inProgress,
        plan_in_use: 'standard',
        startingDate: '2021-06-02'
      }],
    invitations: [],
    plan_in_use: 'standard'
  },
  project: null,
  tokenObject: null
}

initProject = () => {
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
}

initToken = () => {
  return {
    token: 'TOKEN',
    expires: 'inOneDay'
  }
}

loginUser = () => {
  // Verify user's account
  if(sample.user.status === 'Pending') {
    sample.user.status = 'Active';
  }

  sample.tokenObject = initToken();
}

logoutUser = () => {
  sample.tokenObject = null;
  sample.project = null;
}

upgradeUserPlan = () => {
  sample.user.plan_in_use = 'premium';
  sample.user['premium_ending_date'] = 'In_a_month_or_a_year';
}

inviteUser = () => {
  sample.user.invitations = [{
    receiver: 'sample_user',
    sender: 'sample_user',
    project: 'sample_project',
    invitationCode: '222222222222222222222'
  }];
}

answerInvitation = (answer) => {
  sample.user.invitations = [];

  if(answer == 'accept') {
    sample.user.projects = [sample.project];
  }
}

export const tests = {
  async test(method, url, data, headers) {
    switch (url) {
      case ('users/login'):
        // Check method
        if(method !== 'POST') {
          throw { message: 'Προέκυψε σφάλμα.' };
        }
        // Check passed data
        if(!data || !data.username || !data.password) {
          throw { message: 'Προέκυψε σφάλμα.' };
        }

        loginUser();

        return {
          message: 'Η σύνδεσή σου ολοκληρώθηκε με επιτυχία.',
          user: sample.user,
          token: sample.tokenObject
        }

      case('users/signup'):
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
          user: sample.user
        }

      case('users/forgot-password'):
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

      case('users/signup-google'):
        // Check method
        if(method !== 'GET') {
          throw { message: 'Προέκυψε σφάλμα.' };
        }

        return { url: '/some/url/to/signup/with/google' }

      case('users/login-google'):
        // Check method
        if(method !== 'GET') {
          throw { message: 'Προέκυψε σφάλμα.' };
        }

        return { url: '/some/url/to/login/with/google' }

      case(`users/answer-invitation/${sample.user.invitations[0].invitationCode}?answer='accept'`):
        // Check method
        if(method !== 'GET') {
          throw { message: 'Προέκυψε σφάλμα.' };
        }

        answerInvitation('accept');

        return {
          message: `Επιτυχής αποδοχή πρόσκλησης. Είσαι πλέον μέλος στο project ${sample.project.name}!`,
          user: sample.user
        }

      case(`users/answer-invitation/${sample.user.invitations[0].invitationCode}?answer='reject'`):
        // Check method
        if(method !== 'GET') {
          throw { message: 'Προέκυψε σφάλμα.' };
        }

        answerInvitation('reject');

        return {
            message: `Η πρόσκληση στο project ${sample.project.name} απορρίφθηκε με επιτυχία.`,
            user: sample.user
        }

      case('secure-routes/user'):
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

      case('secure-routes/invitations'):
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

      case('secure-routes/logout'):
        // Check method
        if(method !== 'GET') {
          throw { message: 'Προέκυψε σφάλμα.' };
        }
        // Check passed headers
        if(!headers || !headers["Authorization"]) {
          throw { message: 'Προέκυψε σφάλμα.' };
        }

        logoutUser();

        return { message: 'Επιτυχής αποσύνδεση.' }

      case('secure-routes/edit-user'):
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

      case('secure-routes/reset-password'):
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

      case('secure-routes/upgrade-plan'):
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

        upgradeUserPlan();

        return {
          message: 'Ο λογαριασμός σου αναβαθμίστηκε με επιτυχία σε προνομιούχος!',
          user: sample.user
        }

      case('secure-routes/delete-user'):
        // Check method
        if(method !== 'DELETE') {
          throw { message: 'Προέκυψε σφάλμα.' };
        }
        // Check passed headers
        if(!headers || !headers["Authorization"]) {
          throw { message: 'Προέκυψε σφάλμα.' };
        }

        logoutUser();

        return { message: 'Επιτυχής διαγραφή λογαριασμού.' }

      case(`secure-routes/project-invite/${sample.project._id}`):
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

        inviteUser();

        if(data.users.length == 1) {
          return { message: `Η πρόσκληση του χρήστη ${req.body.users[0]} στο project ${data.project} στάλθηκε με επιτυχία!` }
        }

        return { message: `Όλες οι προσκλήσεις μελών στο project ${data.project} στάλθηκαν με επιτυχία!` }
    }
  }
}