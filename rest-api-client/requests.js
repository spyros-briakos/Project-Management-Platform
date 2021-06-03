const tests = require('./test-client/src/tests');
const restAPI = require('./restAPI');

var TESTING = false

export const setTesting = (value) => {
  TESTING = value;
}


// USER -----------------------------------------------

export const signupRequest = async (data) => {
  if(TESTING) {
    return tests.test('POST', 'users/signup', data)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  } else {
    return restAPI.send('POST', 'users/signup', data)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  }
}

export const loginRequest = async (username, password) => {
  let data = {
    username: username,
    password: password
  }

  if(TESTING) {
    return tests.test('POST', 'users/login', data)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  } else {
    return restAPI.send('POST', 'users/login', data)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  }
}

export const logoutRequest = async (token) => {
  let headers = { "Authorization": `${token}` };

  if(TESTING) {
    return tests.test('GET', 'secure-routes/logout', {}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  } else {
    return restAPI.send('GET', 'secure-routes/logout', {}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  }
}

export const getUserRequest = async (token) => {
  let headers = { "Authorization": `${token}` };

  if(TESTING) {
    return tests.test('GET', 'secure-routes/user', {}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  } else {
    return restAPI.send('GET', 'secure-routes/user', {}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  }
}

export const updateUserRequest = async (data, token) => {
  let headers = { "Authorization": `${token}` };

  if(TESTING) {
    return tests.test('PATCH', 'secure-routes/edit-user', data, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  } else {
    return restAPI.send('PATCH', 'secure-routes/edit-user', data, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  }

}

export const resetPasswordRequest = async (data, token) => {
  let headers = { "Authorization": `${token}` };

  if(TESTING) {
    return tests.test('PATCH', 'secure-routes/reset-password', data, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  } else {
    return restAPI.send('PATCH', 'secure-routes/reset-password', data, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  }
}

export const forgotPasswordRequest = async (email) => {
  let data = { email: email };

  if(TESTING) {
    return tests.test('PATCH', 'users/forgot-password', data)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  } else {
    return restAPI.send('PATCH', 'users/forgot-password', data)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  }
}

export const getPremiumRequest = async (plan, token) => {
  let data = { plan_in_use: plan };
  let headers = { "Authorization": `${token}` };

  if(TESTING) {
    return tests.test('PATCH', 'secure-routes/upgrade-plan', data, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  } else {
    return restAPI.send('PATCH', 'secure-routes/upgrade-plan', data, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  }
}
  
export const deleteUserRequest = async (token) => {
  let headers = { "Authorization": `${token}` };
  
  if(TESTING) {
    return tests.test('DELETE', 'secure-routes/delete-user', {}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  } else {
    return restAPI.send('DELETE', 'secure-routes/delete-user', {}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  }
}

export const getInvitationsRequest = async (token) => {
  let headers = { "Authorization": `${token}` };

  if(TESTING) {
    return tests.test('GET', 'secure-routes/invitations', {}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  } else {
    return restAPI.send('GET', 'secure-routes/invitations', {}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  }
}

export const signupGoogleRequest = async () => {
  if(TESTING) {
    return tests.test('GET', 'users/signup-google', {})
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  } else {
    return restAPI.send('GET', 'users/signup-google', {})
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  }
}

export const loginGoogleRequest = async () => {
  if(TESTING) {
    return tests.test('GET', 'users/login-google', {})
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  } else {
    return restAPI.send('GET', 'users/login-google', {})
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  }
}

//   // PROJECT -----------------------------------------------

//   async getProjectsRequest(token) {
//     let headers = { "Authorization": `${token}` };

//     return restAPI.send('POST', `get-projects`, {}, headers)
//     .then(function(response) { return response })
//     .catch(function(error) { throw error })
//   },

//   async inviteUserRequest(projectId, data, token) {
//     let headers = { "Authorization": `${token}` };

//     return restAPI.send('POST', `secure-routes/project-invite/${projectId}`, data, headers)
//     .then(function(response) { return response })
//     .catch(function(error) { throw error })
//   },

//   async answerInvitationRequest(answer, invitationCode) {
//     return restAPI.send('GET', `users/answer-invitation/${invitationCode}?answer=${answer}`, {})
//     .then(function(response) { return response })
//     .catch(function(error) { throw error })
//   },

//   async getProjectRequest(projectID, token) {
//     let headers = { "Authorization": `${token}` };

//     return restAPI.send('POST', `get-details`, {projectID}, headers)
//     .then(function(response) { return response })
//     .catch(function(error) { throw error })
//   },

//   async addProjectRequest(project, token) {
//     let headers = { "Authorization": `${token}` };

//     return restAPI.send('POST', 'add-project', {project}, headers)
//     .then(function(response) { return response })
//     .catch(function(error) { throw error })
//   },

//   async editProjectRequest(projectID, project, token) {
//     let headers = { "Authorization": `${token}` };

//     return restAPI.send('POST', `edit-project`, {projectID, project}, headers)
//     .then(function(response) { return response })
//     .catch(function(error) { throw error })
//   },

//   async getSprintsRequest(projectID, token) {
//     let headers = { "Authorization": `${token}` };
//     let data = { projectID: projectID };

//     return restAPI.send('POST', `get-sprints`, data, headers)
//     .then(function(response) { return response })
//     .catch(function(error) { throw error })
//   },

//   async getUserStoriesRequest(projectID, token) {
//     let headers = { "Authorization": `${token}` };
//     let data = { projectID: projectID };

//     return restAPI.send('POST', `get-userstories`, data, headers)
//     .then(function(response) { return response })
//     .catch(function(error) { throw error })
//   },

//   async addSprintRequest(projectID, sprint, token) {
//     let headers = { "Authorization": `${token}` };

//     return restAPI.send('POST', `add-sprint`, {projectID, sprint}, headers)
//     .then(function(response) { return response })
//     .catch(function(error) { throw error })
//   },

//   async addUserStoryRequest(projectID, userStory, token) {
//     let headers = { "Authorization": `${token}` };

//     return restAPI.send('POST', `add-userstory`, {projectID, userStory}, headers)
//     .then(function(response) { return response })
//     .catch(function(error) { throw error })
//   },

//   async addTaskRequest(projectID, task, token) {
//     let headers = { "Authorization": `${token}` };

//     return restAPI.send('POST', `add-task`, {projectID, task}, headers)
//     .then(function(response) { return response })
//     .catch(function(error) { throw error })
//   },

//   async editSprintRequest(projectID, sprint, token) {
//     let headers = { "Authorization": `${token}` };

//     return restAPI.send('POST', `edit-sprint`, {projectID, sprint}, headers)
//     .then(function(response) { return response })
//     .catch(function(error) { throw error })
//   },

//   async editUserStoryRequest(projectID, userStory, token) {
//     let headers = { "Authorization": `${token}` };

//     return restAPI.send('POST', `edit-userstory`, {projectID, userStory}, headers)
//     .then(function(response) { return response })
//     .catch(function(error) { throw error })
//   },

//   async editTaskRequest(projectID, task, token) {
//     let headers = { "Authorization": `${token}` };

//     return restAPI.send('POST', `edit-task`, {projectID, task}, headers)
//     .then(function(response) { return response })
//     .catch(function(error) { throw error })
//   },

//   async joinTaskRequest(projectID, taskID, token) {
//     let headers = { "Authorization": `${token}` };

//     return restAPI.send('POST', `join-task`, {projectID, taskID}, headers)
//     .then(function(response) { return response })
//     .catch(function(error) { throw error })
//   },

//   async leaveTaskRequest(projectID, taskID, token) {
//     let headers = { "Authorization": `${token}` };

//     return restAPI.send('POST', `leave-task`, {projectID, taskID}, headers)
//     .then(function(response) { return response })
//     .catch(function(error) { throw error })
//   },

//   async connectTasksRequest(projectID, connection, token) {
//     let headers = { "Authorization": `${token}` };
//     if (!connection.task1ID || !connection.task2ID || !connection.conn) throw 'Invalid connection'

//     return restAPI.send('POST', `connect-task-task`, {projectID, ...connection}, headers)
//     .then(function(response) { return response })
//     .catch(function(error) { throw error })
//   },

//   async disconnectTasksRequest(projectID, connection, token) {
//     let headers = { "Authorization": `${token}` };
//     if (!connection.task1ID || !connection.task2ID || !connection.conn) throw 'Invalid connection'

//     return restAPI.send('POST', `disconnect-task-task`, {projectID, ...connection}, headers)
//     .then(function(response) { return response })
//     .catch(function(error) { throw error })
//   },

//   async connectSprintRequest(projectID, connection, token) {
//     let headers = { "Authorization": `${token}` };
//     if (!connection.taskID || !connection.sprintID) throw 'Invalid connection'

//     return restAPI.send('POST', `connect-task-sprint`, {projectID, ...connection}, headers)
//     .then(function(response) { return response })
//     .catch(function(error) { throw error })
//   },

//   async disconnectSprintRequest(projectID, connection, token) {
//     let headers = { "Authorization": `${token}` };
//     if (!connection.taskID) throw 'Invalid connection'

//     return restAPI.send('POST', `disconnect-task-sprint`, {projectID, ...connection}, headers)
//     .then(function(response) { return response })
//     .catch(function(error) { throw error })
//   },

//   async deleteSprintRequest(projectID, sprintID, token) {
//     let headers = { "Authorization": `${token}` };

//     return restAPI.send('POST', `delete-sprint`, {projectID, sprintID}, headers)
//     .then(function(response) { return response })
//     .catch(function(error) { throw error })
//   },

//   async deleteUserStoryRequest(projectID, userStoryID, token) {
//     let headers = { "Authorization": `${token}` };

//     return restAPI.send('POST', `delete-userstory`, {projectID, userStoryID}, headers)
//     .then(function(response) { return response })
//     .catch(function(error) { throw error })
//   },

//   async deleteTaskRequest(projectID, taskID, token) {
//     let headers = { "Authorization": `${token}` };

//     return restAPI.send('POST', `delete-task`, {projectID, taskID}, headers)
//     .then(function(response) { return response })
//     .catch(function(error) { throw error })
//   },

//   async deleteProjectRequest(projectID, token) {
//     let headers = { "Authorization": `${token}` };

//     return restAPI.send('POST', `delete-project`, {projectID}, headers)
//     .then(function(response) { return response })
//     .catch(function(error) { throw error })
//   },

//   async leaveProjectRequest(projectID, token) {
//     let headers = { "Authorization": `${token}` };

//     return restAPI.send('POST', `leave-project`, {projectID}, headers)
//     .then(function(response) { return response })
//     .catch(function(error) { throw error })
//   }