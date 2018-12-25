import firebaseui from 'firebaseui'
import * as utils from './utils'

const auth = {
  context: null,
  uiConfig: null,
  ui: null,
  firebase: null,

  init (context) {
    this.firebase = context.$firebase
    this.context = context
    this.uiConfig = {
      signInSuccessUrl: '/#/profile',
      signInOptions: [this.firebase.auth.GoogleAuthProvider.PROVIDER_ID]
    }
    this.ui = new firebaseui.auth.AuthUI(this.firebase.auth())

    this.firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        console.log('logged')
        const have = await utils.checkHaveEmail(user.email)
        if (have) {
          this.context.$store.dispatch('user/setCurrentUser')
        } else {
          console.log('unauth')
          this.context.$router.push({name: 'UnAuth'})
          return false
        }
      }

      let requireAuth = this.context.$route.matched.some(record => record.meta.requireAuth)

      if (requireAuth && !user) this.context.$router.push('login')
    })
  },
  authForm (container) {
    this.ui.start(container, this.uiConfig)
  },
  user () {
    return this.context ? this.firebase.auth().currentUser : null
  },
  logout () {
    console.log('signOut')
    this.firebase.auth().signOut()
    this.context.$store.dispatch('user/signOut')
  }
}

export default auth
