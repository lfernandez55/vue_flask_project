import Vue from 'vue';
import Vuex from 'vuex';


import auth from './modules/auth.js'
import general from './modules/general.js'
import admin from './modules/admin.js'

import * as actions from './actions';

Vue.use(Vuex);

export const store = new Vuex.Store({
  actions,
  modules: {
    auth,
    general,
    admin
  }
})

