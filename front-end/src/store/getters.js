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
	invitesSeen: state => ( (state.invites === undefined || state.invites.length == 0) ? false : (state.invites.map(o => o.seen).reduce((accumulator, currentValue) => accumulator + currentValue) === state.invites.length) ? false : true),

	coWorkers: state => (state.coWorkers === undefined || state.coWorkers.length == 0 ? testing ? coWorkersTest : [] : state.coWorkers ),

}

