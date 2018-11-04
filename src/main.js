// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store'

import './plugin'
import auth from './auth'
import database from './database'
import storage from './storage'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  beforeCreate () {
    auth.init(this)
    database.init(this)
    storage.init(this)
  },
  components: { App },
  template: '<App/>'
})
