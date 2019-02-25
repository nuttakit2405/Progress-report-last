import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import user from './modules/user'
import events from './modules/events'
import projects from './modules/projects'
import chat from './modules/chat'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    viewMode: null,
    todos: [],
    visibility: 'all'
  },
  getters: {
    viewMode: state => state.viewMode,
    todos: state => state.todos,
    visibility: state => state.visibility,
    count: state => state.todos.length,
    countActives: state => state.todos.filter(todo => todo.completed === false).length,
    countCompleted: state => state.todos.filter(todo => todo.completed === true).length
  },
  mutations: {
    setViewMode (state, mode) {
      state.viewMode = mode
    },
    ADD_TODO (state, title) {
      state.todos.push({
        title,
        completed: false
      })
    },
    CHANGE_VISIBILITY (state, newVisibilityValue) {
      state.visibility = newVisibilityValue
    },
    DELETE_TODO (state, index) {
      state.todos.splice(index, 1)
    },
    TOGGLE_TODO (state, index) {
      state.todos[index].completed = !state.todos[index].completed
    },
    CLEAR_COMPELETED_TODO (state) {
      state.todos = state.todos.filter(todo => todo.completed === false)
    },
    LOAD (state, todos) {
      state.todos = todos
    },
    REORDER (state, {oldIndex, newIndex}) {
      const movedItem = state.todos.splice(oldIndex, 1)[0]
      state.todos.splice(newIndex, 0, movedItem)
    }
  },
  actions: {
    setViewMode ({commit}, mode) {
      commit('setViewMode', mode)
    },
    addTodo ({commit, dispatch}, title) {
      commit('ADD_TODO', title)
      dispatch('save')
    },
    changeVisibility ({commit}, newVisibilityValue) {
      commit('CHANGE_VISIBILITY', newVisibilityValue)
    },
    deleteTodo ({commit, dispatch}, index) {
      commit('DELETE_TODO', index)
      dispatch('save')
    },
    line ({commit, dispatch}, index) {
      commit('TOGGLE_TODO', index)
      dispatch('save')
    },
    clearCompeleted ({commit, dispatch}) {
      commit('CLEAR_COMPELETED_TODO')
      dispatch('save')
    },
    save ({state}) {
      localStorage.setItem('todos', JSON.stringify(state.todos))
    },
    load ({commit}) {
      let todos = localStorage.getItem('todos')
      if (todos != null) {
        commit('LOAD', JSON.parse(todos))
      }
    },
    reorder ({commit}, {oldIndex, newIndex}) {
      commit('REORDER', {oldIndex, newIndex})
    },
    sentNoti ({state, dispatch}, data) {
      const to = data.to.map(key => {
        const user = state.user.allUsers[key]
        const email = user.sid ? `${user.sid}@fitm.kmutnb.ac.th` : user.email
        return {
          name: user.fullName,
          email: email
        }
      }).filter((value, index, self) => {
        return self.map(e => e.email).indexOf(value.email) === index
      })

      const mailBody = {
        subject: data.subject,
        to: to,
        content: {
          type: 'text/html',
          body: data.content
        }
      }
      console.log(mailBody)
      dispatch('sentMail', mailBody)
    },
    async sentMail ({commit}, mailBody) {
      // mailBody = {
      //   subject: 'Test Sent Mail',
      //   to: [
      //     {
      //       name: 'Chanwit',
      //       email: 'kingkong2103@gmail.com'
      //     },
      //     {
      //       name: 'Chanwit',
      //       email: 'chanwit.piromplad@gmail.com'
      //     }
      //   ],
      //   content: {
      //     type: 'text/plain',
      //     body: 'mail body'
      //   }
      // }

      if (mailBody) {
        try {
          const res = await axios.post('https://progress-report-mailer.herokuapp.com/mail', mailBody)
          console.log(res)
        } catch (e) {
          console.log(e)
        }
      }
    }
  },
  modules: {
    user,
    events,
    projects,
    chat
  }
})
