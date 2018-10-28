<template>
    <div class="hero is-info">
        <div class="hero-head container is-fluid">
            <div class="column">
              <nav class="level ">
              <!-- Left side -->
                <div class="level-left">
                  <div class="level-item">
                    <p class="subtitle is-5">
                      <router-link :to="{name: 'Home'}"><strong>Progress Project</strong></router-link>
                    </p>
                  </div>
                </div>
                <!-- Right side -->
                <div class="level-right">
                  <b-dropdown v-if="isLogged">
                      <button class="button" slot="trigger">
                          <span>{{user.email}}</span>
                          <b-icon  icon="caret-down"></b-icon>
                      </button>
                      <b-dropdown-item @click="$router.push({name: 'Dashboard'})">Profile</b-dropdown-item>
                      <b-dropdown-item @click="$router.push({name: 'AddStudent'})">addstudent</b-dropdown-item>
                      <hr class="dropdown-divider">
                      <b-dropdown-item @click="$router.push({name: 'Calendar'})">Calendar</b-dropdown-item>
                      <b-dropdown-item @click="$router.push({name: 'ScoreBoard'})">Score Board</b-dropdown-item>
                      <b-dropdown-item @click="$router.push({name: 'Group'})">Group</b-dropdown-item>
                      <hr class="dropdown-divider">
                      <b-dropdown-item @click="logout">Log out</b-dropdown-item>
                  </b-dropdown>
                  <router-link v-else :to="{name: 'Login'}" class="button ">Login</router-link>
                </div>
              </nav>
            </div>
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
      this.$router.push('/')
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
