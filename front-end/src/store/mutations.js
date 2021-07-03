import Vue from "vue"

// Lib to create guid
const s4 = () =>
Math.floor((1 + Math.random()) * 0x10000)
	.toString(16)
	.substring(1)
const guid = () => s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4()

export default {

	// store client
	STORE_CLIENT(state, payload) {
		Vue.set(state, "userName", payload.username)
		Vue.set(state, "firstName", payload.firstName)
		Vue.set(state, "lastName", payload.lastName)
		Vue.set(state, "email", payload.email)
		Vue.set(state, "image", payload.image)
		Vue.set(state, "plan_in_use", payload.plan_in_use)
	},
	// {_id: "60c10f5ce5bf5f10e917e0c9", name: "asdasd", description: "asdasd", productOwner: {…}, scrumMaster: {…}, …}
	// description: "asdasd"
	// members: [{…}]
	// name: "asdasd"
	// plan_in_use: "standard"
	// productOwner: {_id: "60c0dbd1e5bf5f10e917e0be", username: "admin2"}
	// scrumMaster: {_id: "60c0dbd1e5bf5f10e917e0be", username: "admin2"}
	// sprints: []
	// startingDate: "2021-06-09T18:58:36.164Z"
	// status: "inProgress"
	// userStories: []
	// _id: "60c10f5ce5bf5f10e917e0c9"
	// __proto__: Object
	// store project
	STORE_PROJECT(state, payload) {
		console.log("PROJECT IS HERE STORED")
		console.log(payload)
		console.log(payload._id)

		var project = {_id:null, name:null, description:null, plan_in_use:null, status:null, 
						productOwner:{_id:null, username:null}, scrumMaster:{_id:null, username:null}, 
						members:[], }						
		state.project = project

		// project info
		Vue.set(state.project, "_id", payload._id)
		Vue.set(state.project, "name", payload.name)
		Vue.set(state.project, "description", payload.description)
		Vue.set(state.project, "plan_in_use", payload.plan_in_use)
		Vue.set(state.project, "status", payload.status)
		Vue.set(state.project, "startingDate", payload.startingDate)

		// id user
		Vue.set(state.project.productOwner, "_id", payload.productOwner._id)
		Vue.set(state.project.productOwner, "username", payload.productOwner.username)
		Vue.set(state.project.scrumMaster, "_id", payload.scrumMaster._id)
		Vue.set(state.project.scrumMaster, "username", payload.scrumMaster.username)

		// members, userStories, sprints
		Vue.set(state.project, "members", [...payload.members])
		Vue.set(state.project, "userStories", [...payload.userStories])
		Vue.set(state.project, "sprints", [...payload.sprints])

	},

	STORE_PROJECTS(state, payload) {
		Vue.set(state, "projects", [...payload])
	},
	
	STORE_INVITES(state, payload) {
		console.log("INVITESSSSSSSSSSSS IS HERE STORED")
		// add seen
		payload.forEach(function (element) {
			element.seen = 0;
		});
		console.log(payload)
		Vue.set(state, "invites", [...payload])
	},

	UPDATE_SEEN_INVITE(state, payload) {
		var inv = state.invites.find(inv => inv.invitationCode === payload)
		var invIndex = state.invites.findIndex(inv => inv.invitationCode === payload)
		inv.seen = 1
		Vue.set(state.invites, invIndex, inv)
	},

	UPDATE_INVITE(state, payload) {
		var invIndex = state.invites.findIndex(inv => inv.invitationCode === payload.invitationCode)
		Vue.delete(state.invites, invIndex)
	},

	// store token
	STORE_TOKEN(state, payload) {
		Vue.set(state, "token", payload)
	},

	DELETE_TOKEN(state, payload) {
		Vue.set(state, "token", null)
	},

	DELETE_CLIENT(state, payload) {
		Vue.set(state, "userName", null)
		Vue.set(state, "firstName", null)
		Vue.set(state, "lastName", null)
		Vue.set(state, "email", null)
		Vue.set(state, "image", null)
		Vue.set(state, "plan_in_use", null)
	},

	DELETE_PROJECT(state, payload) {
		var project = {_id:null, name:null, description:null, plan_in_use:null, status:null, 
			productOwner:{_id:null, username:null}, scrumMaster:{_id:null, username:null}, 
			members:[], }	
		Vue.set(state, "project", project)
	},

	DELETE_PROJECTS(state, payload) {
		Vue.set(state, "projects", [])
	},

	DELETE_INVITES(state, payload) {
		Vue.set(state, "invites", [])
	},

	SET_LOGEDIN_STATE(state, payload) {
		Vue.set(state, "isLogedIn", payload)
	},

	// Set Initial Data
	SET_INITIAL_DATA(state, payload) {
		Vue.set(state, "boards", payload)
	},

	// Set Loading State
	SET_LOADING_STATE(state, payload) {
		Vue.set(state, "isLoading", payload)
	},

	// Save Task Board
	SAVE_TASKBOARD(state, payload) {
		const board = state.boards.find(b => b.id == payload.id)
		const itemIdx = state.boards.findIndex(b => b.id == payload.id)

		// For existing item
		if (itemIdx > -1) {
		board.name = payload.name
		board.description = payload.description
		Vue.set(state.boards, itemIdx, board)
		}
		// For new item
		else {
		const board = {
			id: guid(),
			name: payload.name,
			description: payload.description,
			archived: false,
			lists: []
		}
		state.boards.push(board)
		}
	},

	// Archive Task Board
	ARCHIVE_TASKBOARD(state, payload) {
		const board = state.boards.find(b => b.id == payload.boardId)
		const boardIdx = state.boards.findIndex(b => b.id == payload.boardId)
		board.archived = true
		Vue.set(state.boards, boardIdx, board)
	},

	// Restore Task Board
	RESTORE_TASKBOARD(state, payload) {
		const board = state.boards.find(b => b.id == payload.boardId)
		const boardIdx = state.boards.findIndex(b => b.id == payload.boardId)
		board.archived = false
		Vue.set(state.boards, boardIdx, board)
	},

	// Save Task List
	SAVE_TASKLIST(state, payload) {
		const board = state.boards.find(b => b.id == payload.boardId)
		const list = board.lists.find(l => l.id == payload.listId)
		const listIdx = board.lists.findIndex(l => l.id == payload.listId)

		// For existing item
		if (listIdx > -1) {
		list.name = payload.name
		Vue.set(board.lists, listIdx, list)
		}
		// // For new item
		else {
		const list = {
			id: guid(),
			name: payload.name,
			headerColor: "#607d8b",
			archived: false,
			items: []
		}
		board.lists.push(list)
		}
	},

	// Archive Task List
	ARCHIVE_TASKLIST(state, payload) {
		const board = state.boards.find(b => b.id == payload.boardId)
		const list = board.lists.find(l => l.id == payload.listId)
		const listIdx = board.lists.findIndex(l => l.id == payload.listId)
		list.archived = true
		Vue.set(board.lists, listIdx, list)
	},

	// Restore Task List
	RESTORE_TASKLIST(state, payload) {
		const board = state.boards.find(b => b.id == payload.boardId)
		const list = board.lists.find(l => l.id == payload.listId)
		const listIdx = board.lists.findIndex(l => l.id == payload.listId)
		list.archived = false
		Vue.set(board.lists, listIdx, list)
	},

	// Reorder TaskBoad Lists
	REORDER_TASKLISTS(state, payload) {
		const board = state.boards.find(b => b.id == payload.boardId)
		Vue.set(board, "lists", payload.lists)
	},

	// Reorder Task List Items
	REORDER_TASKLIST_ITEMS(state, payload) {
		const board = state.boards.find(b => b.id == payload.boardId)
		const listIdx = board.lists.findIndex(l => l.id == payload.listId)
		Vue.set(board.lists[listIdx], "items", payload.items)
	},

	// Set Active Board
	SET_ACTIVE_TASKBOARD(state, payload) {
		state.activeBoard = payload.board
	},

	// Save Task List Item
	SAVE_TASKLIST_ITEM(state, payload) {
		const board = state.boards.find(b => b.id == payload.boardId)
		const list = board.lists.find(l => l.id == payload.listId)
		const itemIdx = list.items.findIndex(item => item.id == payload.item.id)

		// For existing item
		if (itemIdx > -1) {
		Vue.set(list.items, itemIdx, payload.item)
		}
		// For new item
		else {
		payload.item.id = guid()
		list.items.push(payload.item)
		}
	},

	// Delete Task List Item
	DELETE_TASKLIST_ITEM(state, payload) {
		const board = state.boards.find(b => b.id == payload.boardId)
		const list = board.lists.find(l => l.id == payload.listId)
		const itemIdx = list.items.findIndex(item => item.id == payload.item.id)
		// For existing item
		if (itemIdx > -1) {
		Vue.delete(list.items, itemIdx)
		}
	}
}
