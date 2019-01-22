import db from '@/database'
const state = {
  messages: [],
  threads: [],
  projectThreads: [],
  users: [],
  threadSelected: null
}

const getters = {
  threadSelected: (state) => {
    return state.threadSelected
  },
  messages: (state) => state.messages,
  threads: (state) => {
    return [...state.projectThreads, ...state.users]
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
    state.projectThreads = project
  },
  clearChat: (state) => {
    state.messages = []
    state.threads = []
    state.projectThreads = []
    state.users = []
    state.threadSelected = null
  },
  selectThread: (state, data) => {
    state.threadSelected = data
  }
}

const actions = {
  clearChat ({commit}) {
    commit('clearChat')
  },
  getMessages ({ commit }, chatId) {
    db.database.ref(`/chat/${chatId}`).orderByChild('timestamp').on('value', function (snap) {
      const data = snap.val()
      if (data) {
        commit('setMessages', data)
      }
    })
  },
  getThreads ({ commit, dispatch }) {
    db.database.ref(`/chat/threads`).orderByChild('timestamp').on('value', function (snap) {
      const data = snap.val()
      console.log(data)
    })
    dispatch('getProjects')
  },
  getProjects ({commit}) {
    db.database.ref(`/projects`).on('value', function (snap) {
      const data = snap.val()
      if (data) {
        const threads = Object.keys(data)
          .filter((key) => !data[key].deleted)
          .map((key) => {
            const projects = data[key]
            const thread = {
              'user_id': key,
              'name': projects.thaiProjectName,
              'PictureURL': 'http://www.decisionanalysis.net/wp-content/uploads/2015/08/icon-page-project-management.png',
              'last_message': '',
              'last_update': 1546855270857
            }
            return thread
          })
        commit('setThreadProject', threads)
      }
    })
  },
  sentMessage ({ commit }, {chatId, message}) {
    db.database.ref(`/chat/${chatId}`).push(message)
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
