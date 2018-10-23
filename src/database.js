const database = {
  database: null,
  ref: null,
  init (context) {
    this.database = context.$firebase.database()
    this.ref = this.database.ref
  }
}

export default database
