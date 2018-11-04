import db from '@/database'
const state = {
  projects: {}
}

const getters = {
  projects: state => state.projects
}

const mutations = {
  setProjects: (state, projects) => {
    state.projects = projects
  }
}

const actions = {
  getProjects ({commit}) {
    db.database.ref('/projects').on('value', (snap) => {
      commit('setProjects', snap.val())
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
