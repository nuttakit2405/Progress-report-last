import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import events from './modules/events'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    events
  }
})
