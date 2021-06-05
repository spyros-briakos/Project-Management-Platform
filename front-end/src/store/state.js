import {client, actions} from '@the-ver-best-scrum-team/rest-api-client/restAPI'

export default {
  isLoading: true,
  activeBoard: null,
  boards: [],
  client: JSON.parse(localStorage.getItem('client')),
  token: JSON.parse(localStorage.getItem('token')),
  // client: client,
}
