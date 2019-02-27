<template >
  <div>
  <div class="hero is-medium is-white styleNavbar">
    <div class="hero-head container is-fluid ">
      <div class="column">
        <nav class="level ">
          <!-- BANNER  -->
          <div class="level-left">
            <div class="level-item">
              <p class="subtitle is-3">
                <router-link :to="{name: 'Home'}">
                  <div style="margin-right: 20px;">
                    <i class="fas fa-graduation-cap fa-1x" style="color:#FFD700"></i>
                    <span class="styleProgress ">Progress </span>
                    <span class="styleReport">Report</span>
                  </div>
                </router-link>
              </p>
            </div>
          </div>

          <!-- MENU -->
            <div
              id="navbarBasicExample"
              class="navbar-menu ">
              <div class="navbar-start styleNav ">
                <a
                  class="navbar-item styleNav "
                  @click="$router.push({name: 'Calendar'})">
                  <i
                    class="far fa-calendar-alt fa-2x"
                    style="color:#87CEFA"
                  ></i>&nbsp;
                  ปฏิทิน
                </a>

                <a
                  class="navbar-item"
                  v-if="profile && profile.userType === 'teacher' && viewMode === 'subject'"
                  @click="$router.push({name: 'AddProject'})">
                  <i
                    class="far fa-plus-square fa-2x"
                    style="color:#FF6347"
                  ></i>&nbsp;
                  เพิ่มโครงงาน
                </a>

                <div class="navbar-item has-dropdown is-hoverable">
                  <a
                    class="navbar-link"
                    v-if="profile && profile.userType === 'teacher' && viewMode === 'subject'">
                    เพิ่มข้อมูล
                  </a>

                  <div class="navbar-dropdown">
                    <a
                      class="navbar-item"
                      @click="$router.push({name: 'ImportStudent'})">
                      <i
                        class="fas fa-file-import fa-1x"
                        style="color:#48D1CC"
                      ></i>&nbsp;
                      เพิ่มข้อมูลนักศึกษา
                    </a>
                    <a
                      class="navbar-item"
                      @click="$router.push({name: 'ImportTeacher'})">
                      <i
                        class="fas fa-file-import fa-1x"
                        style="color:#48D1CC"
                      ></i>&nbsp;
                      เพิ่มข้อมูลอาจารย์
                    </a>
                  </div>
                </div>
              </div>
            </div>

          <!-- Right side -->
          <div class="level-right">
            <div class="dp-none-mobile"
              style="margin-right: 40px;"
              v-if="isLogged">
              <b>{{stringMode}}</b>
            </div>
            <div>
              <b-dropdown v-if="isLogged">
                <button
                  class="button"
                  slot="trigger">
                  <span>{{user.email}}</span>
                  <b-icon icon="caret-down"></b-icon>
                </button>
                <b-dropdown-item custom>
                  <b v-if="profile">{{profile.fullName}}</b>
                  <b v-else>ยังไม่ได้กรอกข้อมูลเบื้องต้น</b>
                </b-dropdown-item>
                <b-dropdown-item @click="$router.push({name: 'Profile'})">
                  <i class="far fa-user"></i>&nbsp;<span>โปรไฟล์</span></b-dropdown-item>
                <hr
                  class="dropdown-divider"
                  v-if="isTeacher"
                  custom>
                <!-- <b-dropdown-item @click="$router.push({name: 'Calendar'})">
                        <i class="far fa-calendar-alt"></i>&nbsp;<span>ปฏิทิน</span>
                      </b-dropdown-item> -->
                <b-dropdown-item
                  v-if="isTeacher"
                  custom>
                  โหมดอาจารย์: <b>{{stringMode}}</b>
                </b-dropdown-item>
                <b-dropdown-item
                  v-if="isTeacher && profile.teacherGroup.length > 1"
                  @click="toggleMode">
                  <i class="fas fa-toggle-off"></i>&nbsp;<span>สลับโหมด</span>
                </b-dropdown-item>
                <!-- <b-dropdown-item v-if="profile && profile.userType === 'teacher' && viewMode === 'subject'" @click="$router.push({name: 'AddProject'})">
                        <i class="far fa-plus-square"></i>&nbsp;<span>เพิ่มโครงงาน</span>
                      </b-dropdown-item>
                      <b-dropdown-item v-if="isTeacher" @click="$router.push({name: 'ImportStudent'})">
                        <i class="fas fa-file-import"></i>&nbsp;<span>เพิ่มข้อมูลนักศึกษา</span>
                      </b-dropdown-item>
                      <b-dropdown-item v-if="isTeacher" @click="$router.push({name: 'ImportTeacher'})">
                        <i class="fas fa-file-import"></i>&nbsp;<span>เพิ่มข้อมูลอาจารย์</span>
                      </b-dropdown-item> -->
                <hr class="dropdown-divider">
                <b-dropdown-item @click="logout">
                  <i class="fas fa-sign-out-alt"></i>&nbsp;<span>ออกจากระบบ</span>
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
  <div class="column"></div>
  </div>
</template>

<script>
import auth from '@/auth'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {}
  },
  methods: {
    ...mapActions({
      setViewMode: 'setViewMode'
    }),
    logout () {
      auth.logout()
      this.$router.push({ name: 'Home' })
    },
    toggleMode () {
      const newMode = this.viewMode === 'subject' ? 'mentor' : 'subject'
      this.setViewMode(newMode)
    }
  },
  computed: {
    ...mapGetters({
      viewMode: 'viewMode',
      user: 'user/user',
      profile: 'user/profile',
      isLogged: 'user/isLogged'
    }),
    isTeacher () {
      return this.profile && this.profile.userType === 'teacher'
    },
    stringMode () {
      const mode = {
        mentor: 'อาจารย์ที่ปรึกษา',
        subject: 'อาจารย์ประจำวิชา'
      }
      return mode[this.viewMode]
    }
  }
}
</script>

<style>
.styleProgress {
  font-family: "Staatliches", serif;
  color: black;
  text-align: center;
}
.styleReport {
  font-family: "Staatliches", serif;
  color: #ffd700;
  text-align: center;
}
.styleNav {
  font-family: "Kanit", sans-serif;
  font-weight: bold;
}
.styleNavbar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
}
</style>
