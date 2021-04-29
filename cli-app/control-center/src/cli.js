import { sign } from 'crypto';

const program = require('commander');
const axios = require('axios');
const https = require('https');
const fs = require('fs');

const apiUrl = 'http://127.0.0.1:3000/api-control';
const agent = new https.Agent({
  rejectUnauthorized: false,
});

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
			description: command.description
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
    axios.PATCH(`${apiUrl}/projects/${project._id}`, {status: 'done'}, { headers: { "Authorization": token } })
		.then((response) => {
			console.log(response);

			let project = data.projects.filter(p => p.name != command.project)[0]
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
  .requiredOption('-p, --project <value>', 'User\'s project name')
  .option('-n, --name <value>', 'User\'s new project name')
  .option('-d, --description <value>', 'User\'s new project description')
  .option('-po, --productOwner <value>', 'User\'s new project productOwner')
  .option('-sm, --scrumMaster <value>', 'User\'s new project scrumMaster')
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
  .requiredOption('--token <value>', 'User\'s authentication token (without the \'Bearer\' prefix)')
  .action((command) => {
    axios.get(`${apiUrl}/sprints/`, {
			headers: { "Authorization": `Bearer ${command.token}` }
		})
		.then((response) => {
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
  .action(function (command) {
		axios.post(`${apiUrl}/users/login?format=${command.format}`, {
			username: command.username,
			password: command.password
		}, { httpsAgent: agent })
		.then(function (response) {
			console.log(response.data);
			fs.writeFile('/tmp/user.json', JSON.stringify(response.data.user), function(err) {
				if(err) return console.log('Writing user failed:', err);
			});
			fs.writeFile('/tmp/token.json', JSON.stringify(response.data.token), function(err) {
				if(err) return console.log('Writing token failed:', err);
			});
			console.log(response.data.message);
		})
		.catch(function (error) {
			if (error.response.data.message)
				console.log('Login failed: ', error.response.data.message);
			else
				console.log('Login failed: ', error.message);
		});
  });

  program
  .command('logout')
  .option('--format <value>', 'Give format', 'json')
  .requiredOption('--token <value>', 'User\'s authentication token (without the \'Bearer\' prefix)')
  .action(function(command) {
	axios.get(`${apiUrl}/secure-routes/logout`, {
		headers: { "Authorization": `Bearer ${command.token}` }
	}, { httpsAgent: agent })
	.then(function(response){
	  fs.unlink('/tmp/user.json', function(err) {
			if(err) return console.log('Removing user failed:', err);
	  });
		fs.unlink('/tmp/token.json', function(err) {
			if(err) return console.log('Removing token failed:', err);
	  });
		console.log(response.message);
	})
	.catch(function(error) {
	  console.log('Couldn\'t log out',error.message);
	});
  })

  program
  .command('deleteuser')
  .requiredOption('-u, --user <value>', 'User\'s id')
  .action(function(command) {
	axios.delete(`${apiUrl}/users/${command.user}`, {
		headers: { "Authorization": `Bearer ${command.token}` }
	}, { httpsAgent: agent })
	.then(function(response){
	  console.log(response)
	})
	.catch(function(error) {
	  console.log('Couldn\'t log out',error.message);
	});
  })

  program
  .command('tokens')
  .requiredOption('--token <value>', 'User\'s authentication token (without the \'Bearer\' prefix)')
  .action(function (command) {
    axios.get(`${apiUrl}/secure-routes/tokens`, {
			headers: { "Authorization": `Bearer ${command.token}` }
		}, { httpsAgent: agent })
    .then(function(response) {
      console.log(response.data);
    })
    .catch(function(error) {
      console.log(error);
    })
  });

  program
  .command('signup')
  .option('--format <value>', 'Give format', 'json')
  .requiredOption('-u, --username <value>', 'User\'s username')
  .requiredOption('-p, --password <value>', 'User\'s password')
  .requiredOption('-fn, --firstName <value>', 'User\'s first name')
  .requiredOption('-ln, --lastName <value>', 'User\'s last name')
  .requiredOption('-e, --email <value>', 'User\'s email')
  .option('--plan <value>', 'User\'s plan (standard or premium)')
//  .option('--picture <value>', 'User\'s profile picture (url)')
  .action(function(command) {
		axios.post(`${apiUrl}/users/signup?format=${command.format}/`, {
			username: command.username,
			password: command.password,
			firstName: command.firstName,
			lastName: command.lastName,
			email: command.email,
			plan_in_use: command.plan
		}, { httpsAgent: agent })
		.then(function (response) {
			console.log(response.data);
			fs.writeFile('/tmp/user.json', JSON.stringify(response.data), function(err) {
				if (err) {
					return console.log('Writing token failed:', err);
				}
				console.log(response.data.message);
				// console.log('Sign up successful.');
			});
		})
		.catch(function (error) {
			console.log(error)
			console.log('Sign up failed');
		});
  });

  program
  .command('update-user')
  .option('--format <value>', 'Give format', 'json')
  .requiredOption('--token <value>', 'User\'s authentication token (without the \'Bearer\' prefix)')
  .option('--username <value>', 'User\'s username')
  .option('--password <value>', 'User\'s password')
  .option('--firstName <value>', 'User\'s firstName')
  .option('--lastName <value>', 'User\'s lastName')
  .option('--email <value>', 'User\'s email')
  .option('--plan <value>', 'User\'s plan (standard or premium)')
  .action(function(command) {
	axios.patch(`${apiUrl}/secure-routes/edit-user?format=${command.format}/`, {
	  username: command.username,
	  password: command.password,
	  firstName: command.firstName,
	  lastName: command.lastName,
	  email: command.email,
	  plan_in_use: command.plan,
	}, { headers: { "Authorization": `Bearer ${command.token}` }
	}, { httpsAgent: agent })
	.then(function (response) {
	  console.log(response.data);
	  console.log('User\'s update successful.');
	})
	.catch(function (error) {
	  console.log('User\'s update failed', error.response.data.message);
	});
})

// program
// .command('delete-user')
// .option('--format <value>', 'Give format', 'json')
// .requiredOption('--id <value>', 'User\'s authentication token (without the \'Bearer\' prefix)')
// .action(function(command) {
//   axios.delete(`${apiUrl}/users/delete-user?format=${command.format}/`, {
// 	  id: command.id
//   }, { httpsAgent: agent })
//   .then(function(response) {
// 	fs.unlink('/tmp/user.json', function(err) {
// 	  if(err) {
// 		return console.log('Removing user failed:', err);
// 	  }
// 	  console.log(response.data);
// 	});
//   })
//   .catch(function (error) {
// 	console.log('Deleting user failed: ', error.response.data.message);
//   });
// })

  program
  .command('delete-user')
  .option('--format <value>', 'Give format', 'json')
  .requiredOption('--token <value>', 'User\'s authentication token (without the \'Bearer\' prefix)')
  .action(function(command) {
	axios.delete(`${apiUrl}/secure-routes/delete-user?format=${command.format}/`, {
	  headers: { "Authorization": `Bearer ${command.token}` }
	}, { httpsAgent: agent })
	.then(function(response) {
	  fs.unlink('/tmp/user.json', function(err) {
	    if(err) {
		  return console.log('Removing user failed:', err);
		}
		console.log(response.data);
	  });
	})
	.catch(function (error) {
	  console.log('Deleting user failed: ', error.response.data.message);
	});
  })

  program
  .command('get-user')
  .requiredOption('--token <value>', 'User\'s authentication token (without the \'Bearer\' prefix)')
  .action(function(command) {
	  axios.get(`${apiUrl}/secure-routes/user`, {
	    headers: { "Authorization": `Bearer ${command.token}` }
	  }, { httpsAgent: agent })
	  .then(function(response){
		  console.log(response.data);
	  })
	  .catch(function(error) {
		console.log('Could not reach user\'s info\n', error.message);
	  });
  })


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
