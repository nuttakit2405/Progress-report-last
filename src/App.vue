<template>
  <div id="app">
    <Header v-if="$route.name != 'Login'" />
    <router-view :class="{'mg-t-45px-tablet mg-t-65px-mobile': $route.name !== 'Login'}"/>
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
html{
  background-color:#F8F8FF !important;
}
</style>
