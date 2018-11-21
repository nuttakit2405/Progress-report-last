<template>
<div id="auth">
  <div class="container">
    <div class="column">
      <div class="columns is-mobile is-centered">
        <div class="column">
          <div class="column is-4 is-offset-4 box hero is-light">
            <img src="/static/img/login.png">
            <span style="margin: 10px" class="title is-4 has-text-centered">เข้าสู่ระบบ</span>
            <div id="firebaseui-auth-container"></div>
          </div>
        </div>
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
