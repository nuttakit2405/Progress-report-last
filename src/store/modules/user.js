import auth from '@/auth'
import db from '@/database'

const state = {
  user: null,
  profile: null,
  loading: true
}

const getters = {
  user: state => state.user,
  isLogged: state => (state.user !== null),
  profile: state => state.profile,
  hasProfile: state => (state.profile !== null),
  loading: state => state.loading
}

const mutations = {
  setUser: (state, user) => {
    state.user = user
  },
  setProfile: (state, profile) => {
    state.profile = profile
    state.loading = false
  }
}

const actions = {
  setCurrentUser: ({ commit, dispatch }) => {
    const user = auth.user()
    commit('setUser', user)
    if (user && user.uid) {
      dispatch('setProfile', user.uid)
    }
    // const thisYear = new Date().getFullYear()
    // dispatch('events/getEvents', {year: thisYear, uid: user.uid}, {root: true})
  },
  setProfile: ({commit}, uid) => {
    db.database.ref('users').child(uid).once('value', snap => {
      const val = snap.val()
      commit('setProfile', val)
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
