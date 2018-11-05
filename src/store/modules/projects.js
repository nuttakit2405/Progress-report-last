import db from '@/database'
const state = {
  projects: {},
  projectSelected: null
}

const getters = {
  projects: state => state.projects,
  projectSelected: state => state.projectSelected
}

const mutations = {
  setProjects: (state, projects) => {
    state.projects = projects
  },
  setSelectProject: (state, val) => {
    state.projectSelected = val
  }
}

const actions = {
  getProjects ({commit}) {
    db.database.ref('/projects').on('value', (snap) => {
      commit('setProjects', snap.val())
    })
  },
  selectProject ({commit}, id) {
    db.database.ref('/projects').child(id).once('value', (snap) => {
      commit('setSelectProject', snap.val())
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
