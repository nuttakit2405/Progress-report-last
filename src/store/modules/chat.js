import db from '@/database'
const state = {
  messages: []
}

const getters = {
  threadSelected: (state) => {
    return {
      'user_id': 'Uc0ef6468fd333657d7aa31393a2cdd92',
      'channel_id': '1524607372',
      'admin_id': ':unassign:',
      'name': 'Ton Piromplad',
      'PictureURL': 'https://profile.line-scdn.net/0hq9AengQjLhZ8HAPPaRNRQUBZIHsLMiheBH42IAkUIHRXLmhBRig2eQtJICdXKGtGE3lmcQ0VdnJW',
      'last_message': 'Photo sent.',
      'last_update': 1546855270857
    }
  },
  messages: (state) => state.messages
}

const mutations = {
  setMessages: (state, data) => {
    state.messages = Object.keys(data).map(key => {
      const newData = data[key]
      newData['msg_id'] = key
      return newData
    })
  }
}

const actions = {
  getMessages ({ commit }, chatId) {
    db.database.ref(`/chat/${chatId}`).orderByChild('timestamp').on('value', function (snap) {
      const data = snap.val()
      if (data) {
        commit('setMessages', data)
      }
    })
  },
  sentMessage ({ commit }, {chatId, message}) {
    db.database.ref(`/chat/${chatId}`).push(message)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
