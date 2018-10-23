<template>
<div id="auth" style="margin-top: 20px;">
  <div class="container">
    <div class="columns is-mobile">
      <div class="column is-4 is-offset-4 hero is-light">
        <div id="firebaseui-auth-container"></div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import auth from '@/auth'

export default {
  name: 'auth',
  mounted () {
    auth.authForm('#firebaseui-auth-container')
  }
}
</script>

<style>
  @import "../../node_modules/firebaseui/dist/firebaseui.css";
</style>
