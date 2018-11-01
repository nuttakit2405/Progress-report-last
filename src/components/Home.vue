<template>
  <div class="hello">
    <div class="container">
      <div class="column">
        <div class="notification">
          <div class="level">
            <div class="level-item has-text-centered ">
              <router-link :to="{name: 'Login'}" class="button is-medium">Login</router-link>
            </div>
          </div>
        </div> 
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
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
