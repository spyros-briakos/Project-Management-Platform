// import {client, actions} from '@the-ver-best-scrum-team/rest-api-client/restAPI'

var token = JSON.parse(localStorage.getItem('token'))
var client = JSON.parse(localStorage.getItem('token'))

export default {
  isLoading: true,
  activeBoard: null,
  boards: [],
  client: JSON.parse(localStorage.getItem('client')),
  // client: client ? client : null,
  token: JSON.parse(localStorage.getItem('token')),
  // token: token ? token : null,
}
