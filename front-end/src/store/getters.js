// import { client } from "@the-ver-best-scrum-team/rest-api-client";

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

	projects: state => (state.projects === undefined || state.projects.length == 0 ? null : state.projects)

}

