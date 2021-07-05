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

export const getUsersRequest = async () => {
  if(TESTING) {
    return tests.test('GET', 'users', {}, {})
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  } else {
    return restAPI.send('GET', 'users', {}, {})
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

export const loginGoogleAuthenticatedRequest = async (code) => {
  return restAPI.send('GET', `users/oauth2callback/login?code=${code}`, {})
  .then(function(response) { return response })
  .catch(function(error) { throw error })
}

export const signupGoogleAuthenticatedRequest = async (code) => {
  return restAPI.send('GET', `users/oauth2callback/signup?code=${code}`, {})
  .then(function(response) { return response })
  .catch(function(error) { throw error })
}


// PROJECT -----------------------------------------------

export const addProjectRequest = async (project, token) => {
  let headers = { "Authorization": `${token}` };

  if(TESTING) {
    return tests.test('POST', 'add-project', {project}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  } else {
    return restAPI.send('POST', 'add-project', {project}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  }
}

export const getProjectsRequest = async (token) => {
  let headers = { "Authorization": `${token}` };

  if(TESTING) {
    return tests.test('POST', `get-projects`, {}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  } else {
    return restAPI.send('POST', `get-projects`, {}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  }
}

export const inviteUserRequest = async (projectId, data, token) => {
  let headers = { "Authorization": `${token}` };

  if(TESTING) {
    return tests.test('POST', `secure-routes/project-invite/${projectId}`, data, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  } else {
    return restAPI.send('POST', `secure-routes/project-invite/${projectId}`, data, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  }
}

export const answerInvitationRequest = async (answer, invitationCode) => {
  if(TESTING) {
    return tests.test('GET', `users/answer-invitation/${invitationCode}?answer=${answer}`, {})
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  } else {
    return restAPI.send('GET', `users/answer-invitation/${invitationCode}?answer=${answer}`, {})
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  }
}

export const getProjectRequest = async (projectID, token) => {
  let headers = { "Authorization": `${token}` };

  if(TESTING) {
    return tests.test('POST', `get-details`, {projectID}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  } else {
    return restAPI.send('POST', `get-details`, {projectID}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  }
}

export const editProjectRequest = async (projectID, project, token) => {
  let headers = { "Authorization": `${token}` };

  if(TESTING) {
    return tests.test('POST', `edit-project`, {projectID, project}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  } else {
    return restAPI.send('POST', `edit-project`, {projectID, project}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  }
}

export const getSprintsRequest = async (projectID, token) => {
  let headers = { "Authorization": `${token}` };
  let data = { projectID: projectID };

  if(TESTING) {
    return tests.test('POST', `get-sprints`, data, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  } else {
    return restAPI.send('POST', `get-sprints`, data, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  }
}

export const getUserStoriesRequest = async (projectID, token) => {
  let headers = { "Authorization": `${token}` };
  let data = { projectID: projectID };

  if(TESTING) {
    return tests.test('POST', `get-userstories`, data, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  } else {
    return restAPI.send('POST', `get-userstories`, data, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  }
}

export const addSprintRequest = async (projectID, sprint, token) => {
  let headers = { "Authorization": `${token}` };

  if(TESTING) {
    return tests.test('POST', `add-sprint`, {projectID, sprint}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  } else {
    return restAPI.send('POST', `add-sprint`, {projectID, sprint}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  }
}

export const addUserStoryRequest = async (projectID, userStory, token) => {
  let headers = { "Authorization": `${token}` };

  if(TESTING) {
    return tests.test('POST', `add-userstory`, {projectID, userStory}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  } else {
    return restAPI.send('POST', `add-userstory`, {projectID, userStory}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  }
}

export const addTaskRequest = async (projectID, task, token) => {
  let headers = { "Authorization": `${token}` };

  if(TESTING) {
    return tests.test('POST', `add-task`, {projectID, task}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  } else {
    return restAPI.send('POST', `add-task`, {projectID, task}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  }
}

export const editSprintRequest = async (projectID, sprint, token) => {
  let headers = { "Authorization": `${token}` };

  if(TESTING) {
    return tests.test('POST', `edit-sprint`, {projectID, sprint}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  } else {
    return restAPI.send('POST', `edit-sprint`, {projectID, sprint}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  }
}

export const editUserStoryRequest = async (projectID, userStory, token) => {
  let headers = { "Authorization": `${token}` };

  if(TESTING) {
    return tests.test('POST', `edit-userstory`, {projectID, userStory}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  } else {
    return restAPI.send('POST', `edit-userstory`, {projectID, userStory}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  }
}

export const editTaskRequest = async (projectID, task, token) => {
  let headers = { "Authorization": `${token}` };

  if(TESTING) {
    return tests.test('POST', `edit-task`, {projectID, task}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  } else {
    return restAPI.send('POST', `edit-task`, {projectID, task}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  }
}

export const joinTaskRequest = async (projectID, taskID, token) => {
  let headers = { "Authorization": `${token}` };

  if(TESTING) {
    return tests.test('POST', `join-task`, {projectID, taskID}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  } else {
    return restAPI.send('POST', `join-task`, {projectID, taskID}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  }
}

export const leaveTaskRequest = async (projectID, taskID, token) => {
  let headers = { "Authorization": `${token}` };

  if(TESTING) {
    return tests.test('POST', `leave-task`, {projectID, taskID}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  } else {
    return restAPI.send('POST', `leave-task`, {projectID, taskID}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  }
}

export const connectTasksRequest = async (projectID, connection, token) => {
  let headers = { "Authorization": `${token}` };
  if (!connection.task1ID || !connection.task2ID || !connection.conn) throw 'Invalid connection'

  if(TESTING) {
    return tests.test('POST', `connect-task-task`, {projectID, ...connection}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  } else {
    return restAPI.send('POST', `connect-task-task`, {projectID, ...connection}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  }
}

export const disconnectTasksRequest = async (projectID, connection, token) => {
  let headers = { "Authorization": `${token}` };
  if (!connection.task1ID || !connection.task2ID || !connection.conn) throw 'Invalid connection'

  if(TESTING) {
    return tests.test('POST', `disconnect-task-task`, {projectID, ...connection}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  } else {
    return restAPI.send('POST', `disconnect-task-task`, {projectID, ...connection}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  }
}

export const connectSprintRequest = async (projectID, connection, token) => {
  let headers = { "Authorization": `${token}` };
  if (!connection.taskID || !connection.sprintID) throw 'Invalid connection'

  if(TESTING) {
    return tests.test('POST', `connect-task-sprint`, {projectID, ...connection}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  } else {
    return restAPI.send('POST', `connect-task-sprint`, {projectID, ...connection}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  }
}

export const disconnectSprintRequest = async (projectID, connection, token) => {
  let headers = { "Authorization": `${token}` };
  if (!connection.taskID) throw 'Invalid connection'

  if(TESTING) {
    return tests.test('POST', `disconnect-task-sprint`, {projectID, ...connection}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  } else {
    return restAPI.send('POST', `disconnect-task-sprint`, {projectID, ...connection}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  }
}

export const deleteSprintRequest = async (projectID, sprintID, token) => {
  let headers = { "Authorization": `${token}` };

  if(TESTING) {
    return tests.test('POST', `delete-sprint`, {projectID, sprintID}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  } else {
    return restAPI.send('POST', `delete-sprint`, {projectID, sprintID}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  }
}

export const deleteUserStoryRequest = async (projectID, userStoryID, token) => {
  let headers = { "Authorization": `${token}` };

  if(TESTING) {
    return tests.test('POST', `delete-userstory`, {projectID, userStoryID}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  } else {
    return restAPI.send('POST', `delete-userstory`, {projectID, userStoryID}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  }
}

export const deleteTaskRequest = async (projectID, taskID, token) => {
  let headers = { "Authorization": `${token}` };

  if(TESTING) {
    return tests.test('POST', `delete-task`, {projectID, taskID}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  } else {
    return restAPI.send('POST', `delete-task`, {projectID, taskID}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  }
}

export const deleteProjectRequest = async (projectID, token) => {
  let headers = { "Authorization": `${token}` };

  if(TESTING) {
    return tests.test('POST', `delete-project`, {projectID}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  } else {
    return restAPI.send('POST', `delete-project`, {projectID}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  }
}

export const leaveProjectRequest = async (projectID, token) => {
  let headers = { "Authorization": `${token}` };

  if(TESTING) {
    return tests.test('POST', `leave-project`, {projectID}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  } else {
    return restAPI.send('POST', `leave-project`, {projectID}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  }
}