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
// const restAPI = require('@the-ver-best-scrum-team/rest-api-client/restAPI');

export function cli(args) {

  program
  .command('projects')
  .action(async () => {
	try {
	  // Get client object
	  const client = restAPI.client;
	  // Get client data
	  const clientData = utils.fileToClient('/tmp/user.json', '/tmp/token.json');
	  // Set client
	  restAPI.actions.setClient(clientData);

	  // Get user's projects
	  const message = await restAPI.actions.getProjects();

	  // Print projects
	  console.log(util.inspect(client.user.projects, { depth: null, colors: true }));

	  fs.writeFile('/tmp/user.json', JSON.stringify(client.user), function(err) {
		if(err) return console.log('Writing data failed:', err);
	  });
	} catch(error) {
	  if (error.response && error.response.data.message)
		console.log(`Η ανάκτηση των projects σου απέτυχε: ${error.response.data.message}`);
	  else if(error.code === 'ENOENT')
		console.log('Ο ελεγχος ταυτότητας απέτυχε: Παρακαλούμε να έχεις συνδεθεί πρώτα.');
	  else
		console.log(`Η ανάκτηση των projects σου απέτυχε: ${error.message}`);
	}
  });

  program
  .command('create-project')
  .requiredOption('-p, --project <value>', 'Project\'s name')
  .option('-d, --descr <value>', 'Project\'s description')
  .option('--plan <value>', 'Project\'s plan')
  .option('--status <value>', 'Project\'s status (inProgress | done)')
  .action(async (command) => {
	try {
	  // Get client object
	  const client = restAPI.client;
	  // Get client data
	  const clientData = utils.fileToClient('/tmp/user.json', '/tmp/token.json');
	  // Set client
	  restAPI.actions.setClient(clientData);

	  const project = {
			name: command.project,
			description: command.descr,
			plan: command.plan,
			status: command.status
 	  }

	  const message = await restAPI.actions.addProject(project);

	  fs.writeFile('/tmp/user.json', JSON.stringify(client.user), function(err) {
			if(err) return console.log('Writing data failed:', err);
	  });

	  console.log(message);
	} catch (error) {
	  if(error.response && error.response.data.message)
		console.log('Η δημιουργία νέου project απέτυχε: ', error.response.data.message);
	  else if(error.code === 'ENOENT')
		console.log('Ο ελεγχος ταυτότητας απέτυχε: Παρακαλούμε να έχεις συνδεθεί πρώτα.');
	  else
		console.log('Η δημιουργία νέου project απέτυχε: ', error.message);
	}
  });

	program
  .command('choose-project')
  .requiredOption('-p, --project <value>', 'User\'s project name')
  .action(async (command) => {
		try {
			// Get client object
			const client = restAPI.client;
			// Get client data
			const clientData = utils.fileToClient('/tmp/user.json', '/tmp/token.json');
			// Set client
			restAPI.actions.setClient(clientData);
	
			let project = {
				name: command.project,
				description: command.descr,
				plan: command.plan,
				status: command.status
			}
			// Get specified project & set client.project
			await restAPI.actions.getProject(command.project);

			let message = await restAPI.actions.editProject(project);
	
			fs.writeFile('/tmp/user.json', JSON.stringify(client.user), function(err) {
			if(err) return console.log('Writing data failed:', err);
			});
	
			console.log(message);
		} catch(err) {
			if (err.code === 'ECONNREFUSED') {
				console.log('Unable to connect to server.')
			} else if (err.response && err.response.status === 500){
				console.log('Login required!')
			} else {
				console.log('Internal Error')
			}
		}
  });

	program
  .command('delete-project')
  .requiredOption('-p, --project <value>', 'User\'s project name')
  .action(async (command) => {
		try {
			// Get client object
			const client = restAPI.client;
			// Get client data
			const clientData = utils.fileToClient('/tmp/user.json', '/tmp/token.json');
			// Set client
			restAPI.actions.setClient(clientData);
			// Get specified project & set client.project
			await restAPI.actions.getProject(command.project);
	
			let message = await restAPI.actions.deleteProject();
	
			fs.writeFile('/tmp/user.json', JSON.stringify(client.user), function(err) {
			if(err) return console.log('Writing data failed:', err);
			});
	
			console.log(message);
		} catch (error) {
			if(error.response && error.response.data.message)
			console.log(`Η διαγραφή project ${command.project} απέτυχε: ${error.response.data.message}`);
			else if(error.code === 'ENOENT')
			console.log('Ο ελεγχος ταυτότητας απέτυχε: Παρακαλούμε να έχεις συνδεθεί πρώτα.');
			else
			console.log(`Η διαγραφή project ${command.project} απέτυχε: ${error.message}`);
		}
  });

	program
  .command('finish-project')
  .requiredOption('-p, --project <value>', 'User\'s project name')
  .action(async (command) => {
    try {
			// Get client object
			const client = restAPI.client;
			// Get client data
			const clientData = utils.fileToClient('/tmp/user.json', '/tmp/token.json');
			// Set client
			restAPI.actions.setClient(clientData);
	
			let project = {
				status: 'done'
			}
			// Get specified project & set client.project
			await restAPI.actions.getProject(command.project);

			let message = await restAPI.actions.editProject(project);
	
			fs.writeFile('/tmp/user.json', JSON.stringify(client.user), function(err) {
			if(err) return console.log('Writing data failed:', err);
			});
	
			console.log(message);
		} catch(err) {
			if (err.code === 'ECONNREFUSED') {
				console.log('Unable to connect to server.')
			} else if (err.response && err.response.status === 500){
				console.log('Login required!')
			} else {
				console.log('Internal Error')
			}
		}
  });

	program
  .command('edit-project')
  .requiredOption('-p, --project <value>', 'Project\'s name')
  .option('-n, --new_name <value>', 'Project\'s name')
  .option('-d, --descr <value>', 'Project\'s description')
  .option('-po, --productOwner <value>', 'Project\'s productOwner')
  .option('-sm, --scrumMaster <value>', 'Project\'s scrumMaster')
  .option('--status <value>', 'Project\'s status (inProgress | done)')
  .option('--plan <value>', 'Project\'s business plan (standard | premium)')
  .action(async (command) => {
    try {
			// Get client object
			const client = restAPI.client;
			// Get client data
			const clientData = utils.fileToClient('/tmp/user.json', '/tmp/token.json');
			// Set client
			restAPI.actions.setClient(clientData);
	
			let project = {
				name: command.new_name,
				description: command.descr,
				plan: command.plan,
				productOwner: command.productOwner,
				scrumMaster: command.scrumMaster,
				status: command.status
			}
			// Get specified project & set client.project
			await restAPI.actions.getProject(command.project);

			let message = await restAPI.actions.editProject(project);
	
			fs.writeFile('/tmp/user.json', JSON.stringify(client.user), function(err) {
			if(err) return console.log('Writing data failed:', err);
			});
	
			console.log(message);
		} catch(error) {
		  if(error.response && error.response.data.message)
			console.log(`Η επεξεργασία του project ${command.project} απέτυχε: ', ${error.response.data.message}`);
		  else if(error.code === 'ENOENT')
			console.log('Ο ελεγχος ταυτότητας απέτυχε: Παρακαλούμε να έχεις συνδεθεί πρώτα.');
		  else
			console.log(`Η επεξεργασία του project ${command.project} απέτυχε: ', ${error.message}`);
		}
  });

  program
  .command('invite-user')
  .requiredOption('-p, --project <value>', 'Project name')
  .requiredOption('-u, --username <value...>', 'Username')
  .action(async (command) => {
	try {
	  // Get client object
	  const client = restAPI.client;
	  // Get client data
	  const clientData = utils.fileToClient('/tmp/user.json', '/tmp/token.json');
	  // Set client
	  restAPI.actions.setClient(clientData);

	  // Get specified project & set client.project
	  await restAPI.actions.getProject(command.project);

	  // Invite the requested user(s)
	  let data = {
		users: [command.username].concat(command.args),
		project: client.project.name
	  };
	  let message = await restAPI.actions.inviteUser(client.project._id, data);

	  console.log(message);
	} catch (error) {
	  if(error.response && error.response.data.message)
		console.log('Η πρόσκληση μελών απέτυχε: ', error.response.data.message);
	  else if(error.code === 'ENOENT')
		console.log('Ο ελεγχος ταυτότητας απέτυχε: Παρακαλούμε να έχεις συνδεθεί πρώτα.');
	  else
		console.log('Η πρόσκληση μελών απέτυχε: ', error.message);
	}
  });

  program
  .command('answer-invitation')
  .requiredOption('-p, --project <value>', 'Project name')
  .requiredOption('-a, --answer <value>', 'Answer to invitation (accept | reject)')
  .action(async (command) => {
	try {
	  if(command.answer !== 'accept' && command.answer !== 'reject') {
		return console.log('Λανθασμένη απάντηση σε πρόσκληση. Επίλεξε είτε \'accept\' για αποδοχή είτε \'reject\' για απόρριψη.');
	  }

	  // Get client object
	  const client = restAPI.client;
	  // Get client data
	  const clientData = utils.fileToClient('/tmp/user.json', '/tmp/token.json');
	  // Set client
	  restAPI.actions.setClient(clientData);

	  // Get user's invitations
	  let invitations = await restAPI.actions.getInvitations();
	  // Get user's invitation to the requested project
	  let invitation = invitations.filter(inv => inv.project == command.project)[0];

	  if (!invitation)
	    return console.log('Δεν βρέθηκε κάποια πρόσκληση στο project με το όνομα \''+command.project+'\'');
  
	  // Answer to the invitation
	  let message = await restAPI.actions.answerInvitation(command.answer, invitation.invitationCode);

	  // Update user's info
	  fs.writeFile('/tmp/user.json', JSON.stringify(client.user), function(err) {
		if(err) return console.log('Writing user failed:', err);
	  });

	  console.log(message);
	} catch (error) {
	  if(error.response && error.response.data.message)
		console.log('Η απάντηση της πρόσκλησης σε project απέτυχε: ', error.response.data.message);
	  else if(error.code === 'ENOENT')
		console.log('Ο ελεγχος ταυτότητας απέτυχε: Παρακαλούμε να έχεις συνδεθεί πρώτα.');
	  else
		console.log('Η απάντηση της πρόσκλησης σε project απέτυχε: ', error.message);
	}
  });

	program
  .command('sprints')
  .requiredOption('-p, --project <value>', 'Project name')
  .action(async (command) => {
		try {
			// Get client object
			const client = restAPI.client;
			// Get client data
			const clientData = utils.fileToClient('/tmp/user.json', '/tmp/token.json');
			// Set client
			restAPI.actions.setClient(clientData);
	
			// Get specified project & set client.project
			await restAPI.actions.getProject(command.project);
	
			// Print projects
			console.log(util.inspect(client.project.sprints, { depth: null, colors: true }));
	
			fs.writeFile('/tmp/user.json', JSON.stringify(client.user), function(err) {
				if(err) return console.log('Writing data failed:', err);
			});
		} catch(error) {
			if (error.response && error.response.data.message)
			console.log(`Η ανάκτηση των user stories του project ${command.project} απέτυχε: ${error.response.data.message}`);
			else if(error.code === 'ENOENT')
			console.log('Ο ελεγχος ταυτότητας απέτυχε: Παρακαλούμε να έχεις συνδεθεί πρώτα.');
			else
			console.log(`Η ανάκτηση των user stories του project ${command.project} απέτυχε: ${error.message}`);
		}
  });
	
  program
	.command('userStories')
  .requiredOption('-p, --project <value>', 'Project name')
	.action(async (command) => {
		try {
			// Get client object
			const client = restAPI.client;
			// Get client data
			const clientData = utils.fileToClient('/tmp/user.json', '/tmp/token.json');
			// Set client
			restAPI.actions.setClient(clientData);
	
			// Get specified project & set client.project
			await restAPI.actions.getProject(command.project);

			// Print projects
			console.log(util.inspect(client.project.userStories, { depth: null, colors: true }));
	
			fs.writeFile('/tmp/user.json', JSON.stringify(client.user), function(err) {
				if(err) return console.log('Writing data failed:', err);
			});
		} catch(error) {
			if (error.response && error.response.data.message)
			console.log(`Η ανάκτηση των user stories του project ${command.project} απέτυχε: ${error.response.data.message}`);
			else if(error.code === 'ENOENT')
			console.log('Ο ελεγχος ταυτότητας απέτυχε: Παρακαλούμε να έχεις συνδεθεί πρώτα.');
			else
			console.log(`Η ανάκτηση των user stories του project ${command.project} απέτυχε: ${error.message}`);
		}
  });

  program
  .command('get-project')
  .requiredOption('-p, --project <value>', 'Project\'s name')
  .action(async (command) => {
	try {
	  // Get client object
	  const client = restAPI.client;
	  // Get client data
	  const clientData = utils.fileToClient('/tmp/user.json', '/tmp/token.json');
	  // Set client
	  restAPI.actions.setClient(clientData);
  
	  // Get specified project & set client.project
	  await restAPI.actions.getProject(command.project);

	  // Print project
	  console.log(util.inspect(client.project, { depth: null, colors: true }));
	} catch (error) {
	  if(error.response && error.response.data.message)
		console.log(`Η ανάκτηση του project ${command.project} απέτυχε: ${error.response.data.message}`);
	  else if(error.code === 'ENOENT')
		console.log('Ο ελεγχος ταυτότητας απέτυχε: Παρακαλούμε να έχεις συνδεθεί πρώτα.');
	  else
		console.log(`Η ανάκτηση του project ${command.project} απέτυχε: {error.message}`);
	}
  });
	
  program
  .command('my-tasks')
  .requiredOption('-p, --project <value>', 'Project name')
  .action(async (command) => {
	try {
	  // Get client object
	  const client = restAPI.client;
	  // Get client data
	  const clientData = utils.fileToClient('/tmp/user.json', '/tmp/token.json');
	  // Set client
  	  restAPI.actions.setClient(clientData);

	  // Get specified project & set client.project
	  await restAPI.actions.getProject(command.project);

	  // Get my tasks
	  const tasks = restAPI.actions.getMyTasks();

	  console.log(util.inspect(tasks, { depth: null, colors: true }));
	} catch (error) {
	  if(error.response && error.response.data.message)
		console.log('Η ανάκτηση δεδομένων απέτυχε.',error.response.data.message);
	  else if(error.code === 'ENOENT')
		console.log('Ο ελεγχος ταυτότητας απέτυχε: Παρακαλούμε να έχεις συνδεθεί πρώτα.');
	  else
		console.log('Η ανάκτηση δεδομένων απέτυχε.',error.message);
	}
  });

  program
  .command('add-sprint')
  .requiredOption('-p, --project <value>', 'Project\'s name')
  .requiredOption('-n, --sprintName <value>', 'Sprint\'s name')
  .option('-d, --descr <value>', 'Sprint\'s description')
  .option('--status <value>', 'Sprint\'s status (toDo | inProgress | done)')
  .option('--duration <value>', 'Sprint\'s estimated duration')
  .action(async (command) => {
	try {
	  // Get client object
	  const client = restAPI.client;
	  // Get client data
	  const clientData = utils.fileToClient('/tmp/user.json', '/tmp/token.json');
	  // Set client
	  restAPI.actions.setClient(clientData);
  
	  let sprint = {
		name: command.sprintName,
		description: command.descr,
		status: command.status,
		estimated_duration: command.duration
	  }

	  // Get specified project & set client.project
	  await restAPI.actions.getProject(command.project);

	  // Create sprint
	  let message = await restAPI.actions.addSprint(sprint);
  
	  console.log(message);
	} catch (error) {
	  if(error.response && error.response.data.message)
		console.log(`Η δημιουργία νέου sprint απέτυχε: ${error.response.data.message}`);
	  else if(error.code === 'ENOENT')
		console.log('Ο ελεγχος ταυτότητας απέτυχε: Παρακαλούμε να έχεις συνδεθεί πρώτα.');
	  else
		console.log(`Η δημιουργία νέου sprint απέτυχε: ${error.message}`);
	}
  });

  program
  .command('add-userStory')
  .requiredOption('-p, --project <value>', 'Project\'s name')
  .requiredOption('-n, --userstoryName <value>', 'UserStory\'s name')
  .option('-d, --descr <value>', 'UserStory\'s description')
  .option('-l, --label <value>', 'UserStory\'s label(issue | epic)')
  .option('--status <value>', 'UserStory\'s status (toDo | inProgress | done)')
  .option('--duration <value>', 'UserStory\'s estimated duration')
  .action(async (command) => {
	try {
	  // Get client object
	  const client = restAPI.client;
	  // Get client data
	  const clientData = utils.fileToClient('/tmp/user.json', '/tmp/token.json');
	  // Set client
	  restAPI.actions.setClient(clientData);
	
	  let userStory = {
		name: command.userstoryName,
		description: command.descr,
		label: command.label,
		status: command.status,
		estimated_duration: command.duration
	  }
  
	  // Get specified project & set client.project
	  await restAPI.actions.getProject(command.project);
  
	  // Create User Story
	  let message = await restAPI.actions.addUserStory(userStory);
	
	  console.log(message);
	} catch (error) {
	  if(error.response && error.response.data.message)
		console.log(`Η δημιουργία νέου user story απέτυχε: ${error.response.data.message}`);
	  else if(error.code === 'ENOENT')
		console.log('Ο ελεγχος ταυτότητας απέτυχε: Παρακαλούμε να έχεις συνδεθεί πρώτα.');
	  else
		console.log(`Η δημιουργία νέου user story απέτυχε: ${error.message}`);
	}
  });

  program
  .command('add-task')
  .requiredOption('-p, --project <value>', 'Project\'s name')
  .requiredOption('-u, --userStoryName <value>', 'UserStory\'s name')
  .requiredOption('-t, --taskName <value>', 'Task\'s name')
  .option('-d, --descr <value>', 'Task\'s description')
  .option('--status <value>', 'Task\'s status (toDo | inProgress | done)')
  .option('--duration <value>', 'Task\'s estimated duration')
  .action(async (command) => {
	try {
	  // Get client object
	  const client = restAPI.client;
	  // Get client data
	  const clientData = utils.fileToClient('/tmp/user.json', '/tmp/token.json');

	  // Set client
	  restAPI.actions.setClient(clientData);

	  // Get specified project & set client.project
	  await restAPI.actions.getProject(command.project);

	  // Get specified user story
	  const userStoryID = restAPI.actions.getUserStoryObj(command.userStoryName)._id;
	
	  let task = {
		name: command.taskName,
		description: command.descr,
		status: command.status,
		estimated_duration: command.duration,
		userStory: userStoryID
	  }
  
	  // Create Task
	  let message = await restAPI.actions.addTask(task);
	
	  console.log(message);
	} catch (error) {
	  if(error.response && error.response.data.message)
		console.log(`Η δημιουργία νέου task απέτυχε: ${error.response.data.message}`);
	  else if(error.code === 'ENOENT')
		console.log('Ο ελεγχος ταυτότητας απέτυχε: Παρακαλούμε να έχεις συνδεθεί πρώτα.');
	  else
		console.log(`Η δημιουργία νέου task απέτυχε: ${error.message}`);
	}
  });

	program
	.command('edit-sprint')
	.requiredOption('-p, --project <value>', 'Project\'s name')
  .requiredOption('-s, --sprint <value>', 'Sprint\'s name')
  .option('-n, --new_name <value>', 'Sprint\'s name')
  .option('-d, --descr <value>', 'Sprint\'s description')
  .option('--status <value>', 'Sprint\'s status (toDo | inProgress | done)')
  .option('--duration <value>', 'Sprint\'s estimated duration')
	.action(async (command) => {
		try {
			// Get client object
			const client = restAPI.client;
			// Get client data
			const clientData = utils.fileToClient('/tmp/user.json', '/tmp/token.json');
			// Set client
			restAPI.actions.setClient(clientData);
	
			// Get specified project & set client.project
			await restAPI.actions.getProject(command.project);

			const sprint = restAPI.actions.getSprintObj(command.sprint);
			sprint.name = command.new_name;
			sprint.description = command.descr;
			sprint.duration = command.duration;
			sprint.status = command.status;

			const message = await restAPI.actions.editSprint(sprint);
	
			fs.writeFile('/tmp/user.json', JSON.stringify(client.user), function(err) {
			if(err) return console.log('Writing data failed:', err);
			});
	
			console.log(message);
		} catch(error) {
			if(error.response && error.response.data.message)
				console.log(`Η επεξεργασία του sprint ${command.sprint} απέτυχε: ${error.response.data.message}`);
		  	else if(error.code === 'ENOENT')
				console.log('Ο ελεγχος ταυτότητας απέτυχε: Παρακαλούμε να έχεις συνδεθεί πρώτα.');
			  else
				console.log(`Η επεξεργασία του sprint ${command.sprint} απέτυχε: ${error.message}`);
		}
	});

	program
	.command('edit-userStory')
	.requiredOption('-p, --project <value>', 'Project\'s name')
  .requiredOption('-u, --userStory <value>', 'UserStory\'s name')
  .option('-n, --new_name <value>', 'UserStory\'s name')
  .option('-d, --descr <value>', 'UserStory\'s description')
  .option('--status <value>', 'UserStory\'s status (toDo | inProgress | done)')
  .option('--duration <value>', 'UserStory\'s estimated duration')
	.action(async (command) => {
		try {
			// Get client object
			const client = restAPI.client;
			// Get client data
			const clientData = utils.fileToClient('/tmp/user.json', '/tmp/token.json');
			// Set client
			restAPI.actions.setClient(clientData);
	
			// Get specified project & set client.project
			await restAPI.actions.getProject(command.project);

			const userStory = restAPI.actions.getUserStoryObj(command.userStory);
			userStory.name = command.new_name;
			userStory.description = command.descr;
			userStory.duration = command.duration;
			userStory.status = command.status;

			const message = await restAPI.actions.editUserStory(userStory);
	
			fs.writeFile('/tmp/user.json', JSON.stringify(client.user), function(err) {
			if(err) return console.log('Writing data failed:', err);
			});
	
			console.log(message);
		} catch(error) {
			if(error.response && error.response.data.message)
				console.log(`Η επεξεργασία του user story ${command.userStory} απέτυχε: ${error.response.data.message}`);
			  else if(error.code === 'ENOENT')
				console.log('Ο ελεγχος ταυτότητας απέτυχε: Παρακαλούμε να έχεις συνδεθεί πρώτα.');
		  	else
				console.log(`Η επεξεργασία του user story ${command.userStory} απέτυχε: ${error.message}`);
		}
	});

	program
	.command('edit-task')
	.requiredOption('-p, --project <value>', 'Project\'s name')
  .requiredOption('-u, --userStory <value>', 'UserStory\'s name')
  .requiredOption('-t, --task <value>', 'Task\'s name')
  .option('-n, --new_name <value>', 'Task\'s new name')
  .option('-d, --descr <value>', 'Task\'s description')
  .option('--status <value>', 'Task\'s status (toDo | inProgress | done)')
  .option('--duration <value>', 'Task\'s estimated duration')
	.action(async (command) => {
		try {
			// Get client object
			const client = restAPI.client;
			// Get client data
			const clientData = utils.fileToClient('/tmp/user.json', '/tmp/token.json');
			// Set client
			restAPI.actions.setClient(clientData);

			// Get specified project & set client.project
			await restAPI.actions.getProject(command.project);

			const task = restAPI.actions.getTaskObj(command.userStory, command.task);
			task.name = command.new_name;
			task.description = command.descr;
			task.duration = command.duration;
			task.status = command.status;

			const message = await restAPI.actions.editTask(task);
	
			fs.writeFile('/tmp/user.json', JSON.stringify(client.user), function(err) {
			if(err) return console.log('Writing data failed:', err);
			});
	
			console.log(message);
		} catch(error) {
			if(error.response && error.response.data.message)
				console.log(`Η επεξεργασία του task ${command.task} απέτυχε: ${error.response.data.message}`);
		  	else if(error.code === 'ENOENT')
				console.log('Ο ελεγχος ταυτότητας απέτυχε: Παρακαλούμε να έχεις συνδεθεί πρώτα.');
			  else
				console.log(`Η επεξεργασία του task ${command.task} απέτυχε: ${error.message}`);
		}
	});

	program
	.command('delete-sprint')
	.requiredOption('-p, --project <value>', 'Project\'s name')
  .requiredOption('-s, --sprint <value>', 'Sprint\'s name')
	.action(async (command) => {
		try {
			// Get client object
			const client = restAPI.client;
			// Get client data
			const clientData = utils.fileToClient('/tmp/user.json', '/tmp/token.json');
			// Set client
			restAPI.actions.setClient(clientData);

			// Get specified project & set client.project
			await restAPI.actions.getProject(command.project);
			const sprint = restAPI.actions.getSprintObj(command.sprint);

			const message = await restAPI.actions.deleteSprint(sprint);
	
			fs.writeFile('/tmp/user.json', JSON.stringify(client.user), function(err) {
			if(err) return console.log('Writing data failed:', err);
			});
	
			console.log(message);
		} catch(error) {
			if(error.response && error.response.data.message)
				console.log(`Η διαγραφή του sprint ${command.sprint} απέτυχε: ${error.response.data.message}`);
			else if(error.code === 'ENOENT')
				console.log('Ο ελεγχος ταυτότητας απέτυχε: Παρακαλούμε να έχεις συνδεθεί πρώτα.');
			else
				console.log(`Η διαγραφή του sprint ${command.sprint} απέτυχε: ${error.message}`);
		}
	});

	program
	.command('delete-userStory')
	.requiredOption('-p, --project <value>', 'Project\'s name')
  .requiredOption('-u, --userStory <value>', 'UserStory\'s name')
	.action(async (command) => {
		try {
			// Get client object
			const client = restAPI.client;
			// Get client data
			const clientData = utils.fileToClient('/tmp/user.json', '/tmp/token.json');
			// Set client
			restAPI.actions.setClient(clientData);

			// Get specified project & set client.project
			await restAPI.actions.getProject(command.project);
			const userStory = restAPI.actions.getUserStoryObj(command.userStory);

			const message = await restAPI.actions.deleteUserStory(userStory);
	
			fs.writeFile('/tmp/user.json', JSON.stringify(client.user), function(err) {
			if(err) return console.log('Writing data failed:', err);
			});
	
			console.log(message);
		} catch(error) {
			if(error.response && error.response.data.message)
				console.log(`Η διαγραφή του user story ${command.userStory} απέτυχε: ${error.response.data.message}`);
			else if(error.code === 'ENOENT')
				console.log('Ο ελεγχος ταυτότητας απέτυχε: Παρακαλούμε να έχεις συνδεθεί πρώτα.');
			else
				console.log(`Η διαγραφή του user story ${command.userStory} απέτυχε: ${error.message}`);
		}
	});

	program
	.command('delete-task')
	.requiredOption('-p, --project <value>', 'Project\'s name')
  .requiredOption('-u, --userStory <value>', 'UserStory\'s name')
  .requiredOption('-t, --task <value>', 'Task\'s name')
	.action(async (command) => {
		try {
			// Get client object
			const client = restAPI.client;
			// Get client data
			const clientData = utils.fileToClient('/tmp/user.json', '/tmp/token.json');
			// Set client
			restAPI.actions.setClient(clientData);

			// Get specified project & set client.project
			await restAPI.actions.getProject(command.project);
			// Get specified task
			const task = restAPI.actions.getTaskObj(command.userStory, command.task);

			// Delete task
			const message = await restAPI.actions.deleteTask(task);
	
			fs.writeFile('/tmp/user.json', JSON.stringify(client.user), function(err) {
			if(err) return console.log('Writing data failed:', err);
			});
	
			console.log(message);
		} catch(error) {
			if(error.response && error.response.data.message)
				console.log(`Η διαγραφή του task ${command.task} απέτυχε: ${error.response.data.message}`);
			else if(error.code === 'ENOENT')
				console.log('Ο ελεγχος ταυτότητας απέτυχε: Παρακαλούμε να έχεις συνδεθεί πρώτα.');
			else
				console.log(`Η διαγραφή του task ${command.task} απέτυχε: ${error.message}`);
		}
	});

  program
  .command('join-task')
  .requiredOption('-p, --project <value>', 'Project\'s name')
  .requiredOption('-u, --userStory <value>', 'UserStory\'s name')
  .requiredOption('-t, --task <value>', 'Task\'s name')
  .action(async (command) => {
	try {
	  // Get client object
	  const client = restAPI.client;
	  // Get client data
	  const clientData = utils.fileToClient('/tmp/user.json', '/tmp/token.json');
	  // Set client
	  restAPI.actions.setClient(clientData);
  
	  // Get specified project & set client.project
	  await restAPI.actions.getProject(command.project);

	  // Get specified task
	  const task = restAPI.actions.getTaskObj(command.userStory, command.task);

	  // Join task
	  let message = await restAPI.actions.joinTask(task);
	
	  console.log(message);
	} catch (error) {
	  if(error.response && error.response.data.message)
		console.log(`Η προσθήκη σου στα μέλη του task ${command.task} απέτυχε: ${error.response.data.message}`);
	  else if(error.code === 'ENOENT')
		console.log('Ο ελεγχος ταυτότητας απέτυχε: Παρακαλούμε να έχεις συνδεθεί πρώτα.');
	  else
		console.log(`Η προσθήκη σου στα μέλη του task ${command.task} απέτυχε: ${error.message}`);
	}
  });

  program
  .command('leave-task')
  .requiredOption('-p, --project <value>', 'Project\'s name')
  .requiredOption('-u, --userStory <value>', 'UserStory\'s name')
  .requiredOption('-t, --task <value>', 'Task\'s name')
  .action(async (command) => {
	try {
	  // Get client object
	  const client = restAPI.client;
	  // Get client data
	  const clientData = utils.fileToClient('/tmp/user.json', '/tmp/token.json');
	  // Set client
	  restAPI.actions.setClient(clientData);
  
	  // Get specified project & set client.project
	  await restAPI.actions.getProject(command.project);

	  // Get specified task
	  const task = restAPI.actions.getTaskObj(command.userStory, command.task);

	  // Leave task
	  let message = await restAPI.actions.leaveTask(task);
	
	  console.log(message);
	} catch (error) {
	  if(error.response && error.response.data.message)
		console.log(`Η αφαίρεσή σου από τα μέλη του task ${command.task} απέτυχε: ${error.response.data.message}`);
	  else if(error.code === 'ENOENT')
		console.log('Ο ελεγχος ταυτότητας απέτυχε: Παρακαλούμε να έχεις συνδεθεί πρώτα.');
	  else
		console.log(`Η αφαίρεσή σου από τα μέλη του task ${command.task} απέτυχε: ${error.message}`);
	}
  });

	program
	.command('leave-project')
	.requiredOption('-p, --project <value>', 'Project\'s name')
	.action(async (command) => {
		try {
			// Get client object
			const client = restAPI.client;
			// Get client data
			const clientData = utils.fileToClient('/tmp/user.json', '/tmp/token.json');
			// Set client
			restAPI.actions.setClient(clientData);
			// Get specified project & set client.project
			await restAPI.actions.getProject(command.project);
	
			const message = await restAPI.actions.leaveProject();
	
			fs.writeFile('/tmp/user.json', JSON.stringify(client.user), function(err) {
			if(err) return console.log('Writing data failed:', err);
			});
	
			console.log(message);
		} catch (error) {
			if(error.response && error.response.data.message)
			console.log(`Η αποχώρησή σου από το project ${command.project} απέτυχε: ${error.response.data.message}`);
			else if(error.code === 'ENOENT')
			console.log('Ο ελεγχος ταυτότητας απέτυχε: Παρακαλούμε να έχεις συνδεθεί πρώτα.');
			else
			console.log(`Η αποχώρησή σου από το project ${command.project} απέτυχε: ${error.message}`);
		}
	});

  program
  .command('connect-tasks')
  .requiredOption('-p, --project <value>', 'Project\'s name')
  .requiredOption('-t1, --task1 <value>', 'Task\'s 1 name')
  .requiredOption('-u1, --userStory1 <value>', 'UserStory\'s 1 name')
  .requiredOption('-t2, --task2 <value>', 'Task\'s 2 name')
  .requiredOption('-u2, --userStory2 <value>', 'UserStory\'s 2 name')
  .requiredOption('-c, --connection <value>', 'Tasks\' connection (before | after)')
  .action(async (command) => {
	try {
	  // Get client object
	  const client = restAPI.client;
	  // Get client data
	  const clientData = utils.fileToClient('/tmp/user.json', '/tmp/token.json');
	  // Set client
	  restAPI.actions.setClient(clientData);
  
	  // Get specified project & set client.project
	  await restAPI.actions.getProject(command.project);

	  // Get task 1
	  const task1 = restAPI.actions.getTaskObj(command.userStory1, command.task1);
	  // Get task 2
	  const task2 = restAPI.actions.getTaskObj(command.userStory2, command.task2);

	  // Connect tasks
	  let message = await restAPI.actions.connectTasks(task1, task2, command.connection);
	
	  console.log(message);
	} catch (error) {
	  if(error.response && error.response.data.message)
		console.log(`Η σύνδεση των tasks απέτυχε: ${error.response.data.message}`);
	  else if(error.code === 'ENOENT')
		console.log('Ο ελεγχος ταυτότητας απέτυχε: Παρακαλούμε να έχεις συνδεθεί πρώτα.');
	  else
		console.log(`Η σύνδεση των tasks απέτυχε: ${error.message}`);
	}
  });

  program
  .command('assign-sprint')
  .requiredOption('-p, --project <value>', 'Project\'s name')
  .requiredOption('-u, --userStory <value>', 'UserStory\'s name (of the Task)')
  .requiredOption('-t, --task <value>', 'Task\'s name')
  .requiredOption('-s, --sprint <value>', 'Sprint\'s name')
  .action(async (command) => {
	try {
	  // Get client object
	  const client = restAPI.client;
	  // Get client data
	  const clientData = utils.fileToClient('/tmp/user.json', '/tmp/token.json');
	  // Set client
	  restAPI.actions.setClient(clientData);
  
	  // Get specified project & set client.project
	  await restAPI.actions.getProject(command.project);

	  // Get specified task
	  const task = restAPI.actions.getTaskObj(command.userStory, command.task);
	  // Get specified sprint
	  const sprint = restAPI.actions.getSprintObj(command.sprint);

	  // Assign task to sprint
	  let message = await restAPI.actions.connectSprint(task, sprint);
	
	  console.log(message);
	} catch (error) {
	  if(error.response && error.response.data.message)
		console.log(`Η ανάθεση του task ${command.task} στο sprint ${command.sprint} απέτυχε: ${error.response.data.message}`);
	  else if(error.code === 'ENOENT')
		console.log('Ο ελεγχος ταυτότητας απέτυχε: Παρακαλούμε να έχεις συνδεθεί πρώτα.');
	  else
		console.log(`Η ανάθεση του task ${command.task} στο sprint ${command.sprint} απέτυχε: ${error.message}`);
	}
  });

  program
  .command('disconnect-tasks')
  .requiredOption('-p, --project <value>', 'Project\'s name')
  .requiredOption('-t1, --task1 <value>', 'Task\'s 1 name')
  .requiredOption('-u1, --userStory1 <value>', 'UserStory\'s 1 name')
  .requiredOption('-t2, --task2 <value>', 'Task\'s 2 name')
  .requiredOption('-u2, --userStory2 <value>', 'UserStory\'s 2 name')
  .requiredOption('-c, --connection <value>', 'Tasks\' connection (before | after)')
  .action(async (command) => {
	try {
	  // Get client object
	  const client = restAPI.client;
	  // Get client data
	  const clientData = utils.fileToClient('/tmp/user.json', '/tmp/token.json');
	  // Set client
	  restAPI.actions.setClient(clientData);
  
	  // Get specified project & set client.project
	  await restAPI.actions.getProject(command.project);

	  // Get task 1
	  const task1 = restAPI.actions.getTaskObj(command.userStory1, command.task1);
	  // Get task 2
	  const task2 = restAPI.actions.getTaskObj(command.userStory2, command.task2);

	  // Disconnect tasks
	  let message = await restAPI.actions.disconnectTasks(task1, task2, command.connection);
	
	  console.log(message);
	} catch (error) {
	  if(error.response && error.response.data.message)
		console.log(`Η αποσύνδεση των tasks απέτυχε: ${error.response.data.message}`);
	  else if(error.code === 'ENOENT')
		console.log('Ο ελεγχος ταυτότητας απέτυχε: Παρακαλούμε να έχεις συνδεθεί πρώτα.');
	  else
		console.log(`Η αποσύνδεση των tasks απέτυχε: ${error.message}`);
	}
  });

  program
  .command('unassign-sprint')
  .requiredOption('-p, --project <value>', 'Project\'s name')
  .requiredOption('-u, --userStory <value>', 'UserStory\'s name (of the Task)')
  .requiredOption('-t, --task <value>', 'Task\'s name')
  .action(async (command) => {
	try {
	  // Get client object
	  const client = restAPI.client;
	  // Get client data
	  const clientData = utils.fileToClient('/tmp/user.json', '/tmp/token.json');
	  // Set client
	  restAPI.actions.setClient(clientData);
  
	  // Get specified project & set client.project
	  await restAPI.actions.getProject(command.project);

	  // Get specified task
	  const task = restAPI.actions.getTaskObj(command.userStory, command.task);

	  // Unassign task from sprint
	  let message = await restAPI.actions.disconnectSprint(task);
	
	  console.log(message);
	} catch (error) {
	  if(error.response && error.response.data.message)
		console.log(`Η αποδέσμευση του task ${command.task} από το sprint του απέτυχε: ${error.response.data.message}`);
	  else if(error.code === 'ENOENT')
		console.log('Ο ελεγχος ταυτότητας απέτυχε: Παρακαλούμε να έχεις συνδεθεί πρώτα.');
	  else
		console.log(`Η αποδέσμευση του task ${command.task} από το sprint του απέτυχε: ${error.message}`);
	}
  });


	// !AUTH COMMANDS
	
  program
  .command('health-check')
  .action(function (command) {
		axios.get(`${apiUrl}/db/health-check`, { httpsAgent: agent })
		.then(function (response) {
			console.log(response.body);
		})
	.catch(function (error) {
	  console.log('{ status: \'error\' }');
	})
  });

	program
  .command('health-check')
  .action(function (command) {
		axios.get(`${apiUrl}/db/reset`, { httpsAgent: agent })
		.then(function (response) {
			console.log(response.body);
		})
	.catch(function (error) {
	  console.log('{ status: \'error\' }');
	})
  });

  program
  .command('login')
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
  .requiredOption('-u, --username <value>', 'User\'s username')
  .requiredOption('-p, --password <value>', 'User\'s password')
  .requiredOption('-fn, --firstName <value>', 'User\'s first name')
  .requiredOption('-ln, --lastName <value>', 'User\'s last name')
  .requiredOption('-e, --email <value>', 'User\'s email')
  .option('--plan <value>', 'User\'s plan (standard | premium-month | premium-year)')
  .action(async function(command) {
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

	  // Log out user
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
  .action(async function() {
	try {
	  // Get client object
	  const client = restAPI.client;
	  // Get client data
	  const clientData = utils.fileToClient('/tmp/user.json', '/tmp/token.json');
	  // Set client
	  restAPI.actions.setClient(clientData);

	  await restAPI.actions.getUser();

	  // Print user's data
	  console.log(util.inspect(client.user, { depth: null, colors: true }));

	  // Update user's info
	  fs.writeFile('/tmp/user.json', JSON.stringify(client.user), function(err) {
		if(err) return console.log('Writing user failed:', err);
	  });
	} catch (error) {
	  if(error.code === 'ENOENT')
		console.log('Ο ελεγχος ταυτότητας απέτυχε: Παρακαλούμε να έχεις συνδεθεί πρώτα.');
	  else
	    console.log(`Η ανάκτηση των δεδομένων του χρήστη απέτυχε: ${error.message}`);
	}
  })

  program
  .command('get-invitations')
  .action(async function() {
		try {
			// Get client object
			const client = restAPI.client;
			// Get client data
			const clientData = utils.fileToClient('/tmp/user.json', '/tmp/token.json');
			// Set client
			restAPI.actions.setClient(clientData);

			let invitations = await restAPI.actions.getInvitations();

			// Update user's info
			fs.writeFile('/tmp/user.json', JSON.stringify(client.user), function(err) {
				if(err) return console.log('Writing user failed:', err);
			});

			// Print invitations
		//   console.log(util.inspect(invitations, { depth: null, colors: true }));
			console.log(invitations);
		} catch (error) {
			if(error.response && error.response.data.message)
			console.log('Η ανάκτηση δεδομένων απέτυχε.',error.response.data.message);
			else if(error.code === 'ENOENT')
			console.log('Ο ελεγχος ταυτότητας απέτυχε: Παρακαλούμε να έχεις συνδεθεί πρώτα.');
			else
			console.log('Η ανάκτηση δεδομένων απέτυχε.',error.message);
		}
  })

  program
  .command('update-user')
  .option('-u, --username <value>', 'User\'s username')
  .option('-fn, --firstName <value>', 'User\'s firstName')
  .option('-ln, --lastName <value>', 'User\'s lastName')
  .option('-e, --email <value>', 'User\'s email')
  .action(async function(command) {
		try {
			let data = {
			username: command.username,
			firstName: command.firstName,
			lastName: command.lastName,
			email: command.email
			};
		
			// Get client object
			const client = restAPI.client;
			// Get client data
			const clientData = utils.fileToClient('/tmp/user.json', '/tmp/token.json');
			// Set client
			restAPI.actions.setClient(clientData);

			// Update user
			let response = await restAPI.actions.updateUser(data);
		
			fs.writeFile('/tmp/user.json', JSON.stringify(client.user), function(err) {
			if(err) return console.log('Writing user failed:', err);
			});
		
			console.log(response.message);

				// If a new email was given by the user
			if(response.email){
			// Log out the user until the new email is verified
			fs.unlink('/tmp/token.json', function(err) {
				if(err) return console.log('Removing token failed:', err);
			});
			console.log('Αφού επιβεβαιώσεις το email σου, συνδέσου για να συνεχίσεις στην εφαρμογή.')
			}
		} catch(error) {
			if (error.response && error.response.data.message)
			console.log(`Η ενημέρωση του λογαριασμού απέτυχε: ${error.response.data.message}`);
			else if(error.code === 'ENOENT')
			console.log('Ο ελεγχος ταυτότητας απέτυχε: Παρακαλούμε να έχεις συνδεθεί πρώτα.');
			else
			console.log(`Η ενημέρωση του λογαριασμού απέτυχε: ${error.message}`);
		}
  })

  program
  .command('reset-password')
  .requiredOption('-op, --oldPassword <value>','User\'s old password')
  .requiredOption('-np, --newPassword <value>','User\'s new password')
  .requiredOption('-cp, --confirmPassword <value>','User\'s password confrimation')
  .action(async function(command) {
		try {
			let data = {
			old: command.oldPassword,
			new: command.newPassword,
			confirm: command.confirmPassword
			};
		
			// Get client object
			const client = restAPI.client;
			// Get client data
			const clientData = utils.fileToClient('/tmp/user.json', '/tmp/token.json');
			// Set client
			restAPI.actions.setClient(clientData);
		
			// Reset user's password
			let message = await restAPI.actions.resetPassword(data);
		
			console.log(message);
		} catch(error) {
			if (error.response && error.response.data.message)
			console.log(`Η ενημέρωση του κωδικού πρόσβασης απέτυχε: ${error.response.data.message}`);
			else if(error.code === 'ENOENT')
			console.log('Ο ελεγχος ταυτότητας απέτυχε: Παρακαλούμε να έχεις συνδεθεί πρώτα.');
			else
			console.log(`Η ενημέρωση του κωδικού πρόσβασης απέτυχε: ${error.message}`);
		}
  })

  // NOT GOOD WITH CLI-APP
  // An email will be sent so the user can set a new password & be logged in again
  program
  .command('forgot-password')
  .requiredOption('-e, --email <value>','User\'s email')
  .action(async function(command) {
		try {
			if(fs.existsSync('/tmp/user.json') && fs.existsSync('/tmp/token.json')) {
				return console.log('Είσαι ήδη συνδεδεμένος/-η.\nΑν ξέχασες τον κωδικό σου και θες να ορίσεις καινούριο, παρακαλούμε να έχεις αποσυνδεθεί πρώτα.');
			}

			// Ask to receive email to create new password
			let message = await restAPI.actions.forgotPassword(command.email);
			console.log(message);
			console.log('Αφού δημιουργήσεις τον νέο κωδικό σου, συνδέσου για να συνεχίσεις στην εφαρμογή.');
		} catch (error) {
			if(error.response && error.response.data.message)
				console.log(`Η αποστολή email για την ανανέωση του κωδικού πρόσβασης απέτυχε: ${error.response.data.message}`);
			else
				console.log(`Η αποστολή email για την ανανέωση του κωδικού πρόσβασης απέτυχε: ${error.message}`);
		}
  })

  program
  .command('get-premium')
  .requiredOption('-t, --type <value>', 'Premium plan type (month or year)')
  .action(async function(command) {
		try {
			if(command.type !== 'month' && command.type !== 'year') {
			return console.log('Σφάλμα: Eπίλεξε είτε \'month\' για μηνιαίο είτε \'year\' για ετήσιο πλάνο στο SruManiac.')
			}

			// Get client object
			const client = restAPI.client;
			// Get client data
			const clientData = utils.fileToClient('/tmp/user.json', '/tmp/token.json');
			// Set client
			restAPI.actions.setClient(clientData);
		
			// Update user's plan to premium
			let message = await restAPI.actions.getPremium(command.type);
		
			// Update user's info
			fs.writeFile('/tmp/user.json', JSON.stringify(client.user), function(err) {
			if(err) return console.log('Writing user failed:', err);
			});

			console.log(message);
		} catch(error) {
			if (error.response && error.response.data.message)
			console.log(`Η αναβάθμιση του λογαριασμού σου σε προνομιούχο απέτυχε: ${error.response.data.message}`);
			else if(error.code === 'ENOENT')
			console.log('Ο ελεγχος ταυτότητας απέτυχε: Παρακαλούμε να έχεις συνδεθεί πρώτα.');
			else
			console.log(`Η αναβάθμιση του λογαριασμού σου σε προνομιούχο απέτυχε: ${error.message}`);
		}
  })

  program
  .command('delete-user')
  .action(async function() {
		try {
			// Get client data
			const clientData = utils.fileToClient('/tmp/user.json', '/tmp/token.json');
			// Set client
			restAPI.actions.setClient(clientData);
		
			// Delete user
			let message = await restAPI.actions.deleteUser();
		
			fs.unlink('/tmp/user.json', function(err) {
			if(err) return console.log('Removing user failed:', err);
			});
			fs.unlink('/tmp/token.json', function(err) {
			if(err) return console.log('Removing token failed:', err);
			});
		
			console.log(message);
		} catch (error) {
			if(error.response && error.response.data.message)
			console.log(`Η διαγραφή του λογαριασμού απέτυχε: ${error.response.data.message}`);
			else if(error.code === 'ENOENT')
			console.log('Ο ελεγχος ταυτότητας απέτυχε: Παρακαλούμε να έχεις συνδεθεί πρώτα.');
			else
			console.log(`Η διαγραφή του λογαριασμού απέτυχε: ${error.message}`);
		}
  })

  // NOT GOOD WITH CLI-APP
  program
  .command('signup-google')
  .action(async function() {
		try {
			if(fs.existsSync('/tmp/user.json') && fs.existsSync('/tmp/token.json')) {
			return console.log('Είσαι ήδη συνδεδεμένος/-η.\nΓια να δημιουργήσεις άλλο λογαριασμό, παρακαλούμε να έχεις αποσυνδεθεί πρώτα.');
			}

			let url = await restAPI.actions.signupGoogle();
			console.log(url);
		} catch (error) {
			console.log(error);
		}
  })

// NOT GOOD WITH CLI-APP
  program
  .command('login-google')
  .action(async function() {
		try {
			// Check if the user can log in
			if(fs.existsSync('/tmp/user.json') && fs.existsSync('/tmp/token.json')) {
			return console.log('Είσαι ήδη συνδεδεμένος/-η.');
			}
		
			let url = await restAPI.actions.loginGoogle();
			console.log(url);
		} catch (error) {
			console.log(error);
		}
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