// import { sign } from 'crypto';
const util = require('util');

const program = require('commander');
const axios = require('axios');
const https = require('https');
const fs = require('fs');
const utils = require('./utils');

const apiUrl = 'http://127.0.0.1:3000/api-control';
const agent = new https.Agent({
  rejectUnauthorized: false,
});

const restAPI = require('../../../rest-api-client/restAPI');

export function cli(args) {

  program
  .command('users')
  .action(() => {
    axios.get(`${apiUrl}/users/`)
    .then((response) => {
      console.log(response.data);
    })
    .catch(() => {
      // console.log(error);
			console.log('An error occurred');
    })
  });

  program
  .command('projects')
  .action((command) => {
		let token = ''
		try {
			const data = fs.readFileSync('/tmp/token.json', 'utf8')
			token = JSON.parse(data).token
		} catch (err) {
				return console.log('Reading token failed:', err);
		}
    axios.get(`${apiUrl}/projects/`, { headers: { "Authorization": token } })
		.then((response) => {
			console.log(response.data);

			let data = fs.readFileSync('/tmp/user.json', 'utf8')
			data = JSON.parse(data)
			data.projects = response.data
			fs.writeFile('/tmp/user.json', JSON.stringify(data), function(err) {
				if(err) return console.log('Writing data failed:', err);
			});
		})
		.catch((err) => {
			if (err.code === 'ECONNREFUSED') {
				console.log('Unable to connect to server.')
			} else if (err.response && err.response.status === 500){
				console.log('Login required!')
			} else {
				console.log('Internal Error')
			}
		})
  });

	program
  .command('create-project')
  .requiredOption('-p, --project <value>', 'Project\'s name')
  .option('-d, --description <value>', 'Project\'s description')
  .option('--plan <value>', 'Project\'s plan')
  .action((command) => {
		let data
		let token = ''
		try {
			data = JSON.parse(fs.readFileSync('/tmp/token.json', 'utf8'))
			token = data.token
		} catch (err) {
				return console.log('Reading token failed:', err);
		}
    axios.post(`${apiUrl}/projects/`, {
			name: command.project,
			description: command.description,
			plan_in_use: command.plan
		}, { headers: { "Authorization": token } })
		.then((response) => {
			console.log(response.data);

			data = JSON.parse(fs.readFileSync('/tmp/user.json', 'utf8'))
			data.projects.push(response.data)
			fs.writeFile('/tmp/user.json', JSON.stringify(data), function(err) {
				if(err) return console.log('Writing data failed:', err);
			});
		})
		.catch((err) => {
			if (err.code === 'ECONNREFUSED') {
				console.log('Unable to connect to server.')
			} else if (err.response && err.response.status === 500){
				console.log('Login required!')
			} else {
				console.log('Internal Error')
			}
		})
  });

	// program
  // .command('choose-project')
  // .requiredOption('-p, --project <value>', 'User\'s project name')
  // .requiredOption('--token <value>', 'User\'s authentication token (without the \'Bearer\' prefix)')
  // .action((command) => {
	// 	let token = ''
	// 	try {
	// 		const data = JSON.parse(fs.readFileSync('/tmp/token.json', 'utf8'))
	// 		token = data.token
	// 	} catch (err) {
	// 			return console.log('Reading token failed:', err);
	// 	}
  //   axios.get(`${apiUrl}/projects/`, {
	// 		project: command.project
	// 	}, { headers: { "Authorization": token } })
	// 	.then((response) => {
	// 		console.log(response.data);
	// 	})
	// 	.catch((err) => {
	// 		if (err.code === 'ECONNREFUSED') {
	// 			console.log('Unable to connect to server.')
	// 		} else if (err.response && err.response.status === 500){
	// 			console.log('Login required!')
	// 		} else {
	// 			console.log('Internal Error')
	// 		}
	// 	})
  // });

	program
  .command('delete-project')
  .requiredOption('-p, --project <value>', 'User\'s project name')
  .action((command) => {
		let data
		let token = ''
		let project = {}
		try {
			data = JSON.parse(fs.readFileSync('/tmp/token.json', 'utf8'))
			token = data.token
		} catch (err) {
				return console.log('Reading token failed:', err);
		}
		try {
			data = JSON.parse(fs.readFileSync('/tmp/user.json', 'utf8'))
			let projects = data.projects.filter(p => p.name == command.project)
			if (projects.length == 0) return console.log('There is no project with the specific name \''+command.project+'\'')
			project = projects[0]
		} catch (err) {
				return console.log('Reading projects failed:', err);
		}
    axios.delete(`${apiUrl}/projects/${project._id}`, { headers: { "Authorization": token } })
		.then((response) => {
			console.log(response);

			data.projects = data.projects.filter(p => p.name != command.project)
			fs.writeFile('/tmp/user.json', JSON.stringify(data), function(err) {
				if(err) return console.log('Writing data failed:', err);
			});
		})
		.catch((err) => {
			if (err.code === 'ECONNREFUSED') {
				console.log('Unable to connect to server.')
			} else if (err.response && err.response.status === 500){
				console.log('Login required!')
			} else {
				console.log('Internal Error')
			}
		})
  });

	program
  .command('finish-project')
  .requiredOption('-p, --project <value>', 'User\'s project name')
  .action((command) => {
    let data
		let token = ''
		let project = {}
		try {
			data = JSON.parse(fs.readFileSync('/tmp/token.json', 'utf8'))
			token = data.token
		} catch (err) {
				return console.log('Reading token failed:', err);
		}
		try {
			data = JSON.parse(fs.readFileSync('/tmp/user.json', 'utf8'))
			let projects = data.projects.filter(p => p.name == command.project)
			if (projects.length == 0) return console.log('There is no project with the specific name \''+command.project+'\'')
			project = projects[0]
		} catch (err) {
				return console.log('Reading projects failed:', err);
		}
    axios.patch(`${apiUrl}/projects/${project._id}`, {status: 'done'}, { headers: { "Authorization": token } })
		.then((response) => {
			console.log(response);

			let project = data.projects.filter(p => p.name == command.project)[0]
			project.status = 'done'
			fs.writeFile('/tmp/user.json', JSON.stringify(data), function(err) {
				if(err) return console.log('Writing data failed:', err);
			});
		})
		.catch((err) => {
			if (err.code === 'ECONNREFUSED') {
				console.log('Unable to connect to server.')
			} else if (err.response && err.response.status === 500){
				console.log('Login required!')
			} else {
				console.log('Internal Error')
			}
		})
  });

	program
  .command('edit-project')
  .requiredOption('-p, --project <value>', 'Project\'s name')
  .option('-n, --name <value>', 'Project\'s name')
  .option('-d, --description <value>', 'Project\'s description')
  .option('-po, --productOwner <value>', 'Project\'s productOwner')
  .option('-sm, --scrumMaster <value>', 'Project\'s scrumMaster')
  .option('--plan <value>', 'Project\'s business plan')
  .action((command) => {
    let data
		let token = ''
		let project = {}
		try {
			data = JSON.parse(fs.readFileSync('/tmp/token.json', 'utf8'))
			token = data.token
		} catch (err) {
				return console.log('Reading token failed:', err);
		}
		try {
			data = JSON.parse(fs.readFileSync('/tmp/user.json', 'utf8'))
			let projects = data.projects.filter(p => p.name == command.project)
			if (projects.length == 0) return console.log('There is no project with the specific name \''+command.project+'\'')
			project = projects[0]
		} catch (err) {
				return console.log('Reading projects failed:', err);
		}
    axios.patch(`${apiUrl}/projects/${project._id}`, {
			name: command.name ? command.name : project.name,
			description: command.description ? command.description : project.description,
			productOwner: command.productOwner ? command.productOwner : project.productOwner,
			scrumMaster: command.scrumMaster ? command.scrumMaster : project.scrumMaster,
			plan_in_use: command.plan ? command.plan : project.plan,
		}, { headers: { "Authorization": token } })
		.then((response) => {
			console.log(response);

			project.name = command.name
			project.description = command.description
			project.productOwner = command.productOwner
			project.scrumMaster = command.scrumMaster
			fs.writeFile('/tmp/user.json', JSON.stringify(data), function(err) {
				if(err) return console.log('Writing data failed:', err);
			});
		})
		.catch((err) => {
			if (err.code === 'ECONNREFUSED') {
				console.log('Unable to connect to server.')
			} else if (err.response && err.response.status === 500){
				console.log('Login required!')
			} else if (err.response && err.response.message) {
				console.log(err.response.message)
			}
		})
  });

program
  .command('invite-user')
  .requiredOption('-p, --project <value>', 'Project name')
  .requiredOption('-u, --username <value...>', 'Username')
  .action((command) => {
	// Get user's token to pass authentication
	const token = utils.getToken('/tmp/token.json');
	// If an error occured
	if(token instanceof Error) {
	  const error = token;
	  if(error.code === 'ENOENT')
	    return console.log('Ο ελεγχος ταυτότητας απέτυχε: Παρακαλούμε να έχεις συνδεθεί πρώτα.');
	  else
	    return console.log('Ο ελεγχος ταυτότητας απέτυχε: ',error.message);
	}

	// Get current user and the requested project
    let user = JSON.parse(fs.readFileSync('/tmp/user.json', 'utf8'));
	let projects = user.projects.filter(p => p.name == command.project);

	// If no such project was found
	if (projects.length == 0)
	  return console.log('Δεν βρέθηκε κάποιο project με το όνομα \''+command.project+'\'');

	let project = projects[0];

	// Invite the requested user(s)
	axios.post(`${apiUrl}/secure-routes/project-invite/${project._id}`, {
	  users: [command.username].concat(command.args),
	  project: command.project
	}, { headers: { "Authorization": `Bearer ${token}` }
	}, { httpsAgent: agent })
	.then((response) => {
	  console.log(response.data.message);
	})
	.catch((err) => {
	  if (err.response && err.response.data.message)
	    console.log('Η πρόσκληση μελών απέτυχε: ', err.response.data.message);
	  else
		console.log('Η πρόσκληση μελών απέτυχε: ', err.message);
	});
  });

program
  .command('answer-invitation')
  .requiredOption('-p, --project <value>', 'Project name')
  .requiredOption('-a, --answer <value>', 'Answer to invitation (accept | reject)')
  .action((command) => {
	if(command.answer !== 'accept' && command.answer !== 'reject') {
		return console.log('Λανθασμένη απάντηση σε πρόσκληση. Επίλεξε είτε \'accept\' για αποδοχή είτε \'reject\' για απόρριψη.');
	}

	// Get user's token to pass authentication
	const token = utils.getToken('/tmp/token.json');
	// If an error occured
	if(token instanceof Error) {
	  const error = token;
	  if(error.code === 'ENOENT')
	    return console.log('Ο ελεγχος ταυτότητας απέτυχε: Παρακαλούμε να έχεις συνδεθεί πρώτα.');
	  else
	    return console.log('Ο ελεγχος ταυτότητας απέτυχε: ',error.message);
	}

    // Get current user
    let user = JSON.parse(fs.readFileSync('/tmp/user.json', 'utf8'));
	// Get user's invitations to the requested project
	let invitations = user.invitations.filter(invitation => invitation.project == command.project);

	// If no such invitation was found
	if (invitations.length == 0)
	  return console.log('Δεν βρέθηκε κάποια πρόσκληση στο project με το όνομα \''+command.project+'\'');

	let invitation = invitations[0];

	// Answer to the invitation
	axios.get(`${apiUrl}/users/answer-invitation/${invitation.invitationCode}?answer=${command.answer}`, {},
	  { headers: { "Authorization": `Bearer ${token}` }
	}, { httpsAgent: agent })
	.then((response) => {
	  // Update user's info
	  fs.writeFile('/tmp/user.json', JSON.stringify(response.data.user), function(err) {
		if(err) return console.log('Writing user failed:', err);
	  });

	  console.log(response.data.message);
	})
	.catch((error) => {
	  if (error.response && error.response.data.message)
		console.log('Η απάντηση της πρόσκλησης σε project απέτυχε: ', error.response.data.message);
	  else
		console.log('Η απάντηση της πρόσκλησης σε project απέτυχε: ', error.message);
	});
  });

	program
  .command('leave-project')
  .requiredOption('-p, --project <value>', 'Project name')
  .action((command) => {
    let data
		let token = ''
		let project = {}
		try {
			data = JSON.parse(fs.readFileSync('/tmp/token.json', 'utf8'))
			token = data.token
		} catch (err) {
				return console.log('Reading token failed:', err);
		}
		try {
			data = JSON.parse(fs.readFileSync('/tmp/user.json', 'utf8'))
			let projects = data.projects.filter(p => p.name == command.project)
			if (projects.length == 0) return console.log('There is no project with the specific name \''+command.project+'\'')
			project = projects[0]
		} catch (err) {
				return console.log('Reading projects failed:', err);
		}
    axios.PATCH(`${apiUrl}/projects/${project._id}`, {
			name: command.name ? command.name : project.name,
			description: command.description ? command.description : project.description,
			productOwner: command.productOwner ? command.productOwner : project.productOwner,
			scrumMaster: command.scrumMaster ? command.scrumMaster : project.scrumMaster,
		}, { headers: { "Authorization": token } })
		.then((response) => {
			console.log(response);

			project.name = command.name
			project.description = command.description
			project.productOwner = command.productOwner
			project.scrumMaster = command.scrumMaster
			fs.writeFile('/tmp/user.json', JSON.stringify(data), function(err) {
				if(err) return console.log('Writing data failed:', err);
			});
		})
		.catch((err) => {
			if (err.code === 'ECONNREFUSED') {
				console.log('Unable to connect to server.')
			} else if (err.response && err.response.status === 500){
				console.log('Login required!')
			} else {
				console.log('Internal Error')
			}
		})
  });

	program
  .command('sprints')
  .requiredOption('-p, --project <value>', 'Project name')
  .action((command) => {
		let token = ''
		try {
			const data = fs.readFileSync('/tmp/token.json', 'utf8')
			token = JSON.parse(data).token
		} catch (err) {
				return console.log('Reading token failed:', err);
		}
		try {
			data = JSON.parse(fs.readFileSync('/tmp/user.json', 'utf8'))
			let projects = data.projects.filter(p => p.name == command.project)
			if (projects.length == 0) return console.log('There is no project with the specific name \''+command.project+'\'')
			project = projects[0]
		} catch (err) {
				return console.log('Reading projects failed:', err);
		}
    axios.post(`${apiUrl}/project-sprints/`, {
			project: command.project
		},
		{ headers: { "Authorization": token } })
		.then((response) => {
			console.log(response.data);

			project.sprints = response.data
			fs.writeFile('/tmp/user.json', JSON.stringify(data), function(err) {
				if(err) return console.log('Writing data failed:', err);
			});
		})
		.catch((err) => {
			if (err.code === 'ECONNREFUSED') {
				console.log('Unable to connect to server.')
			} else if (err.response && err.response.status === 500){
				console.log('Login required!')
			} else {
				console.log('Internal Error')
			}
		})
  });

  program
  .command('tasks')
  .requiredOption('--token <value>', 'User\'s authentication token (without the \'Bearer\' prefix)')
  .action((command) => {
		axios.get(`${apiUrl}/tasks/`, {
			headers: { "Authorization": `Bearer ${command.token}` }
		})
		.then(function(response) {
			console.log(response.data);
		})
		.catch(() => {
			if (err.code === 'ECONNREFUSED') {
				console.log('Unable to connect to server.')
			} else if (err.response && err.response.status === 500){
				console.log('Login required!')
			}
		})
  });

  program
	.command('user-stories')
  .requiredOption('--token <value>', 'User\'s authentication token (without the \'Bearer\' prefix)')
	.action((command) => {
		axios.get(`${apiUrl}/user_stories/`, {
			headers: { "Authorization": `Bearer ${command.token}` }
		})
		.then(function(response) {
			console.log(response.data);
		})
		.catch(() => {
			if (err.code === 'ECONNREFUSED') {
				console.log('Unable to connect to server.')
			} else if (err.response && err.response.status === 500){
				console.log('Login required!')
			}
		})
  });

  program
  .command('health-check')
  .option('--format <value>', 'Give format', 'json')
  .action(function (command) {
	axios.get(`${apiUrl}/health-check?format=${command.format}`, { httpsAgent: agent })
	.then(function (response) {
	  // handle success
	  console.log(response.data);
	})
	.catch(function (error) {
	  // handle error
	  console.log('{ status: \'error\' }');
	})
  });

  program
  .command('login')
  .option('--format <value>', 'Give format', 'json')
  .requiredOption('-u, --username <value>', 'User\'s username')
  .requiredOption('-p, --password <value>', 'User\'s password')
  .action(async function (command) {
	// Check if the user can log in
	const check = utils.checkLogInfo(command.username, '/tmp/user.json', '/tmp/token.json');
	if(check.result === false){
	  return console.log(check.message);
	}

	try {
	  const client = restAPI.client;
	  let message = await restAPI.actions.login(command.username, command.password);
 
	  fs.writeFile('/tmp/user.json', JSON.stringify(client.user), function(err) {
		if(err) return console.log('Writing user failed:', err);
	  });
	  fs.writeFile('/tmp/token.json', JSON.stringify(client.tokenObject), function(err) {
		if(err) return console.log('Writing token failed:', err);
	  });

	  console.log(message);
	} catch(error) {
	  if (error.response && error.response.data.message) {
		console.log('Η σύνδεση απέτυχε: ', error.response.data.message);
	  } else {
		console.log('Η σύνδεση απέτυχε: ', error.message);
	  }
	}
  });

  program
  .command('signup')
  .option('--format <value>', 'Give format', 'json')
  .requiredOption('-u, --username <value>', 'User\'s username')
  .requiredOption('-p, --password <value>', 'User\'s password')
  .requiredOption('-fn, --firstName <value>', 'User\'s first name')
  .requiredOption('-ln, --lastName <value>', 'User\'s last name')
  .requiredOption('-e, --email <value>', 'User\'s email')
  .option('--plan <value>', 'User\'s plan (standard | premium-monthly | premium-year)')
  .action(function(command) {
	try {
	  let data = {
		username: command.username,
		password: command.password,
		firstName: command.firstName,
		lastName: command.lastName,
		email: command.email,
		plan_in_use: command.plan
	  };

	  const client = restAPI.client;
	  let message = await restAPI.actions.signup(data);

	  fs.writeFile('/tmp/user.json', JSON.stringify(client.user), function(err) {
	    if(err) return console.log('Writing user failed:', err);
	  });

	  console.log(message);
	  console.log('Αφού επιβεβαιώσεις το email σου, συνδέσου για να συνεχίσεις στην εφαρμογή.')
	} catch(error) {
	  if (error.response && error.response.data.message)
		console.log('Η εγγραφή απέτυχε: ', error.response.data.message);
	  else
		console.log('Η εγγραφή απέτυχε: ', error.message);
	}
	// axios.post(`${apiUrl}/users/signup?format=${command.format}/`, {
	//   username: command.username,
	//   password: command.password,
	//   firstName: command.firstName,
	//   lastName: command.lastName,
	//   email: command.email,
	//   plan_in_use: command.plan
	// }, { httpsAgent: agent })
	// .then(function (response) {
	//   fs.writeFile('/tmp/user.json', JSON.stringify(response.data.user), function(err) {
	//     if(err) return console.log('Writing user failed:', err);
	//   });
	//   console.log(response.data.message);
	//   console.log('Αφού επιβεβαιώσεις το email σου, συνδέσου για να συνεχίσεις στην εφαρμογή.')
	// })
	// .catch(function (error) {
	//   if (error.response && error.response.data.message)
	// 	console.log('Η εγγραφή απέτυχε: ', error.response.data.message);
	//   else
	// 	console.log('Η εγγραφή απέτυχε: ', error.message);
	// });
  });

  program
  .command('logout')
  .action(async function() {
	try {
	  // Get client data
	  const clientData = utils.fileToClient('/tmp/user.json', '/tmp/token.json');
	  // Set client
	  restAPI.actions.setClient(clientData);

	  // Log out client
	  let message = await restAPI.actions.logout();

	  fs.unlink('/tmp/user.json', function(err) {
	    if(err) return console.log('Removing user failed:', err);
	  });
	  fs.unlink('/tmp/token.json', function(err) {
	    if(err) return console.log('Removing token failed:', err);
	  });

	  console.log(message);
	} catch (error) {
	  if(error.response && error.response.data.message)
		console.log('Η αποσύνδεση απέτυχε.',error.response.data.message);
	  else if(error.code === 'ENOENT')
		console.log('Ο ελεγχος ταυτότητας απέτυχε: Παρακαλούμε να έχεις συνδεθεί πρώτα.');
	  else
		console.log('Η αποσύνδεση απέτυχε.',error.message);
	}
  })

program
  .command('get-user')
  .option('--format <value>', 'Give format', 'json')
  .action(function(command) {
	// Get user's token to pass authentication
	const token = utils.getToken('/tmp/token.json');
	// If an error occured
	if(token instanceof Error) {
	  const error = token;
	  if(error.code === 'ENOENT')
	    return console.log('Ο ελεγχος ταυτότητας απέτυχε: Παρακαλούμε να έχεις συνδεθεί πρώτα.');
	  else
	    return console.log('Ο ελεγχος ταυτότητας απέτυχε: ',error.message);
	}

	axios.get(`${apiUrl}/secure-routes/user?format=${command.format}/`, {
	  headers: { "Authorization": `Bearer ${token}` }
	}, { httpsAgent: agent })
	.then(function(response){
	  fs.writeFile('/tmp/user.json', JSON.stringify(response.data), function(err) {
		if(err) return console.log('Writing user failed:', err);
	  });
	  console.log(util.inspect(response.data, { depth: null, colors: true }));
	})
	.catch(function(error) {
	  if(error.response && error.response.data.message)
	    console.log(`Η ανάκτηση των δεδομένων του χρήστη απέτυχε: ${error.response.data.message}`);
	  else
	    console.log(`Η ανάκτηση των δεδομένων του χρήστη απέτυχε: ${error.message}`);
	});
  })

program
  .command('update-user')
  .option('--format <value>', 'Give format', 'json')
  .option('-u, --username <value>', 'User\'s username')
  .option('-fn, --firstName <value>', 'User\'s firstName')
  .option('-ln, --lastName <value>', 'User\'s lastName')
  .option('-e, --email <value>', 'User\'s email')
  .action(function(command) {
	// Get user's token to pass authentication
	const token = utils.getToken('/tmp/token.json');
	// If an error occured
	if(token instanceof Error) {
	  const error = token;
	  if(error.code === 'ENOENT')
	    return console.log('Ο ελεγχος ταυτότητας απέτυχε: Παρακαλούμε να έχεις συνδεθεί πρώτα.');
	  else
	    return console.log('Ο ελεγχος ταυτότητας απέτυχε: ',error.message);
	}

	axios.patch(`${apiUrl}/secure-routes/edit-user?format=${command.format}/`, {
	  username: command.username,
	  firstName: command.firstName,
	  lastName: command.lastName,
	  email: command.email,
	  plan_in_use: command.plan
	}, { headers: { "Authorization": `Bearer ${token}` }
	}, { httpsAgent: agent })
	.then(function (response) {
	  // Update user's info
	  fs.writeFile('/tmp/user.json', JSON.stringify(response.data.user), function(err) {
		if(err) return console.log('Writing user failed:', err);
	  });

	  console.log(response.data.message);

      // If a new email was given by the user
	  if(response.data.email){
		// Log out the user until the new email is verified
		fs.unlink('/tmp/token.json', function(err) {
		  if(err) return console.log('Removing token failed:', err);
		});
		console.log('Αφού επιβεβαιώσεις το email σου, συνδέσου για να συνεχίσεις στην εφαρμογή.')
	  }
	})
	.catch(function (error) {
	  console.log(error);
	  if(error.response && error.response.data.message)
		console.log(`Η ενημέρωση του λογαριασμού απέτυχε: ${error.response.data.message}`);
	  else
		console.log(`Η ενημέρωση του λογαριασμού απέτυχε: ${error.message}`);
	});
  })

program
  .command('reset-password')
  .option('--format <value>', 'Give format', 'json')
  .requiredOption('-op, --oldPassword <value>','User\'s old password')
  .requiredOption('-np, --newPassword <value>','User\'s new password')
  .requiredOption('-cp, --confirmPassword <value>','User\'s password confrimation')
  .action(function(command) {
	// Get user's token to pass authentication
	const token = utils.getToken('/tmp/token.json');
	// If an error occured
	if(token instanceof Error) {
	  const error = token;
	  if(error.code === 'ENOENT')
	    return console.log('Ο ελεγχος ταυτότητας απέτυχε: Παρακαλούμε να έχεις συνδεθεί πρώτα.');
	  else
	    return console.log('Ο ελεγχος ταυτότητας απέτυχε: ',error.message);
	}

	axios.patch(`${apiUrl}/secure-routes/reset-password?format=${command.format}/`, {
	  old: command.oldPassword,
	  new: command.newPassword,
	  confirm: command.confirmPassword
	}, { headers: { "Authorization": `Bearer ${token}` }
	}, { httpsAgent: agent })
	.then(function (response) {
	  console.log(response.data.message);
	})
	.catch(function (error) {
	  if(error.response && error.response.data.message)
		console.log(`Η ενημέρωση του κωδικού πρόσβασης απέτυχε: ${error.response.data.message}`);
	  else
		console.log(`Η ενημέρωση του κωδικού πρόσβασης απέτυχε: ${error.message}`);
	});
  })

// NOT GOOD WITH CLI-APP
// An email will be sent so the user can set a new password & be logged in again
program
  .command('forgot-password')
  .option('--format <value>', 'Give format', 'json')
  .requiredOption('-e, --email <value>','User\'s email')
  .action(function(command) {
	if(fs.existsSync('/tmp/user.json') && fs.existsSync('/tmp/token.json')) {
		return console.log('Είσαι ήδη συνδεδεμένος/-η.\nΑν ξέχασες τον κωδικό σου και θες να ορίσεις καινούριο, παρακαλούμε να έχεις αποσυνδεθεί πρώτα.');
	}

	axios.patch(`${apiUrl}/users/forgot-password?format=${command.format}/`,{
	  email: command.email
	}, { httpsAgent: agent })
	.then(function (response) {
	  console.log(response.data.message);
	})
	.catch(function (error) {
	  if(error.response && error.response.data.message)
		console.log(`Η αποστολή email για την ανανέωση του κωδικού πρόσβασης απέτυχε: ${error.response.data.message}`);
	  else
		console.log(`Η αποστολή email για την ανανέωση του κωδικού πρόσβασης απέτυχε: ${error.message}`);
	});
  })

program
  .command('get-premium')
  .option('--format <value>', 'Give format', 'json')
  .requiredOption('-t, --type <value>', 'Premium plan type (month or year)')
  .action(function(command) {
	// Get user's token to pass authentication
	const token = utils.getToken('/tmp/token.json');
	// If an error occured
	if(token instanceof Error) {
	  const error = token;
	  if(error.code === 'ENOENT')
	    return console.log('Ο ελεγχος ταυτότητας απέτυχε: Παρακαλούμε να έχεις συνδεθεί πρώτα.');
	  else
	    return console.log('Ο ελεγχος ταυτότητας απέτυχε: ',error.message);
	}

    axios.patch(`${apiUrl}/secure-routes/upgrade-plan?format=${command.format}/`, {
	  plan_in_use: command.type
	}, { headers: { "Authorization": `Bearer ${token}` }
	}, { httpsAgent: agent })
	.then(function (response) {
	  // Update user's info
	  fs.writeFile('/tmp/user.json', JSON.stringify(response.data.user), function(err) {
		if(err) return console.log('Writing user failed:', err);
	  });

	  console.log(response.data.message);
	})
	.catch(function (error) {
	  if(error.response && error.response.data.message)
		console.log(`Η αναβάθμιση του λογαριασμού σου σε προνομιούχο απέτυχε: ${error.response.data.message}`);
	  else
		console.log(`Η αναβάθμιση του λογαριασμού σου σε προνομιούχο απέτυχε: ${error.message}`);
	});
  })

program
  .command('delete-user')
  .option('--format <value>', 'Give format', 'json')
  .action(function(command) {
	// Get user's token to pass authentication
	const token = utils.getToken('/tmp/token.json');
	// If an error occured
	if(token instanceof Error) {
	  const error = token;
	  if(error.code === 'ENOENT')
	    return console.log('Ο ελεγχος ταυτότητας απέτυχε: Παρακαλούμε να έχεις συνδεθεί πρώτα.');
	  else
	    return console.log('Ο ελεγχος ταυτότητας απέτυχε: ',error.message);
	}

	axios.delete(`${apiUrl}/secure-routes/delete-user?format=${command.format}/`, {
	  headers: { "Authorization": `Bearer ${token}` }
	}, { httpsAgent: agent })
	.then(function(response) {
	  fs.unlink('/tmp/user.json', function(err) {
		if(err) return console.log('Removing user failed:', err);
	  });
	  fs.unlink('/tmp/token.json', function(err) {
		if(err) return console.log('Removing token failed:', err);
	  });

	  console.log(response.data.message);
	})
	.catch(function (error) {
	  if(error.response && error.response.data.message)
		console.log(`Η διαγραφή του λογαριασμού απέτυχε: ${error.response.data.message}`);
	  else
		console.log(`Η διαγραφή του λογαριασμού απέτυχε: ${error.message}`);
	});
  })

// NOT GOOD WITH CLI-APP
program
  .command('signup-google')
  .option('--format <value>', 'Give format', 'json')
  .action(function(command) {
	axios.get(`${apiUrl}/users/signup-google?format=${command.format}/`, {}, { httpsAgent: agent })
	.then(function(response){
	  console.log(response.data.url);
	})
	.catch(function(error){
	  console.log(error);
	});
  })

// NOT GOOD WITH CLI-APP
program
  .command('login-google')
  .option('--format <value>', 'Give format', 'json')
  .action(function(command) {
	axios.get(`${apiUrl}/users/login-google?format=${command.format}/`, {}, { httpsAgent: agent })
	.then(function(response){
	  console.log(response.data.url);
	})
	.catch(function(error){
	  console.log(error);
	});
  })

// program
//   .command('tokens')
//   .action(function (command) {
// 	// Get user's token to pass authentication
// 	const token = utils.getToken('/tmp/token.json');
// 	if(token instanceof Error) {
// 	  const error = token;
// 	  if(error.code === 'ENOENT')
// 	    console.log('Getting user\'s token failed: Please log in first.');
// 	  else
// 	    console.log('Getting user\'s token failed: ',error.message);
// 	} else {
// 	  axios.get(`${apiUrl}/secure-routes/tokens`, {
// 		headers: { "Authorization": `Bearer ${token}` }
// 	  }, { httpsAgent: agent })
// 	  .then(function(response) {
// 		console.log(response.data);
// 	  })
// 	  .catch(function(error) {
// 		console.log(error);
// 	  })
// 	}
//   });

// program
//   .command('delete-user')
//   .option('--format <value>', 'Give format', 'json')
//   .requiredOption('--id <value>', 'User\'s authentication token (without the \'Bearer\' prefix)')
//   .action(function(command) {
// 	axios.delete(`${apiUrl}/users/delete-user/${command.id}?format=${command.format}/`, {},
// 	{ httpsAgent: agent })
//     .then(function(response) {
// 	//   fs.unlink('/tmp/user.json', function(err) {
// 	//     if(err) {
// 	// 	  return console.log('Removing user failed:', err);
// 	//     }
// 	  console.log(response.data);
// 	//   });
//     })
//     .catch(function (error) {
// 	  console.log('Deleting user failed: ', error.response.data.message);
//     });
//   })

// program
//   .command('delete-pr')
//   .option('--format <value>', 'Give format', 'json')
//   .requiredOption('--id <value>', 'User\'s authentication token (without the \'Bearer\' prefix)')
//   .action(function(command) {
// 	axios.delete(`${apiUrl}/users/delete-project/${command.id}?format=${command.format}/`, {},
// 	{ httpsAgent: agent })
//     .then(function(response) {
// 	  console.log(response.data);
//     })
//     .catch(function (error) {
// 	  console.log('Deleting project failed: ', error.response.data.message);
//     });
//   })

// program
//   .command('inv')
//   .option('--format <value>', 'Give format', 'json')
//   .action(function(command) {
// 	axios.get(`${apiUrl}/users/inv?format=${command.format}/`, {}, { httpsAgent: agent })
// 	.then(function(response) {
// 	  console.log(response.data);
// 	})
// 	.catch(function (error) {
// 	  console.log('Deleting user failed: ', error.response);
// 	});
//   })

// program
//   .command('rm-inv')
//   .option('--format <value>', 'Give format', 'json')
//   .requiredOption('--id <value>', 'User\'s authentication token (without the \'Bearer\' prefix)')
//   .action(function(command) {
// 	axios.post(`${apiUrl}/users/rm-inv?format=${command.format}/`, {
// 		id: command.id
// 	}, { httpsAgent: agent })
// 	.then(function(response) {
// 	  console.log(response.data);
// 	})
// 	.catch(function (error) {
// 	  console.log(error);
// 	  console.log('Deleting inv failed');
// 	});
//   })


/*--------------------------------------------------------------------------------------------------*/

//   program
//   .command('list-users')
//   .option('--format <value>', 'Give format', 'json')
//   .option('--start <value>')
//   .option('--count <value>')
//   .action(function (command) {
// 	fs.readFile('/tmp/user.json', function(err, data) {
// 	  if (err) {
// 		return console.log('Token not found. Login first', err);
// 	  }
// 	  const token = JSON.parse(data).token;
// 	  axios.get(`${apiUrl}/admin/users?format=${command.format}&start=${command.start}&count=${command.count}`, { httpsAgent: agent, headers: { 'Authorization': `Bearer ${token}` } })
// 	  .then(function (response) {
// 		// handle success
// 		console.log(response.data);
// 	  })
// 	  .catch(function (error) {
// 		// handle error
// 		console.log('{ status: \'error\' }');
// 	  })
// 	})
//   });

//   program
//   .command('add-user')
//   .option('--format <value>', 'Give format', 'json')
//   .requiredOption('--username <value>', 'User\'s username')
//   .requiredOption('--password <value>', 'User\'s password')
//   .requiredOption('--firstName <value>', 'User\'s first name')
//   .requiredOption('--lastName <value>', 'User\'s last name')
//   .requiredOption('--email <value>', 'User\'s email')
//   .option('--plan <value>', 'User\'s plan (standard or premium)')
//   .action(function (command) {
// 	fs.readFile('/tmp/user.json', function(err, data) {
// 	  if (err) {
// 		return console.log('Token not found. Login first', err);
// 	  }
// 	  const token = JSON.parse(data).token;
// 	  axios.post(`${apiUrl}/admin/users?format=${command.format}`, {
// 		username: command.username,
// 		password: command.password,
// 		firstName: command.firstName,
// 		lastName: command.lastName,
// 		role: command.role,
// 	    agency: command.agency
// 	  }, { httpsAgent: agent, headers: { 'Authorization': `Bearer ${token}` } })
// 	  .then(function (response) {
// 		// handle success
// 		console.log(response.data);
// 	  })
// 	  .catch(function (error) {
// 		// handle error
// 		console.log('{ status: \'error\' }');
// 	  })
// 	})
//   });

//   program
//   .command('get-user')
//   .option('--format <value>', 'Give format', 'json')
//   .requiredOption('--id <value>', 'User\'s id')
//   .action(function (command) {
// 	fs.readFile('/tmp/user.json', function(err, data) {
// 	  if (err) {
// 		return console.log('Token not found. Login first', err);
// 	  }
// 	  const token = JSON.parse(data).token;
// 	  axios.get(`${apiUrl}/admin/users/${command.id}?format=${command.format}`, { httpsAgent: agent, headers: { 'Authorization': `Bearer ${token}` } })
// 	  .then(function (response) {
// 		// handle success
// 		console.log(response.data);
// 	  })
// 	  .catch(function (error) {
// 		// handle error
// 		console.log('{ status: \'error\' }');
// 	  })
// 	})
//   });

//   program
//   .command('update-user')
//   .option('--format <value>', 'Give format', 'json')
//   .requiredOption('--id <value>', 'User\'s id')
//   .option('--username <value>', 'User\'s username', null)
//   .option('--password <value>', 'User\'s password', null)
//   .option('--firstName <value>', 'User\'s firstname', null)
//   .option('--lastName <value>', 'User\'s lastname', null)
//   .option('--role <value>', 'User\'s role, type:\n0 for Κέντρο Ελέγχου\n1 for Υπάλληλος Τμήματος\n2 for Προσωπικό Τμήματος\n3 for Γενική Διοίκηση\n4 for Admin\n5 for Διοίκηση Φορέα\n')
//   .option('--agency <value>', 'User\'s agency, type:\n0 for ΕΚΑΒ\n1 for Αστυνομία\n2 for Πυροσβεστική\n3 for Λιμενικό\n')
//   .action(function (command) {
// 	fs.readFile('/tmp/user.json', function(err, data) {
// 	  if (err) {
// 		return console.log('Token not found. Login first', err);
// 	  }
// 	  const token = JSON.parse(data).token;
// 	  axios.put(`${apiUrl}/admin/users/${command.id}?format=${command.format}`, {
// 		username: command.username,
// 		password: command.password,
// 		firstName: command.firstName,
// 		lastName: command.lastName,
// 		role: command.role,
// 		agency: command.agency
// 	  }, { httpsAgent: agent, headers: { 'Authorization': `Bearer ${token}` } })
// 	  .then(function (response) {
// 		// handle success
// 		console.log(response.data);
// 	  })
// 	  .catch(function (error) {
// 		// handle error
// 		console.log('{ status: \'error\' }', error);
// 	  })
// 	})
//   });

//   program
//   .command('delete-user')
//   .option('--format <value>', 'Give format', 'json')
//   .requiredOption('--id <value>', 'User\'s id')
//   .action(function (command) {
//     fs.readFile('/tmp/user.json', function(err, data) {
// 	  if (err) {
// 		return console.log('Token not found. Login first', err);
// 	  }
// 	  const token = JSON.parse(data).token;
// 	  axios.delete(`${apiUrl}/admin/users/${command.id}?format=${command.format}`, { httpsAgent: agent, headers: { 'Authorization': `Bearer ${token}` } })
// 	  .then(function (response) {
// 		// handle success
// 		console.log(response.data);
// 	  })
// 	  .catch(function (error) {
// 		// handle error
// 		console.log('{ status: \'error\' }');
// 	  })
// 	})
//   });

  program.parse(process.argv);
}