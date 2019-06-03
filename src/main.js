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
import Sortable from 'sortablejs'

Vue.directive('sortable', {
  inserted: function (el, binding) {
    // eslint-disable-next-line no-new
    new Sortable(el, binding.value || {})
  }
})

Vue.directive('limitrow', {
  inserted: function (el, binding) {
    var textarea = el.children[0]
    textarea.onkeypress = function (event) {
      var textarea = this
      var text = textarea.value
      var numberOfLines = (text.match(/\n/g) || []).length + 1
      var maxRows = parseInt(binding.value)

      if (event.which === 13 && numberOfLines === maxRows) {
        return false
      }
    }
  }
})

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
