import auth from '@/auth'
import db from '@/database'

const state = {
  allUsers: {},
  user: null,
  profile: null,
  loading: true
}

const getters = {
  user: state => state.user,
  allUsers: state => state.allUsers,
  isLogged: state => (state.user !== null),
  profile: state => state.profile,
  hasProfile: state => (state.profile !== null),
  loading: state => state.loading
}

const mutations = {
  signOut: (state) => {
    state.allUsers = {}
    state.user = null
    state.profile = null
  },
  setUser: (state, user) => {
    state.user = user
  },
  setProfile: (state, profile) => {
    state.profile = profile
    state.loading = false
  },
  setAllUsers: (state, users) => {
    Object.keys(users).forEach(key => {
      users[key]['key'] = key
    })
    state.allUsers = users
  }
}

const actions = {
  signOut: ({commit}) => {
    commit('signOut')
  },
  setCurrentUser: ({ commit, dispatch }) => {
    const user = auth.user()
    commit('setUser', user)
    if (user && user.uid) {
      dispatch('setProfile', user.uid)
      dispatch('getAllUsers')
    }
  },
  setProfile: ({commit}, uid) => {
    db.database.ref('users').child(uid).on('value', snap => {
      const val = snap.val()
      commit('setProfile', val)
      if (val !== null) {
        let viewMode = val.userType
        if (viewMode === 'teacher') {
          viewMode = val.teacherGroup[0]
        }
        commit('setViewMode', viewMode, {root: true})
      }
    })
  },
  getAllUsers ({commit}) {
    db.database.ref('users').on('value', snap => {
      const users = snap.val()
      if (users !== null) {
        commit('setAllUsers', users)
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
