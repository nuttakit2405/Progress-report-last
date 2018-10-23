<template>
    <div class="auth-success">
      <div class="container">
        <div class="column"></div>
        <div class="notification">
          <div>
            <div v-if="user">
              <div class="level">
                <div class="level-left">
                  <div class="level-item">
                    <img :src="user.photoURL" width="100">
                  </div>
                  <div>
                    <h3>{{user.displayName}}</h3>
                    <p>{{user.email}}</p>
                  </div>
                </div>
                <div class="level-left">
                </div>
              </div>
              <!-- <button @click="logOut">Log out</button> -->
              <!-- Data User -->
              <!-- <pre>{{user}}</pre> -->
            </div>
          </div>
      </div>
        </div>
    </div>
</template>

<script>
import auth from '@/auth'

export default {
  name: 'auth-success',
  computed: {
    user () {
      return this.$store.getters['user/user']
    }
  },
  methods: {
    logOut () {
      auth.logout()
    }
  }
}
</script>

<style scoped>
img {
    border-radius: 50px;
}

h3 {
    margin-bottom: 0;
}

p {
    margin-top: 0;
}

pre {
    text-align: left;
}
</style>
