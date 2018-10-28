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
  getEvents ({commit}, {year, uid}) {
    db.database
      .ref(`allEvents/${year}`)
      .on('value', (snap) => {
        const val = snap.val()
        if (val) {
          const events = Object.keys(val).map(key => {
            return {
              key,
              ...val[key]
            }
          }).filter(value => value.members.some(member => member === uid))

          const filtedEvents = events.reduce((prev, curr) => {
            if (!prev[curr.date]) {
              const first = {}
              first[curr.key] = curr
              prev[curr.date] = first
            }
            prev[curr.date][curr.key] = curr
            return prev
          }, {})
          commit('setEvents', filtedEvents)
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
