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
                        <b-collapse class="card" :open="false" v-for="ind in 10" :key="ind">
                            <div slot="trigger" slot-scope="props" class="card-header">
                                <div class="card-header-title">
                                    สัปดาห์ที่ {{ind}}
                                </div>
                                <div class="card-header-title">
                                    หัวข้อที่1 {{ind}}
                                </div>
                                <div class="level">
                                    <div class="level-item">55%</div>
                                    <b-field>
                                        <b-upload v-model="dropFiles"
                                            multiple
                                            drag-drop>
                                                <div class="content has-text-centered">
                                                    <b-icon
                                                        icon="upload"
                                                        size="is-large">
                                                    </b-icon>
                                                </div>
                                        </b-upload>
                                    </b-field>
                                </div>
                            </div>
                            <div class="card-content">
                                <div class="content">
                                    รายละเอียดเกี่ยวกับความก้าวหน้าของงาน
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
    },
    data () {
      return {
        dropFiles: []
      }
    }
  },
  methods: {
    logOut () {
      auth.logout()
    },
    deleteDropFile (index) {
      this.dropFiles.splice(index, 1)
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
