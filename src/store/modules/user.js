import auth from '@/auth'
import db from '@/database'

const state = {
  user: null
}

const getters = {
  user: state => state.user,
  isLogged: state => (state.user !== null)
}

const mutations = {
  setUser: (state, user) => {
    state.user = user
  }
}

const actions = {
  setCurrentUser: ({ commit, dispatch }) => {
    const user = auth.user()
    dispatch('isHasProfile', user.uid)
    commit('setUser', user)
    // const thisYear = new Date().getFullYear()
    // dispatch('events/getEvents', {year: thisYear, uid: user.uid}, {root: true})
  },
  isHasProfile: ({commit}, uid) => {
    db.database.ref('users').child(uid).once('value', snap => {
      const val = snap.val()
      if (val == null) {
        console.log(this)
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
