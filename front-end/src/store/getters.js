import { client } from "@the-ver-best-scrum-team/rest-api-client";

export default {
	isLoading: state => state.isLoading,
	allBoards: state => state.boards,
	activeBoard: state => state.activeBoard,
	unarchivedBoards: state => state.boards.filter(b => !b.archived),
	archivedBoards: state => state.boards.filter(b => b.archived),
	archivedLists: state => (state.activeBoard ? state.activeBoard.lists.filter(l => l.archived) : []),
	unarchivedLists: state => (state.activeBoard ? state.activeBoard.lists.filter(l => !l.archived) : []),
	token: state => (state.token),
	firstName: state => (state.client.user.firstName),
	lastName: state => (state.client.user.lastName),
	userName: state => (state.client.user.username),
	email: state => (state.client.user.email),
	image: state => (state.client.user.image),
	plan_in_use: state => (state.client.user.plan_in_use),
}
