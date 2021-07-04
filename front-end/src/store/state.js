// import {client, actions} from '@the-ver-best-scrum-team/rest-api-client/restAPI'

// var token_ = JSON.parse(localStorage.getItem('token'))
// var client_ = JSON.parse(localStorage.getItem('client'))

export default {
	isLoading: false,
	activeBoard: null,
	boards: [],
	isLogedIn: false,
	// client: JSON.parse(localStorage.getItem('client')),
	// client: client_ ? client_ : "xexe",
	// token: JSON.parse(localStorage.getItem('token')),
	constants: {maxCoWorkers:20, maxNonPremiumProjects:3},
	token: null,
	_id: null,
	userName: null,
	firstName: null,
	allUsers: [],
	lastName: null,
	email: null,
	image: null,
	plan_in_use: null,

	project: null,
	sprints: [],
	userStories: [],
	projects: [],

	invites: [],
	coWorkers: [],
}
