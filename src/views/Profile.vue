<template>
  <div class="container">
    <div class="column">
      <div class="columns">
        <div class="column">
          <div>
            <div v-if="loading || fetchProfile">
              <section>
                <b-notification :closable="false">
                  <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading>
                </b-notification>
              </section>
            </div>
            <div v-else class="column box hero">
              <div v-if="isLogged && hasProfile">
                <div class="level">
                  <div class="level-item has-text-centered">
                    <div>
                      <img :src="user.photoURL" width="100">
                      <p class="is-size-5">{{profile.fullName}}</p>
                      <p class="is-size-5">{{user.email}}</p>
                    </div>
                  </div>
                </div>
                <div class="level-item has-text-centered">
                  <span class="title is-5">ประเภทผู้ใช้งาน:&nbsp;</span>
                  <span class="is-size-5">{{roles[profile.userType]}}</span>
                </div>
                <div class="level-item" v-if="profile && profile.userType === 'teacher'">
                  <p class="title is-5">สิทธิ์ของผู้ใช้:&nbsp;</p>
                  <p class="is-size-5">{{profile.teacherGroup.map(group => roles[group]).join(", ")}}</p>
                </div>
                <div class="column"></div>
                <div class="level-item " v-if="profile && profile.userType === 'student'">
                  <b-field label="ความก้าวหน้าของงาน" v-if="profile.myProject">
                    <table class="table">
                      <tr :key="project.key" v-if="!project.deleted"  v-for="project in findProjectWithIds(profile.myProject)">
                        <td>{{project.thaiProjectName}}</td>
                        <td><progress class="progess is-medium" :value="project.progress ? project.progress : 0" max="100"></progress>&nbsp;{{project.progress ? project.progress : 0}}%</td>
                      </tr>
                    </table>
                  </b-field>
                  <div v-else>
                    <b-field label="เพิ่มเป็นโครงงานของฉัน">
                        <ul :key="project.key"  v-for="project in findMyProject(this.profile.sid)">
                          <li>โครงงาน{{project.thaiProjectName}}</li>
                        </ul>
                    </b-field>
                    <button class="button is-success" @click="addToMyProject()">เพิ่มข้อมูลผู้ใช้ทั้งหมดเข้าโครงงาน</button>
                  </div>
                </div>
                <!-- <div class="column level-item has-text-centered">
                  <button class="button">ไปยังหน้าปฏิทิน</button>
                </div> -->
                <!-- <button @click="logOut">Log out</button> -->
                <!-- Data User -->
                <!-- <pre>{{user}}</pre> -->
              </div>
              <div class="has-text-centered" v-else-if="isLogged && !hasProfile">
                  <span class="title is-4">ตั้งค่าข้อมูลส่วนตัว</span>
                  <!-- {{hasProfile}} -->
                  <div class="columns is-centered has-text-left" style="margin-top: 20px">
                    <div class="column" style="flex: none; width: fit-content;">
                        <img :src="user.photoURL" width="100" style="border-radius: 50%; margin-top: 30px">
                    </div>
                    <div class="column is-4">
                      <b-field grouped>
                        <b-field label="ชื่อ-นามสกุล" expanded>
                          <b-input v-model="fullName" placeholder="ชื่อ-นามสกุล"></b-input>
                        </b-field>
                        <b-field label="ประเภทผู้ใช้">
                          <b-select placeholder="เลือกประเภทผู้ใช้" v-model="userType">
                              <option value="student">นักศึกษา</option>
                              <option value="teacher">อาจารย์</option>
                          </b-select>
                        </b-field>
                      </b-field>
                      <b-field v-if="userType === 'student'" label="รหัสนักศึกษา">
                        <b-input v-model="sid" placeholder="รหัสนักศึกษา"></b-input>
                      </b-field>
                      <b-field v-if="userType === 'teacher'" label="ประเภทอาจารย์">
                        <section>
                          <div class="block">
                              <b-checkbox v-model="teacherGroup"
                                  native-value="subject">
                                  อาจารย์ประจำวิชา
                              </b-checkbox>
                              <b-checkbox v-model="teacherGroup"
                                  native-value="mentor">
                                  อาจารย์ที่ปรึกษา
                              </b-checkbox>
                          </div>
                        </section>
                      </b-field>
                    </div>
                  </div>
                  <div class="columns is-centered" style="margin-top: 10px;">
                    <div class="column" style="flex: none; width: fit-content;" >
                      <button class="button is-info" @click="saveProfile()">
                        <!-- @click="saveProfile()" -->
                        <b-icon icon="edit"></b-icon>
                        <span>บันทึก</span>
                      </button>
                      <button v-if="edit" class="button">
                        <b-icon icon="times"></b-icon>
                        <span>ยกเลิก</span>
                      </button>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import auth from '@/auth'
import db from '@/database'
import {checkFITMemail} from '@/utils'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'Profile',
  data () {
    return {
      User: '',
      fullName: '',
      sid: '',
      userType: null,
      teacherGroup: [],
      edit: false,
      fetchProfile: false,
      isLoading: true,
      isFullPage: true,
      roles: {
        teacher: 'อาจารย์',
        student: 'นักศึกษา',
        subject: 'อาจารย์ประจำวิชา',
        mentor: 'อาจารย์ที่ปรึกษา'
      }
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
      isLogged: 'user/isLogged',
      hasProfile: 'user/hasProfile',
      profile: 'user/profile',
      loading: 'user/loading',
      projects: 'projects/projects'
    }),
    projectsWithId () {
      return Object.keys(this.projects).map(key => {
        return {
          key,
          ...this.projects[key]
        }
      })
    }
  },
  watch: {
    user (user) {
      this.initProfile(user)
    }
  },
  created () {
    this.initProfile(this.user)
    this.getProjects()
  },
  methods: {
    ...mapActions({
      setProfile: 'user/setProfile',
      getProjects: 'projects/getProjects'
    }),
    stringUserType (type) {
      return type === 'teacher' ? 'อาจารย์' : 'นักศึกษา'
    },
    logOut () {
      auth.logout()
    },
    EditUser () {
      this.User = ''
    },
    async initProfile (user) {
      if (user != null) {
        this.fetchProfile = await true
        const val = this.profile
        if (val === null) {
          this.fullName = user.displayName
          const info = checkFITMemail(user.email)
          if (info.isFITM) {
            this.userType = info.userType
            this.sid = info.sid
          }
        }
        this.fetchProfile = await false
      }
    },
    findProjectWithIds (ids) {
      return this.projectsWithId.filter(project => ids.findIndex(p => p === project.key) !== -1)
    },
    findMyProject (sid) {
      return this.projectsWithId.filter(project => !project.deleted && project.teams.some(member => member.id === sid))
    },
    async addToMyProject () {
      const myProject = this.findMyProject(this.profile.sid).map(p => p.key)
      const {value} = await this.$swal('ยืนยันการเพิ่มเป็นโครงงานของฉัน')
      if (value) {
        await db.database.ref('users').child(this.user.uid).update({myProject})
      }
    },
    async saveProfile () {
      const profileData = {
        fullName: this.fullName,
        userType: this.userType
      }
      if (this.userType === 'student') {
        profileData['sid'] = this.sid
        profileData['myProject'] = this.findMyProject(this.sid).map(p => p.key)
      } else if (this.userType === 'teacher') {
        profileData['teacherGroup'] = this.teacherGroup
        profileData['email'] = this.user.email
      }
      await db.database.ref('users').child(this.user.uid).set(profileData)
      await this.setProfile(this.user.uid)
    },
    openLoading () {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, 10 * 1000)
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
