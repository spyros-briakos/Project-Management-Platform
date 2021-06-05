// import { client } from "@the-ver-best-scrum-team/rest-api-client";

export default {
	isLoading: state => state.isLoading,
	allBoards: state => state.boards,
	activeBoard: state => state.activeBoard,
	unarchivedBoards: state => state.boards.filter(b => !b.archived),
	archivedBoards: state => state.boards.filter(b => b.archived),
	archivedLists: state => (state.activeBoard ? state.activeBoard.lists.filter(l => l.archived) : []),
	unarchivedLists: state => (state.activeBoard ? state.activeBoard.lists.filter(l => !l.archived) : []),
	token: state => (state.token ? state.token : null),
	client: state => (state.client ? state.client : null),
	firstName: state => (state.client ? state.client.user.firstName : null),
	lastName: state => (state.client ? state.client.user.lastName : null),
	userName: state => (state.client ? state.client.user.userName : null),
	email: state => (state.client ? state.client.user.email : null),
	image: state => (state.client ? state.client.user.image : null),
	plan_in_use: state => (state.client ? state.client.user.plan_in_use : null),
}
