<template>
<div id="auth" class="background">
  <div class="container">
    <div class="column">
      <div class="columns is-mobile is-centered">
        <div class="column">
          <div class="column">
            <!-- <img src="/static/img/login.png"> -->
            <span class="Title">Progress Report System </span> <br>
             <span class="Title">for Special Project</span>
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

<style scoped>
  .background{
  background-image: url("/static/img/backgroundLogin.jpg");
  width: 100%;
  height: 100vh;
  }
  .Title{
    font-family: 'Staatliches', serif;
    font-size: 50pt;
    display: flex;
    justify-content: center;
    margin-top: 30px;
     color: goldenrod;
  }
</style>

<style>
 @import "../../node_modules/firebaseui/dist/firebaseui.css";
</style>
