import Vue from 'vue'
import {_client, _actions} from '../../../rest-api-client/restAPI';

export const client = Vue.observable(_client);

export const actions = _actions;