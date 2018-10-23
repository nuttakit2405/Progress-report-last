<template>
    <div class="hero is-info">
        <div class="hero-head container is-fluid">
            <div class="column"></div>
            <nav class="level ">
              <!-- Left side -->
              <div class="level-left">
                <div class="level-item">
                  <p class="subtitle is-5">
                    <a href="/"><strong>Progress Project</strong></a>
                  </p>
                </div>
              </div>
              <!-- Right side -->
              <div class="level-right">
                 <b-dropdown v-if="isLogged">
                    <button class="button is-primary" slot="trigger">
                        <span>{{user.email}}</span>
                        <b-icon  icon="caret-down"></b-icon>
                    </button>

                    <b-dropdown-item>Action</b-dropdown-item>
                    <b-dropdown-item>Another action</b-dropdown-item>
                    <b-dropdown-item @click="logout">Log out</b-dropdown-item>
                </b-dropdown>

                <a v-else href="/#/Login" class="button is-primary">Login</a>
              </div>
            </nav>
        <div height="5px"></div>
        </div>
    </div>
</template>

<script>
import auth from '@/auth'
import {mapGetters} from 'vuex'
export default {
  data () {
    return {}
  },
  methods: {
    logout () {
      auth.logout()
    }
  },
  computed: {
    ...mapGetters(
      {
        user: 'user/user',
        isLogged: 'user/isLogged'
      }
    )
  }
}
</script>
