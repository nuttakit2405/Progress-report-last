import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import Calendar from 'vue2-event-calendar'
import VueSweetalert2 from 'vue-sweetalert2'
import dayjs from 'dayjs'
import Buefy from 'buefy'

import html2canvas from 'html2canvas'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from '../lib/vfs_fonts.js'

// style
import 'buefy/dist/buefy.css'
import 'vue2-event-calendar/default.css'

// option
import 'dayjs/locale/th'

const config = {
  apiKey: 'AIzaSyDtoQsBHpBAKl1nb3pie7pph2Pegr_pe_c',
  authDomain: 'progress-report-4973f.firebaseapp.com',
  databaseURL: 'https://progress-report-4973f.firebaseio.com',
  projectId: 'progress-report-4973f',
  storageBucket: 'progress-report-4973f.appspot.com',
  messagingSenderId: '4915050050'
}
firebase.initializeApp(config)

Vue.use(Buefy, { defaultIconPack: 'fas' })
Vue.use(VueSweetalert2)
Vue.component('Calendar', Calendar)
dayjs.locale('th')

Vue.filter('format', (val, format) => {
  return dayjs(val).format(format)
})

Vue.filter('removeTitle', (val) => {
  return val.replace(/^นาย|นางสาว|นาง/i, '')
})

Vue.prototype.$dayjs = dayjs
Vue.prototype.$firebase = firebase

pdfMake.vfs = pdfFonts.pdfMake.vfs

pdfMake.fonts = {
  THSarabunNew: {
    normal: 'THSarabunNew.ttf',
    bold: 'THSarabunNew-Bold.ttf',
    italics: 'THSarabunNew-Italic.ttf',
    bolditalics: 'THSarabunNew-BoldItalic.ttf'
  },
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf'
  }
}

Vue.prototype.$html2canvas = html2canvas
Vue.prototype.$pdfMake = pdfMake
