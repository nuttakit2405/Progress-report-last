import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import events from './modules/events'
import projects from './modules/projects'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    viewMode: null
  },
  getters: {
    viewMode: state => state.viewMode
  },
  mutations: {
    setViewMode (state, mode) {
      state.viewMode = mode
    }
  },
  actions: {
    setViewMode ({commit}, mode) {
      commit('setViewMode', mode)
    }
  },
  modules: {
    user,
    events,
    projects
  }
})
