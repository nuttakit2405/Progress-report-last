<template>
    <div class= "container">
        <div class="column"></div>
        <div class="column"></div>
        <div class="columns" v-if="checkTeacherSubject()">
            <div class="column is-8 is-offset-2">
                <div class="column hero is-medium is-white">
                    <div class="column is-10 is-offset-1">
                        <form action="javascript:void(0);" @submit="confirmAddProject">
                          <section>
                              <div class="box">
                                  <b-field horizontal label="ชื่อโครงงาน">
                                      <b-input name="ProjectName1" placeholder="ภาษาไทย" v-model="thaiProjectName" expanded  required></b-input>
                                  </b-field>
                                  <b-field horizontal>
                                      <b-input name="ProjectName2" placeholder="ภาษาอังกฤษ" v-model="engProjectName" expanded  required></b-input>
                                  </b-field> <br>

                                  <b-field horizontal label="กรณีศึกษา">
                                      <b-input name="CaseStudy1" placeholder="ภาษาไทย" v-model="thaiCaseStudy" expanded></b-input>
                                  </b-field>
                                  <b-field horizontal>
                                      <b-input name="CaseStudy2" placeholder="ภาษาอังกฤษ" v-model="engCaseStudy" expanded></b-input>
                                  </b-field> <br>
                              </div>
                              <!-- <div class= "aa" v-for="(item, index) in items" > -->
                              <div v-for="(n, i) in teams" :key="i" class="box">
                                  <b-field horizontal :label="'ชื่อ-นามสกุล'+(i+1)">
                                      <b-input v-model="n.name" name="name" placeholder="ชื่อ" expanded  required></b-input>
                                      <b-input v-model="n.lastname" name="lastname" placeholder="นามสกุล" expanded required></b-input>
                                  </b-field>
                                  <b-field horizontal label="รหัสนักศึกษา">
                                      <b-input v-model="n.id" name="id" type="number" maxlength="13" minlength="13" min="0" placeholder="รหัสนักศึกษา 13 หลัก" expanded  required></b-input>
                                  </b-field>
                                  <div class="level-item has-text-centered">
                                  <button v-if="i > 0" :v-model="statusDelteam" @click="Delteam(i)" class="button is-info">
                                      <b-icon icon="times" size="is-small"></b-icon>
                                  </button>
                                  </div>
                              </div>
                              <b-field v-if="teams.length < 3"  class="buttonAddteam">
                                  <button @click="Addteam" class ="button is-dark">
                                      <b-icon icon="plus" size="is-small"></b-icon>
                                  </button>
                              </b-field>
                              <div class="box">
                                  <b-field horizontal label="ชื่อที่ปรึกษา">
                                      <b-select placeholder="เลือกอาจารย์ที่ปรึกษา" v-model="mentor" required>
                                          <option :key="teacher.initials" v-for="teacher in teacherData" :value="teacher.initials">{{teacher.position}}{{teacher.name | removeTitle}} {{teacher.lastname}}</option>
                                      </b-select>
                                  </b-field>
                                  <b-field horizontal label="ที่ปรึกษาร่วม">
                                      <b-input name="mentor2" placeholder="ชื่อ-นามสกุล อาจารย์ที่ปรึกษาร่วม" v-model="coOpMentor" expanded></b-input>
                                  </b-field>
                                  <b-field horizontal label="หน่วยงาน">
                                      <b-input name="dep" placeholder="ชื่อสถานประกอบการ/หน่วยงาน" v-model="department" expanded></b-input>
                                  </b-field>
                                  <b-field horizontal label="ภาคการศึกษา"  required>
                                      <b-field class style="width:150px;">
                                      <b-select expanded placeholder="เลือกภาคเรียน" v-model="term">
                                          <option value="1">1</option>
                                          <option value="2">2</option>
                                          <option value="3">3</option>
                                      </b-select>
                                      </b-field>
                                      <b-field class style="margin-right:150px; width:100;"  required>
                                          <b-input name="year" v-model="year" type= "number" min="2500" max="3000" minlength="4" maxlength="4" placeholder="ปีการศึกษา" expanded></b-input>
                                      </b-field>
                                  </b-field>

                                  <!-- <div class="field" style="margin-left:105px;"> -->
                                    <b-field horizontal>
                                      <b-radio v-model="projectSize"
                                          native-value="1">
                                          โครงงาน 1 ภาคการศึกษา
                                      </b-radio>
                                      <b-radio v-model="projectSize"
                                          native-value="2">
                                          โครงงาน 2 ภาคการศึกษา
                                      </b-radio>
                                      </b-field>
                                  <!-- </div> -->
                                  <b-field label="วันเริ่มทำ" horizontal required>
                                    <b-datepicker
                                        v-model="startProject"
                                        :date-formatter="dateFormat"
                                        placeholder="วันเริ่มทำโครงงานพิเศษ"
                                        icon="calendar-alt" style="width:200px;">
                                    </b-datepicker>
                                  </b-field>

                                  <b-field label="วันยื่นสอบ" horizontal required>
                                    <b-datepicker
                                        v-model="deadlineProject"
                                        :date-formatter="dateFormat"
                                        placeholder="เลือกวันยื่นสอบ"
                                        icon="calendar-alt" style="width:200px;">
                                    </b-datepicker>
                                  </b-field>
                              </div>
                              <center>
                                  <button type="submit" class="button is-success">ยืนยัน</button>
                                  <button class="button is-danger" @click="$router.push({name: 'Home'})">ยกเลิก</button>
                              </center>
                          </section>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="columns is-centered" v-else>
            <span class="is-size-4 has-text-danger">ต้องมีสิทธิ์เป็นอาจารย์ประจำวิชาเท่านั้น</span>
        </div>
    </div>
</template>

<script>
import db from '@/database'
import {mapGetters} from 'vuex'

export default {
  props: {
    projectId: {
      type: String
    }
  },
  data () {
    return {
      thaiProjectName: '',
      engProjectName: '',
      thaiCaseStudy: '',
      engCaseStudy: '',
      teams: [{
        name: '',
        lastname: '',
        id: ''
      }],
      mentor: null,
      coOpMentor: '',
      department: '',
      term: '',
      year: '',
      projectSize: '',
      startProject: new Date(),
      deadlineProject: new Date(),
      statusDelteam: true,
      editMode: false,
      copyMode: false,
      teacherData: null,
      scoreboard: null
    }
  },
  methods: {
    checkTeacherSubject () {
      return this.profile && this.profile.teacherGroup && this.profile.teacherGroup.some(g => g === 'subject')
    },
    async Addteam () {
      this.teams.push({
        name: '',
        lastname: '',
        id: ''
      })
    },
    Delteam (i) {
      this.teams.splice(i, 1)
    },
    dateFormat (date) {
      return this.$dayjs(date).format('DD-MMM-YYYY')
    },
    async confirmAddProject (e) {
      const startWeek = this.$dayjs(this.startProject)
      const endWeek = this.$dayjs(this.deadlineProject)
      const amountWeeks = endWeek.diff(startWeek, 'weeks') + 1

      const scoreboard = new Array(amountWeeks).fill(null).map((val, i) => {
        return {
          startDate: i === 0 ? startWeek.toString() : startWeek.add(i, 'weeks').startOf('weeks').add(1, 'days').toString(),
          endDate: i === amountWeeks - 1 ? endWeek.toString() : startWeek.add(i, 'weeks').endOf('weeks').add(1, 'days').toString(),
          score: 0
        }
      })

      const data = {
        thaiProjectName: this.thaiProjectName,
        engProjectName: this.engProjectName,
        thaiCaseStudy: this.thaiCaseStudy,
        engCaseStudy: this.engCaseStudy,
        teams: this.teams,
        mentor: this.teacherData[this.mentor],
        coOpMentor: this.coOpMentor,
        department: this.department,
        term: this.term,
        year: this.year,
        projectSize: this.projectSize,
        startProject: this.startProject.toString(),
        deadlineProject: this.deadlineProject.toString()
      }

      //   await this.$swal('เสร็จสิ้น')
      const result = await this.$swal({
        title: 'ยืนยันในการกรอกข้อมูลนี้หรือไม่?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: 'hsl(141, 71%, 48%)',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
      })

      if (result.value) {
        if (this.editMode) {
          const editScoreBoard = scoreboard.map((data, index) => {
            if (this.scoreboard[index]) {
              return {
                ...this.scoreboard[index],
                startDate: data.startDate,
                endDate: data.endDate
              }
            }
            return data
          })
          data['scoreboard'] = editScoreBoard
          await db.database.ref(`/projects/${this.projectId}`).update(data)
        } else {
          data['scoreboard'] = scoreboard
          data['progress'] = 0
          const { key } = await db.database.ref('/projects').push(data)
          Object.values(this.allUsers).filter(user => user.userType === 'student')
            .forEach(user => {
              data.teams.forEach(member => {
                if (member.id === user.sid) {
                  let userUpdate = user
                  let update = false
                  if (user.myProject && user.myProject.length !== 0) {
                    userUpdate.myProject.push(key)
                    update = true
                  } else {
                    userUpdate.myProject = [key]
                    update = true
                  }

                  if (update) {
                    db.database.ref(`/users/${userUpdate.key}`).update({myProject: userUpdate.myProject})
                  }
                }
              })
            })
        }
        await this.$swal({
          type: 'success',
          title: 'การกรอกข้อมูลเสร็จสิ้น',
          showConfirmButton: false,
          timer: 1500,
          toast: true,
          position: 'top'
        })
        await this.$router.push({name: 'Home'})
      }
      return false
    },
    initDataFormDB (val) {
      this.thaiProjectName = val.thaiProjectName
      this.engProjectName = val.engProjectName
      this.thaiCaseStudy = val.thaiCaseStudy
      this.engCaseStudy = val.engCaseStudy
      this.teams = val.teams ? val.teams : []
      this.mentor = val.mentor ? val.mentor.initials : null
      this.coOpMentor = val.coOpMentor
      this.department = val.department
      this.projectSize = val.projectSize
      this.term = val.term
      this.year = val.year
      if (this.copyMode) {
        this.term = +val.term + 1
        if (this.term === 4) {
          this.term = 1
          this.year = +val.year + 1
        }
      }
      if (!this.copyMode) {
        this.scoreboard = val.scoreboard
        this.deadlineProject = new Date(val.deadlineProject)
        this.startProject = new Date(val.startProject)
      }
    },
    getTeacherData () {
      db.database.ref('teachers').once('value', snap => {
        const data = snap.val()
        if (data !== null) {
          this.teacherData = data
        }
      })
    }
  },
  computed: {
    ...mapGetters(
      {
        user: 'user/user',
        isLogged: 'user/isLogged',
        profile: 'user/profile',
        allUsers: 'user/allUsers'
      }
    )
  },
  created () {
    this.getTeacherData()
    if (this.$route.name === 'EditProject') {
      this.editMode = true
      db.database.ref(`projects/${this.projectId}`).once('value', snap => {
        const data = snap.val()
        if (data) {
          this.initDataFormDB(data)
        }
      })
    } else if (this.$route.name === 'CopyProject') {
      this.copyMode = true
      db.database.ref(`projects/${this.projectId}`).once('value', snap => {
        const data = snap.val()
        if (data) {
          this.initDataFormDB(data)
        }
      })
    }
  }
}
</script>

<style>
.layout{
  padding-top: 30px;
  margin: auto;
  width:20cm;
 }
.buttonAddteam{
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>
