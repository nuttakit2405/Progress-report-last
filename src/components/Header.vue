<template>
    <div class="hero is-info">
        <div class="hero-head container is-fluid">
            <div class="column">
              <nav class="level ">
              <!-- Left side -->
                <div class="level-left">
                  <div class="level-item">
                    <p class="subtitle is-4">
                      <router-link :to="{name: 'Home'}"><strong>Progress Report</strong></router-link>
                    </p>
                  </div>
                </div>
                <!-- Right side -->
                <div class="level-right">
                  <div>
                    <b-dropdown v-if="isLogged">
                      <button class="button" slot="trigger">
                          <span>{{user.email}}</span>
                          <b-icon  icon="caret-down"></b-icon>
                      </button>
                      <b-dropdown-item custom>
                        <b v-if="profile">{{profile.fullName}}</b>
                        <b v-else>ยังไม่ได้กรอกข้อมูลเบื้องต้น</b>
                      </b-dropdown-item>
                      <b-dropdown-item @click="$router.push({name: 'Profile'})">
                        <i class="far fa-user"></i>&nbsp;<span>Profile</span></b-dropdown-item>
                      <hr class="dropdown-divider">
                      <b-dropdown-item @click="$router.push({name: 'Calendar'})">
                        <i class="far fa-calendar-alt"></i>&nbsp;<span>Calendar</span>
                      </b-dropdown-item>
                      <b-dropdown-item v-if="isTeacher" @click="$router.push({name: 'AddProject'})">
                        <i class="far fa-plus-square"></i>&nbsp;<span>Add Project</span>
                      </b-dropdown-item>
                      <b-dropdown-item v-if="isTeacher" @click="$router.push({name: 'ImportStudent'})">
                        <i class="fas fa-file-import"></i>&nbsp;<span>Import Student</span>
                      </b-dropdown-item>
                      <b-dropdown-item v-if="isTeacher" @click="$router.push({name: 'ImportTeacher'})">
                        <i class="fas fa-file-import"></i>&nbsp;<span>Import Teacher</span>
                      </b-dropdown-item>
                      <hr class="dropdown-divider">
                      <b-dropdown-item @click="logout">
                        <i class="fas fa-sign-out-alt"></i>&nbsp;<span>Log out</span>
                      </b-dropdown-item>
                    </b-dropdown>
                  </div>
                  <div>

                  </div>
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
        viewMode: 'viewMode',
        user: 'user/user',
        profile: 'user/profile',
        isLogged: 'user/isLogged'
      }
    ),
    isTeacher () {
      return this.profile && this.profile.userType === 'teacher'
    }
  }
}
</script>
