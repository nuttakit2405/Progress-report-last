<template>
<div id="auth" style="margin-top: 30px;">
  <div class="container">
    <div class="columns is-mobile is-centered">
      <div class="column is-3 hero is-light">
        <span style="margin: 10px" class="title is-4 has-text-centered">เข้าสู่ระบบ</span>
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
