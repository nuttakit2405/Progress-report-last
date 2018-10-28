import firebaseui from 'firebaseui'

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

    this.firebase.auth().onAuthStateChanged((user) => {
      this.context.$store.dispatch('user/setCurrentUser')

      let requireAuth = this.context.$route.matched.some(record => record.meta.requireAuth)
      // let guestOnly = this.context.$route.matched.some(record => record.meta.guestOnly)

      if (requireAuth && !user) this.context.$router.push('login')
      // else if (guestOnly && user) this.context.$router.push('profile')
    })
  },
  authForm (container) {
    this.ui.start(container, this.uiConfig)
  },
  user () {
    return this.context ? this.firebase.auth().currentUser : null
  },
  logout () {
    this.firebase.auth().signOut()
  }
}

export default auth
