// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {store} from '@/store'
import auth from '@/auth'
import Calendar from 'vue2-event-calendar'
import VueSweetalert2 from 'vue-sweetalert2'
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import Buefy from 'buefy'

import 'buefy/dist/buefy.css'
import 'vue2-event-calendar/default.css'

Vue.use(Buefy)
Vue.use(VueSweetalert2)
Vue.component('Calendar', Calendar)

dayjs.locale('th')
Vue.prototype.$dayjs = dayjs

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  beforeCreate () {
    auth.init(this)
  },
  components: { App },
  template: '<App/>'
})
