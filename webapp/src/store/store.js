import Vue from 'vue';
import Vuex from 'vuex';

import stocks from './modules/stocks.js';
import portfolio from './modules/portfolio.js';
import auth from './modules/auth.js'

import * as actions from './actions';

Vue.use(Vuex);

export const store = new Vuex.Store({
  actions,
  modules: {
    stocks,
    portfolio,
    auth
  }
})
