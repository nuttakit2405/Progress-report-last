<template>
    <div class="auth-success">
      <div class="container ">
        <div class="column"></div>
        <div class="notification">
          <div>
            <div v-if="user">
              <div class="level">
                <div class="level-item has-text-centered">
                  <div>
                    <img :src="user.photoURL" width="100">
                    <h3>{{user.displayName}}</h3>
                    <p>{{user.email}}</p>
                  </div>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <p class="title is-5">ประเภทผู้ใช้งาน: </p>
                <b-field v-if="User == ''">
                  <b-select placeholder ="Please Select" v-model="User">
                      <option value="User1">อาจารย์</option>
                      <option value="User2">นักศึกษา</option>
                  </b-select>
              </b-field>
              <p class="title" v-else-if="User == 'User1'">{{showpow}}</p>
              <p class="title" v-else-if="User == 'User2'">{{showpow}}</p>
              <button class="button" @click="EditUser()">X</button>
              </div>
              <div class="level-item has-text-centered">
                <p class="title is-5">ความก้าวหน้าของงาน: </p>
                <p>55%</p>
              </div>
              <div class="level-item has-text-centered">
                <button class="button">ไปยังหน้าปฏิทิน</button>
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
  data () {
    return {
      User: ''
    }
  },
  computed: {
    user () {
      return this.$store.getters['user/user']
    },
    showpow () {
      return this.User == 'User1' ? 'อาจารย์' : 'นักศึกษา'
    }
  },
  methods: {
    logOut () {
      auth.logout()
    },
    EditUser () {
      this.User = ''
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
