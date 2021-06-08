// import { client } from "@the-ver-best-scrum-team/rest-api-client";

export default {
	isLoading: state => state.isLoading,
	allBoards: state => state.boards,
	activeBoard: state => state.activeBoard,
	unarchivedBoards: state => state.boards.filter(b => !b.archived),
	archivedBoards: state => state.boards.filter(b => b.archived),
	archivedLists: state => (state.activeBoard ? state.activeBoard.lists.filter(l => l.archived) : []),
	unarchivedLists: state => (state.activeBoard ? state.activeBoard.lists.filter(l => !l.archived) : []),
	// token: state => (state.token ? state.token : null),
	token: state => (JSON.parse(localStorage.getItem('token'))),
	tokenn: state => state.tokenn,
	// token: state => (JSON.parse(localStorage.getItem('token')) ? JSON.parse(localStorage.getItem('token')) : null),
	client: state => (JSON.parse(localStorage.getItem('client'))),
	// client: state => (JSON.parse(localStorage.getItem('client')) ? JSON.parse(localStorage.getItem('client')) : null),
	firstName: state => (JSON.parse(localStorage.getItem('client')) ? JSON.parse(localStorage.getItem('client')).user.firstName : null),
	lastName: state => (JSON.parse(localStorage.getItem('client')) ? JSON.parse(localStorage.getItem('client')).user.lastName : null),
	email: state => (JSON.parse(localStorage.getItem('client')) ? JSON.parse(localStorage.getItem('client')).user.email : null),
	image: state => (JSON.parse(localStorage.getItem('client')) ? JSON.parse(localStorage.getItem('client')).user.image : null),
	plan_in_use: state => (JSON.parse(localStorage.getItem('client')) ? JSON.parse(localStorage.getItem('client')).user.plan_in_use : null),
}
