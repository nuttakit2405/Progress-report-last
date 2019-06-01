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
    state.projects = Object.keys(projects).map(k => {
      const p = projects[k]
      p.key = k
      return p
    }).filter(k => {
      return !k.deleted
    }).reduce((p, c) => {
      p[c.key] = c
      return p
    }, {})
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
    db.database.ref('/projects').child(id).on('value', (snap) => {
      if (snap.val()) {
        commit('setSelectProject', {
          ...snap.val(),
          key: snap.key
        })
      }
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
