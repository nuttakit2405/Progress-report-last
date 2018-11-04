const storage = {
  storage: null,
  init (context) {
    this.storage = context.$firebase.storage()
  }
}

export default storage
