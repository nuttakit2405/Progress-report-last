<template>
  <div id="app">
    <Header v-if="$route.name != 'Login'"/>
    <router-view />
  </div>
</template>

<script>
import Header from '@/components/Header'
export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
* {
 font-family: 'Kanit', sans-serif;
}

</style>
