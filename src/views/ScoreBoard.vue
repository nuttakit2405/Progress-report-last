<template>
  <div class="auth-success">
    <div v-if="user" class="container ">
      <div class="column"></div>
      <div class="columns">
        <div class="column">
            <section class="box" v-if="projectSelected !== null">
              <div class="block" style="display:flex;justify-content: space-between;">
                <b-switch v-model="showBooks"> ดูขอบเขต </b-switch>
                <span class="is-size-5">ความคืบหน้า {{projectSelected.progress}}% | คะแนนรวม {{totalScore | twopoint}}/{{maxScore}}</span>
              </div>
              <b-collapse class="card" :open="false" v-for="(val, ind) in projectSelected.scoreboard" :key="ind">
                <div slot="trigger" slot-scope="props" class="card-header">
                  <div class="card-header-title">
                    <div class="level" style="width: 100%;display: flex; justify-content: space-between;">
                      <div class="level-item" style="flex: none;width: fit-content;">
                        <span style="display:flex; align-items: center">
                            <span class="title is-5">สัปดาห์ที่ {{ind+1}} </span>
                            <!-- <span>&nbsp;| หัวข้อที่ {{ind+1}}</span> -->
                            <span>&nbsp;| วันที่ {{val.startDate | format('DD-MMM-YY')}} ถึง {{val.endDate | format('DD-MMM-YY')}}</span>
                            <span v-if="val.mentorConfirm" class="icon has-text-success"><i class="fas fa-check-square"></i></span>
                        </span>
                      </div>
                      <!-- right -->
                      <div class="level-item" style="flex: none;width: fit-content;">
                        <div style="display: flex; flex-direction: row; width: 50px;">
                          <progress class="progress is-small" :class="[val.mentorConfirm ? 'is-success' : 'is-warning']" :value="val.progress ? val.progress : 0" max="100"></progress>
                        </div>
                        <span>&nbsp;{{val.progress ? val.progress : 0}}%</span>
                        <span>&nbsp;| คะแนนที่ได้ {{calScore(val.score, weekScore) | twopoint}}/{{weekScore | twopoint}}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card-content">
                  <!-- <span class="title is-5" v-if="val.sentTeacher">เปอร์เซ็นความก้าวหน้า</span> -->
                  <!-- <div class="columns" style="align-items: center" v-if="val.sentTeacher">
                    <div class="column"><progress class="progress is-medium" :class="[val.mentorConfirm ? 'is-success' : 'is-warning']" :value="val.progress ? val.progress : 0" max="100"></progress></div>
                    <span class="column" style="flex: none;width: fit-content;">&nbsp;{{val.progress ? val.progress : 0}}%</span>
                  </div> -->
                  <div v-if="val.sentTeacher && profile && profile.userType === 'teacher'" style="margin-bottom: 20px;">
                    <p class="title is-5">ข้อมูลจากนักศึกษา</p>
                    <b-field label="ความก้าวหน้า / ผลงานที่ดำเนินงานมาแล้ว">
                      <b-input disabled type="textarea" v-model="val.textProgress"></b-input>
                    </b-field>
                    <b-field label="ปัญหาที่พบ">
                      <b-input disabled type="textarea" v-model="val.problem"></b-input>
                    </b-field>
                    <b-field label="วิธีแก้ปัญหาที่พบ">
                      <b-input disabled type="textarea" v-model="val.solution"></b-input>
                    </b-field>
                    <hr>
                  </div>
                  <div v-if="(val.mentorConfirm && profile && profile.userType === 'student') ||  (val.mentorConfirm && viewMode === 'subject')" style="margin-bottom: 20px;">
                    <p class="title is-5">ข้อมูลจากอาจารย์ที่ปรึกษา</p>
                    <b-field label="ความเห็นอาจารย์ที่ปรึกษา">
                      <b-input disabled type="textarea" v-model="val.mentorComment"></b-input>
                    </b-field>
                    <p class="title is-6">จัดทำโครงงานได้: <span class="title is-5">{{val.radio == 1 ?'ตรงตามเป้าหมายที่ตั้งไว้' : 'น้อยกว่าเป้าหมาย'}}</span></p>
                    <hr>
                  </div>
                  <div v-if="(val.subjectConfirm && profile && profile.userType === 'student') || (val.mentorConfirm && viewMode === 'mentor')" style="margin-bottom: 20px;">
                    <p class="title is-5">ข้อมูลจากอาจารย์ประจำวิชา</p>
                    <b-field label="ความเห็นอาจารย์ประจำวิชา">
                      <b-input disabled type="textarea" v-model="val.subjectComment"></b-input>
                    </b-field>
                    <hr>
                  </div>
                  <ProgressStudent
                    :weekData="val"
                    :projectKey="projectSelected.key"
                    :week="ind"
                    :progressTotal="projectSelected.progress ? projectSelected.progress : 0"
                    @upload="uploadfile"/>
                  <ProgressMentor
                    :weekData="val"
                    :projectKey="projectSelected.key"
                    :week="ind"
                    @upload="uploadfile"
                    @confirm="confirm(val, projectSelected.key, ind, false, $event)"
                    @confirmCondition="confirm(val, projectSelected.key, ind, true, $event)"/>
                  <ProgressTeacher
                    :weekData="val"
                    :projectKey="projectSelected.key"
                    :week="ind"
                    @upload="uploadfile"/>
                </div>
              </b-collapse>
            </section>
            <div v-else>
              <b-loading v-if="projectId && projectId !== ''" :active="true"></b-loading>
              <span v-else>ยังไม่ได้เลือกโครงงาน</span>
            </div>
        </div>
        <div class="column is-5 " v-if="showBooks == true">
            <section class="box">
              <b-tabs v-model="activeTab">
                  <b-tab-item :visible="showBooks" label="ขอบเขตการทำงาน">
                    <ScalWork/>
                  </b-tab-item>
              </b-tabs>
            </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import auth from '@/auth'
import ScalWork from '@/components/ScalWork'
import ProgressStudent from '@/components/ProgressStudent'
import ProgressMentor from '@/components/ProgressMentor'
import ProgressTeacher from '@/components/ProgressTeacher'

import {mapActions, mapGetters} from 'vuex'
import db from '@/database'
import storage from '@/storage'

export default {
  name: 'Scoreboard',
  props: {
    projectId: {
      type: String
    }
  },
  filters: {
    twopoint: (val) => {
      return val.toFixed(2)
    }
  },
  data () {
    return {
      dropFiles: [],
      radio: '',
      isSwitched: false,
      isSwitchedCustom: 'Yes',
      InputProgress: 0,
      SumProgress: 0,
      activeTab: 0,
      showBooks: false,
      file: null,
      teams: [{
        name: ''
      }],
      maxScore: 20
    }
  },
  computed: {
    ...mapGetters({
      viewMode: 'viewMode',
      user: 'user/user',
      projectSelected: 'projects/projectSelected',
      profile: 'user/profile'
    }),
    showInput () {
      return this.InputProgress
    },
    weekScore () {
      if (this.projectSelected) {
        return this.maxScore / this.projectSelected.scoreboard.length
      }
      return 0
    },
    totalScore () {
      const score = this.projectSelected.scoreboard.reduce((prev, curr) => {
        prev += curr.score
        return prev
      }, 0) / this.projectSelected.scoreboard.length
      return score * this.maxScore / 100
    }
  },
  components: {
    ScalWork,
    ProgressStudent,
    ProgressMentor,
    ProgressTeacher
  },
  methods: {
    ...mapActions({
      selectProject: 'projects/selectProject'
    }),
    logOut () {
      auth.logout()
    },
    deleteDropFile (index) {
      this.dropFiles.splice(index, 1)
    },
    async uploadfile ({files, projectKey, week}) {
      const res = await storage.upload(files.name, files, `/${projectKey}/${week}`)
      console.log(res)
      const data = {
        filename: files.name,
        ref: `/${projectKey}/${week}/${files.name}`,
        time: new Date().toString(),
        username: this.profile
      }
      db.database.ref(`/projects/${projectKey}/scoreboard/${week}/files`).push(data)
    },
    async confirm (weekData, key, index, condition = false, data = {}) {
      const score = !condition ? 100 : 75
      const dataUpdate = {score: score, ...data, mentorConfirm: true}
      await db.database.ref(`projects/${key}/scoreboard/${index}`).update(dataUpdate)

      const progress = data && data.progress !== undefined ? data.progress : weekData.progress
      await db.database.ref(`projects/${key}`).update({progress})

      await this.$swal('เสร็จสิ้น')
    },
    calScore (score = 0, max) {
      return (max * score) / 100
    }
  },
  created () {
    if (this.projectId) {
      this.selectProject(this.projectId)
    }
  }
}
</script>
<style>
.percent{
    margin-right: 20px;
}
.double-down{
    margin-right: 20px;
}
.fieldSize{
    margin-right: 80px;
    margin-left: 80px;
}
.ButtonAddWork{
  display: flex;
  justify-content: flex-end;
}
</style>
