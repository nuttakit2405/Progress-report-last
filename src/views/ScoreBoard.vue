<template>
    <div class="auth-success">
        <div v-if="user">
            <!-- <h1>Hello USER!</h1>
            <img :src="user.photoURL" width="100"> <br>
            <h3>{{user.displayName}}</h3>
            <p>{{user.email}}</p>
            <button @click="logOut">Log out</button>
            <br><br><br> -->
            <!-- Data User -->
            <!-- <pre>{{user}}</pre> -->
            <div class="container">
                <div class="column"></div>
                <div class="notification">

                    <section>
                        <div>11111</div>
                        <b-collapse class="card" :open="false" v-for="index in 10" :key="index">
                            <div slot="trigger" slot-scope="props" class="card-header">
                                <p class="card-header-title">
                                    สัปดาห์ที่ {{index}}
                                </p>
                                <a class="card-header-icon">
                                    <b-icon
                                        :icon="props.open ? 'menu-down' : 'menu-up'">
                                    </b-icon>
                                </a>
                            </div>
                            <div class="card-content">
                                <div class="content">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
                                    <a>#buefy</a>.
                                </div>
                            </div>
                            <footer class="card-footer">
                                <a class="card-footer-item">Save</a>
                                <a class="card-footer-item">Edit</a>
                                <!-- <a class="card-footer-item">Delete</a> -->
                            </footer>
                        </b-collapse>
                    </section>

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
