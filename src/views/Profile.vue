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
                <div class="level-item has-text-centered" v-if="profile && profile.userType === 'student'">
                  <!-- <p class="title is-5">ความก้าวหน้าของงาน:&nbsp;</p>
                  <p class="is-size-5">55%</p> -->
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
      loading: 'user/loading'
    })
  },
  watch: {
    user (user) {
      this.initProfile(user)
    }
  },
  created () {
    this.initProfile(this.user)
  },
  methods: {
    ...mapActions({
      setProfile: 'user/setProfile'
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
    checkFITMemail (mail) {
      const regex = /@fitm.kmutnb.ac.th$/g
      if (regex.test(mail)) {
        const stdReg = /^(\d{13})/g
        const sidReg = /^(\d{13})@fitm.kmutnb.ac.th/g
        let userType = 'teacher'
        let sid = ''
        if (stdReg.test(mail)) {
          userType = 'student'
          const data = sidReg.exec(mail)
          sid = data[1]
        }
        return {
          isFITM: true,
          userType,
          sid
        }
      }
      return {
        isFITM: false
      }
    },
    async initProfile (user) {
      if (user != null) {
        this.fetchProfile = await true
        const val = this.profile
        if (val === null) {
          this.fullName = user.displayName
          const info = this.checkFITMemail(user.email)
          if (info.isFITM) {
            this.userType = info.userType
            this.sid = info.sid
          }
        }
        this.fetchProfile = await false
      }
    },
    async saveProfile () {
      const profileData = {
        fullName: this.fullName,
        userType: this.userType
      }
      if (this.userType === 'student') {
        profileData['sid'] = this.sid
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
