const storage = {
  storage: null,
  init (context) {
    this.storage = context.$firebase.storage()
  },
  upload (filename, file, dir = '/') {
    return this.storage.ref(dir).child(filename).put(file)
  }
}

export default storage
