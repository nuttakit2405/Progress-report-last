import auth from '@/auth'

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
    commit('setUser', user)
    dispatch('events/getEvents', user.uid, {root: true})
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
