<template>
  <div class="hello">
    <div class="container">
      <div class="column">
        <div class="column is-full">
          <div class="level" >
            <section>
              <div class="level">
                <b-collapse class="card" v-for="ins in 5" :key="ins">
                  <div slot="trigger" slot-scope="props" class="card-header">
                      <p class="card-header-title">
                          Component
                      </p>
                      <a class="card-header-icon">
                          <b-icon
                              :icon="props.open ? 'menu-down' : 'menu-up'">
                          </b-icon>
                      </a>
                  </div>
                  <div class="card-content">
                      <div class="content">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
                          <a>#buefy</a>.
                      </div>
                  </div>
                  <footer class="card-footer">
                      <a class="card-footer-item">Save</a>
                      <a class="card-footer-item">Edit</a>
                      <a class="card-footer-item">Delete</a>
                  </footer>
                </b-collapse>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
