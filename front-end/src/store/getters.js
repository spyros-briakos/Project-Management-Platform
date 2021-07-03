// import { client } from "@the-ver-best-scrum-team/rest-api-client";

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
	{_id: "873468712uwedhjs72", username: "Petros"},
	{_id: "873468712uwedhjs73", username: "Punisher"},
	{_id: "873468712uwedhjs74", username: "Bannanito"},
	{_id: "873468712uwedhjs75", username: "Parasekyh"},
	{_id: "873468712uwedhjs76", username: "Giannhs"},
	{_id: "873468712uwedhjs77", username: "Gewrgia"},
	{_id: "873468712uwedhjs78", username: "gogo"},
	{_id: "873468712uwedhjs79", username: "gogo1"},
	{_id: "873468712uwedhjs80", username: "gogo2"},
	{_id: "873468712uwedhjs81", username: "gogo3"},
]

var testing = true

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
	name: state => state.firstName+" "+state.lastName,
	firstName: state => state.firstName,
	lastName: state => state.lastName,
	email: state => state.email,
	image: state => state.image,
	plan_in_use: state => state.plan_in_use,
	isPremium: state => (state.plan_in_use === "standard") ? false : true ,

	projectName: state => state.project.name,
	projectId: state => state.project._id,

	projects: state => (state.projects === undefined || state.projects.length == 0 ? testing ? projectsTest : [] : state.projects),
	invites: state => (state.invites === undefined || state.invites.length == 0 ? testing ? invitesTest : [] : state.invites),

	allUsers: state => (state.allUsers == undefined || state.allUsers.length == 0 ? testing ? testSearch : [] : state.allUsers)
}

