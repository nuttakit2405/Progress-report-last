import db from '@/database'
const state = {
  events: {}
}

const getters = {
  events: state => state.events
}

const mutations = {
  setEvents: (state, events) => {
    state.events = events
  }
}

const actions = {
  getEvents ({commit}, uid) {
    db.database.ref(`/events/${uid}`).on('value', snapshot => {
      commit('setEvents', snapshot.val())
    })
  },
  addEvent ({commit}, {uid, date, data}) {
    db.database.ref(`/events/${uid}/${date}`).push(data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
