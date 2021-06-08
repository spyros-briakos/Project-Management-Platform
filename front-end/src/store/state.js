// import {client, actions} from '@the-ver-best-scrum-team/rest-api-client/restAPI'

// var token_ = JSON.parse(localStorage.getItem('token'))
// var client_ = JSON.parse(localStorage.getItem('client'))

export default {
  isLoading: true,
  activeBoard: null,
  boards: [],
  client: JSON.parse(localStorage.getItem('client')),
  // client: client_ ? client_ : "xexe",
  token: JSON.parse(localStorage.getItem('token')),
  tokenn: null,
  // token: token_ ? token_ : "xexe",
}
