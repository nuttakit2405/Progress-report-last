const database = {
  database: null,
  init (context) {
    this.database = context.$firebase.database()
  }
}

export default database
