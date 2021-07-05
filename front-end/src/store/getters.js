// import { client } from "@the-ver-best-scrum-team/rest-api-client";
// import {fts} from '../FullTextSearch/fts.js'
// print old projects for front debugging without database
var projectsTest = [
	{
		_id: 1,
		name: "Deploy PPO, A2C model",
		status: '80%',
		members: [{_id: "60c0dbd1e5bf5f10e917e0be", username: "Mike"},
		{_id: "60c0dbd1e5bf5f10e917e0be", username: "Spyros"},
		{_id: "60c0dbd1e5bf5f10e917e0be", username: "Dion"},
		{_id: "60c0dbd1e5bf5f10e917e0be", username: "Mery"},
		{_id: "60c0dbd1e5bf5f10e917e0be", username: "Andreas"},
		{_id: "60c0dbd1e5bf5f10e917e0be", username: "Aleksandra"},],
	},

	{
		_id: 2,
		name: "CNN's Implementation",
		status: '80%',
		members: [{_id: "60c0dbd1e5bf5f10e917e0be", username: "Mike"},
		{_id: "60c0dbd1e5bf5f10e917e0be", username: "Spyros"},
		{_id: "60c0dbd1e5bf5f10e917e0be", username: "Dion"},
		{_id: "60c0dbd1e5bf5f10e917e0be", username: "Mery"},
		{_id: "60c0dbd1e5bf5f10e917e0be", username: "Andreas"},
		{_id: "60c0dbd1e5bf5f10e917e0be", username: "Aleksandra"},],
	},

	{
		_id: 3,
		name: "Mini JS Compiler",
		status: '80%',
		members: [{_id: "60c0dbd1e5bf5f10e917e0be", username: "Mike"},
		{_id: "60c0dbd1e5bf5f10e917e0be", username: "Spyros"},
		{_id: "60c0dbd1e5bf5f10e917e0be", username: "Dion"},
		{_id: "60c0dbd1e5bf5f10e917e0be", username: "Mery"},
		{_id: "60c0dbd1e5bf5f10e917e0be", username: "Andreas"},
		{_id: "60c0dbd1e5bf5f10e917e0be", username: "Aleksandra"},],
	},

	{
		_id: 4,
		name: "LSH HyperCube Algorithms",
		status: '80%',
		members: [{_id: "60c0dbd1e5bf5f10e917e0be", username: "Mike"},
		{_id: "60c0dbd1e5bf5f10e917e0be", username: "Spyros"},
		{_id: "60c0dbd1e5bf5f10e917e0be", username: "Dion"},
		{_id: "60c0dbd1e5bf5f10e917e0be", username: "Mery"},
		{_id: "60c0dbd1e5bf5f10e917e0be", username: "Andreas"},
		{_id: "60c0dbd1e5bf5f10e917e0be", username: "Aleksandra"},],
	},

	{
		_id: 5,
		name: "Variational Autoencoders",
		status: '80%',
		members: [{_id: "60c0dbd1e5bf5f10e917e0be", username: "Mike"},
		{_id: "60c0dbd1e5bf5f10e917e0be", username: "Spyros"},
		{_id: "60c0dbd1e5bf5f10e917e0be", username: "Dion"},
		{_id: "60c0dbd1e5bf5f10e917e0be", username: "Mery"},
		{_id: "60c0dbd1e5bf5f10e917e0be", username: "Andreas"},
		{_id: "60c0dbd1e5bf5f10e917e0be", username: "Aleksandra"},],
	},

	{
		_id: 6,
		name: "Redesign Eudoxus Website",
		status: '80%',
		members: [{_id: "60c0dbd1e5bf5f10e917e0be", username: "Mike"},
		{_id: "60c0dbd1e5bf5f10e917e0be", username: "Spyros"},
		{_id: "60c0dbd1e5bf5f10e917e0be", username: "Dion"},
		{_id: "60c0dbd1e5bf5f10e917e0be", username: "Mery"},
		{_id: "60c0dbd1e5bf5f10e917e0be", username: "Andreas"},
		{_id: "60c0dbd1e5bf5f10e917e0be", username: "Aleksandra"},],
	},

	{
		_id: 7,
		name: "Best DI Team Implementation",
		status: '80%',
		members: [{_id: "60c0dbd1e5bf5f10e917e0be", username: "Mike"},
		{_id: "60c0dbd1e5bf5f10e917e0be", username: "Spyros"},
		{_id: "60c0dbd1e5bf5f10e917e0be", username: "Dion"},
		{_id: "60c0dbd1e5bf5f10e917e0be", username: "Mery"},
		{_id: "60c0dbd1e5bf5f10e917e0be", username: "Andreas"},
		{_id: "60c0dbd1e5bf5f10e917e0be", username: "Aleksandra"},],
	}
]

var invitesTest = [
	{invitationCode: "11", receiver: 'invite from 1', sender: 'SOYVLAKIA O MPAMPHS', project: 'scrumProject 1', date: '23-2-2021', seen: 1},
	{invitationCode: "22", receiver: 'invite from 2', sender: 'SOYVLAKIA O MPAMPHS', project: 'scrumProject 2', date: '23-2-2021', seen: 1},
	{invitationCode: "33", receiver: 'invite from 3', sender: 'SOYVLAKIA O MPAMPHS', project: 'scrumProject 3', date: '23-2-2021', seen: 0},
]

var testSearch = [
	{_id: "873468712uwedhjs72", firstName: 'test', lastName: 'mplampla', username: "Petros"},
	{_id: "873468712uwedhjs73", firstName: 'test1', lastName: 'mpla9mpla', username: "Punisher"},
	{_id: "873468712uwedhjs74", firstName: 'test2', lastName: 'mpla8mpla', username: "Bannanito"},
	{_id: "873468712uwedhjs75", firstName: 'test3', lastName: 'mpla7mpla', username: "Parasekyh"},
	{_id: "873468712uwedhjs76", firstName: 'test4', lastName: 'mpla6mpla', username: "Giannhs"},
	{_id: "873468712uwedhjs77", firstName: 'test5', lastName: 'mpla5mpla', username: "Gewrgia"},
	{_id: "873468712uwedhjs78", firstName: 'test6', lastName: 'mpla4mpla', username: "gogo"},
	{_id: "873468712uwedhjs79", firstName: 'test7', lastName: 'mpla3mpla', username: "gogo1"},
	{_id: "873468712uwedhjs80", firstName: 'test8', lastName: 'mpla2mpla', username: "gogo2"},
	{_id: "873468712uwedhjs81", firstName: 'test9', lastName: 'mpla1mpla', username: "gogo3"},
]

// var testing = true
var coWorkersTest = [
	{_id: 1, username: "Christina Evaggelou"},
	{_id: 2, username: "Giwrgos Raptis"},
	{_id: 3, username: "Melina Papadioti"},
	{_id: 4, username: "Antonis Mourat"},
	{_id: 5, username: "Vasilis Mpimis"},
	{_id: 6, username: "Eleni Masoura"},
	{_id: 7, username: "Rafail Musaj"},
	{_id: 8, username: "Chris Baziotis"},
	{_id: 9, username: "Panos Perdikos"},
]

var testing = false
var testingSearch = false

export default {
	isLoading: state => state.isLoading,
	allBoards: state => state.boards,
	activeBoard: state => state.activeBoard,
	unarchivedBoards: state => state.boards.filter(b => !b.archived),
	archivedBoards: state => state.boards.filter(b => b.archived),
	archivedLists: state => (state.activeBoard ? state.activeBoard.lists.filter(l => l.archived) : []),
	unarchivedLists: state => (state.activeBoard ? state.activeBoard.lists.filter(l => !l.archived) : []),
	
	isLogedIn: state => state.isLogedIn,
	token: state => state.token,
	userName: state => state.userName,
	// name: state => state.firstName+" "+state.lastName,
	firstName: state => state.firstName,
	lastName: state => state.lastName,
	email: state => state.email,
	image: state => state.image,
	plan_in_use: state => state.plan_in_use,

	isPremium: state => (state.plan_in_use === "standard") ? false : true,

	checkPremiumAtProjectCreation: state => (this.isPremium ? true : state.projects.length < state.constants.maxNonPremiumProjects),
// 
// 
	project: state => state.project ? state.project : null,
	projectId: state => state.project._id ? state.project._id : null,
	projectName: state => state.project.name ? state.project.name : null,
	projectDescription: state => state.project.description ? state.project.description : null,
	projectPlan: state => state.project.plan_in_use ? state.project.plan_in_use : null,
	projectStatus: state => state.project.status ? state.project.status : null,
	projectProductOwner: state => state.project ? state.project.productOwner : null,
	projectScrumMaster: state => state.project ? state.project.scrumMaster : null,
	projectMembers: state => state.project ? state.project.members : null ,
	// projectSprints: state => state.project ? state.project.sprints : null ,
	// projectUserStories: state => state.project ? state.projectuserStories : null ,
	projectSprints: state => (state.sprints === undefined || state.sprints.length == 0 ? [] : state.sprints),
	projectUserStories: state => (state.userStories === undefined || state.userStories.length == 0 ? [] : state.userStories),

	getUserStoriesNames: state => (state.userStories === undefined || state.userStories.length == 0 ? [] : state.userStories.map(us => us.name)),


	projects: state => (state.projects === undefined || state.projects.length == 0 ? testing ? projectsTest : [] : state.projects),
	invites: state => (state.invites === undefined || state.invites.length == 0 ? testing ? invitesTest : [] : state.invites),
	invitesSeen: state => ( (state.invites === undefined || state.invites.length == 0) ? false : (state.invites.map(o => o.seen).reduce((accumulator, currentValue) => accumulator + currentValue) === state.invites.length) ? false : true),
	coWorkers: state=>( (state.coWorkers === undefined || state.coWorkers.length == 0) ? (testing ? coWorkersTest : []) : state.coWorkers ),

	getSprintNames: (state) => () => {
		var sprintNames = []
		for (let sprint of state.sprints) {
			sprintNames.push(sprint.name)
		}
		return sprintNames
	},

	getSprintbyName: (state) => (sprintName) => {
        return JSON.parse(JSON.stringify(state.sprints.find(s => s.name === sprintName)))
	},

	getSprintbyId: (state) => (id) => {
        return JSON.parse(JSON.stringify(state.sprints.find(s => s._id === id)))
	},

	getUserStoryIdbyName: (state) => (userStoryName) => {
        return state.userStories.find(us => us.name === userStoryName)._id
	},

	getUserStorybyName: (state) => (userStoryName) => {
        return JSON.parse(JSON.stringify(state.userStories.find(us => us.name === userStoryName)))
	},

	getUserStorybyId: (state) => (id) => {
        return JSON.parse(JSON.stringify(state.userStories.find(us => us._id === id)))
	},

	getTaskIdbyNames: (state) => (taskName, userStoryName) => {
        return state.userStories.find(us => us.name === userStoryName).tasks.find(task => task.name === taskName)._id
	},




	allUsers: state => ( (state.allUsers == undefined || state.allUsers.length == 0) ? (testingSearch ? testSearch : []) : state.allUsers),




	getTaskbyNames: (state) => (taskName, userStoryName) => {
        return JSON.parse(JSON.stringify(state.userStories.find(us => us.name === userStoryName).tasks.find(task => task.name === taskName)))
	},

	getTaskbyId: (state) => (id) => {
		for(let us of state.userStories) {
			for(let task of us.tasks) {
				if (task._id === id) {
					return JSON.parse(JSON.stringify(task))
				}
			}
		}
		return null
	},

	getTaskMembersbyId: (state, getters) => (id) => {
		var task = getters.getTaskbyId(id)
		var memberUsernames = []
		for (let user of task.members) {
			memberUsernames.push(user.username)
		}
		return memberUsernames
	},

	getTaskbyName: (state) => (name) => {
		for(let us of state.userStories) {
			for(let task of us.tasks) {
				if (task.name === name) {
					return JSON.parse(JSON.stringify(task))
				}
			}
		}
		return null
	},

	getSprintPercentage: (state, getters) => (sprint) => {
		var total = 0;
		var done = 0;
		for(let task of sprint.tasks) {
			total += 1
			if (task.status === "toDo") {				
				done += 0
			} else if (task.status === "inProgress") {
				done += 0.5
			} else if (task.status === "done") {
				done += 1
			}
		}
		if (total == 0)
			return "0"
		return 100*(done/total).toFixed(1).toString()
	},

	getHistory: (state, getters) => () => {
		var forms = [];
		var id = 0;
		for(let sprint of state.sprints) {
			forms.push({
				id: ++id,
				name: sprint.name,
				status: sprint.status === "toDo" ? "Εκκρεμεί" : sprint.status === "inProgress" ? "Σε εξέλιξη" : "Ολοκληρώθηκε",
				progress: getters.getSprintPercentage(sprint), 
				comments: sprint.description
			})
		}
		return forms
	},

	getTotalSprintDates: (state, getters) => () => {
		var totalDays = 1;
		for(let sprint of state.sprints) {
			totalDays += parseInt(sprint.estimated_duration)
		}
		return totalDays
	},
	
	

	getTotalSprintDatesArray: (state, getters) => (id) => {
		var totalDaysArray = [];
		var estimated_duration = parseInt(getters.getSprintbyId(id).estimated_duration)
		for(let day=0; day<estimated_duration; day++) {
			totalDaysArray.push(day)
		}
		return totalDaysArray
	},
	
	getTotalSprintDatesIdealBurn: (state, getters) => () => {
		var totalDaysArray = [];
		for(let day=getters.getTotalSprintDates(); day>0; day--) {
			totalDaysArray.push(day)
		}
		return totalDaysArray
	},
	


	getTotalSprintTaskDates: (state, getters) => (id) => {
		var sprintTasks = getters.getSprintbyId(id).tasks

		var totalDays = 1;
		for(let task of sprintTasks) {
			totalDays += parseInt(task.estimated_duration)
		}
		return totalDays
	},

	getTotalSprintTaskDatesArray: (state, getters) => (id) => {
		var totalDaysArray = [];
		var estimated_duration = parseInt(getters.getSprintbyId(id).estimated_duration)
		for(let day=1; day<=estimated_duration; day++) {
			totalDaysArray.push(day)
		}
		return totalDaysArray
	},

	getBurnDownIdealChartbySprintId: (state, getters) => (id) => {
		var xAxisArray = getters.getTotalSprintTaskDatesArray(id)
		var xAxis = xAxisArray.length
		var yAxis = getters.getTotalSprintTaskDates(id)
		var yAxisArray = new Array(yAxis)
		var load = yAxis/parseFloat(xAxis)
		var totalLoad = parseFloat(yAxis)
		var totalLoadArray = [];
		var actualLoad = 0.0
		console.log("Ideal", xAxis, yAxis, load)
		for(let day=0; day<xAxis; day++) {
			actualLoad = totalLoad -= load
			totalLoadArray.push(parseFloat(actualLoad.toFixed(1)))
		}
		return totalLoadArray
	},

	getBurnDownActualChartbySprintId: (state, getters) => (id) => {
		var xAxisArray = getters.getTotalSprintTaskDatesArray(id)
		var xAxis = xAxisArray.length
		var yAxis = getters.getTotalSprintTaskDates(id)
		var yAxisArray = new Array(yAxis)
		// load in Actual predicion is the slope of the % of the completition of the sprint
		var percentage = getters.getSprintPercentage(getters.getSprintbyId(id))
		percentage = (parseFloat(percentage)/100)*yAxis 
		var load = percentage
		var totalLoad = parseFloat(yAxis)
		var totalLoadArray = [];
		var actualLoad = 0.0
		console.log("Actual", xAxis, yAxis, load)
		for(let day=0; day<xAxis; day++) {
			actualLoad = totalLoad -= load
			if (actualLoad < 0)
				actualLoad = 0.0
			totalLoadArray.push(parseFloat(actualLoad.toFixed(1)))
		}
		return totalLoadArray
	},


	
}

