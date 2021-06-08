// import { client } from "@the-ver-best-scrum-team/rest-api-client";

export default {
	isLoading: state => state.isLoading,
	allBoards: state => state.boards,
	activeBoard: state => state.activeBoard,
	unarchivedBoards: state => state.boards.filter(b => !b.archived),
	archivedBoards: state => state.boards.filter(b => b.archived),
	archivedLists: state => (state.activeBoard ? state.activeBoard.lists.filter(l => l.archived) : []),
	unarchivedLists: state => (state.activeBoard ? state.activeBoard.lists.filter(l => !l.archived) : []),
	// tokenn: state => state.tokenn,
	// token: state => (state.token ? state.token : null),
	// token: state => (JSON.parse(localStorage.getItem('token'))),
	// client: state => (JSON.parse(localStorage.getItem('client'))),
	// firstName: state => (JSON.parse(localStorage.getItem('client')) ? JSON.parse(localStorage.getItem('client')).user.firstName : null),
	// lastName: state => (JSON.parse(localStorage.getItem('client')) ? JSON.parse(localStorage.getItem('client')).user.lastName : null),
	// email: state => (JSON.parse(localStorage.getItem('client')) ? JSON.parse(localStorage.getItem('client')).user.email : null),
	// image: state => (JSON.parse(localStorage.getItem('client')) ? JSON.parse(localStorage.getItem('client')).user.image : null),
	// plan_in_use: state => (JSON.parse(localStorage.getItem('client')) ? JSON.parse(localStorage.getItem('client')).user.plan_in_use : null),
	isLogedIn: state => state.isLogedIn, 
	token: state => state.token,
	userName: state => state.userName,
	name: state => state.firstName+" "+state.lastName,
	firstName: state => state.firstName,
	lastName: state => state.lastName,
	email: state => state.email,
	image: state => state.image,
	plan_in_use: state => state.plan_in_use,

}

