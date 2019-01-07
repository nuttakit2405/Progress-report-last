<template>
  <div id="app">
    <Header v-if="$route.name != 'Login'" />
    <router-view :style="{marginTop: $route.name == 'Login' ? '0px' :'65px'}"/>
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
  background-color:#F8F8FF;
}
</style>
