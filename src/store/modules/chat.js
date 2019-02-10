import Vue from 'vue'
import db from '@/database'

const state = {
  messages: [],
  threads: {},
  projectThreads: {},
  users: [],
  threadSelected: null
}

const getters = {
  threadSelected: (state) => {
    return state.threadSelected
  },
  messages: (state) => state.messages,
  threads: (state) => {
    const data = state.projectThreads
    const threads = Object.keys(data)
      .filter((key) => !data[key].deleted)
      .map((key) => {
        const projects = data[key]
        const thread = {
          'user_id': key,
          'name': projects.thaiProjectName,
          'PictureURL': '/static/img/default-icon-project.png',
          'last_message': state.threads[key] ? state.threads[key].last_message : '',
          'last_update': state.threads[key] ? state.threads[key].last_update : 0
        }
        return thread
      })
    return threads.sort((a, b) => b.last_update - a.last_update)
  }
}

const mutations = {
  setMessages: (state, data) => {
    state.messages = Object.keys(data).map(key => {
      const newData = data[key]
      newData['msg_id'] = key
      return newData
    }).sort((a, b) => a.timestamp - b.timestamp)
  },
  setThreadProject (state, project) {
    Vue.set(state, 'projectThreads', project)
  },
  setThreadUser (state, users) {
    Vue.set(state, 'users', users)
  },
  setThreads (state, thread) {
    Vue.set(state, 'threads', thread)
  },
  clearChat: (state) => {
    state.messages = []
    state.threads = {}
    state.projectThreads = []
    state.users = []
    state.threadSelected = null
  },
  clearMessages: (state) => {
    state.messages = []
  },
  selectThread: (state, data) => {
    state.threadSelected = data
  }
}

const actions = {
  clearChat ({ commit }) {
    commit('clearChat')
  },
  clearMessages ({ commit }) {
    commit('clearMessages')
  },
  getMessages ({ commit }, chatId) {
    db.database.ref(`/chat/${chatId}`).orderByChild('timestamp').on('value', function (snap) {
      const data = snap.val()
      if (data) {
        commit('setMessages', data)
      }
    })
  },
  getThreads ({ commit, dispatch }, uid) {
    db.database.ref(`/chat/threads`).orderByChild('timestamp').on('value', function (snap) {
      const data = snap.val()
      if (data) {
        commit('setThreads', data)
      }
    })
    dispatch('getProjects')
    // dispatch('getUsers')
  },
  getProjects ({ commit }) {
    db.database.ref(`/projects`).on('value', function (snap) {
      const data = snap.val()
      if (data) {
        commit('setThreadProject', data)
      }
    })
  },
  getUsers ({ commit }) {
    db.database.ref(`/users`).on('value', function (snap) {
      const data = snap.val()
      if (data) {
        commit('setThreadUser', data)
      }
    })
  },
  sentMessage (_, { chatId, message }) {
    db.database.ref(`/chat/${chatId}`).push(message)
    db.database.ref(`/chat/threads/${chatId}`).update({
      last_update: message.timestamp,
      last_message: message.msg
    })
  },
  selectThread ({ commit }, threadData) {
    commit('selectThread', threadData)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
