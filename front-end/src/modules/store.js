import Vue from 'vue'
import {client, actions} from '@the-ver-best-scrum-team/rest-api-client/restAPI'

export const _client = Vue.observable(client);
// export const _actions = actions;

export const _actions = {
  ...actions
}

export default {_client, _actions}