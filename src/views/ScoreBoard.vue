<template>
  <div class="auth-success">
    <div v-if="user" class="container ">
      <div class="column"></div>
      <!-- <div class="column"></div> -->
      <div class="columns">
        <div class="column">
          <div class="column box">
            <section  v-if="projectSelected !== null">
              <div class="block">
                <b-switch v-model="showBooks"> ดูขอบเขต </b-switch>
                <!-- {{profile.teacherGroup}} -->
              </div>
              <b-collapse class="card" :open="false" v-for="(val, ind) in projectSelected.scoreboard" :key="ind">
                <div slot="trigger" slot-scope="props" class="card-header">
                  <div class="card-header-title">
                    <div class="level" style="width: 100%;display: flex; justify-content: space-between;">
                      <div class="level-item" style="flex: none;width: fit-content;">
                        <span>
                            <span class="title is-5">สัปดาห์ที่ {{ind+1}} </span>
                            <span>หัวข้อที่ {{ind+1}}</span>
                            <span>วันที่ {{val.startDate | format('DD-MMM-YY')}} ถึง {{val.endDate | format('DD-MMM-YY')}}</span>
                        </span>
                      </div>
                      <div class="level-item" style="flex: none;width: fit-content;">
                        <span>{{calScore(val.score, weekScore) | twopoint}}/{{weekScore | twopoint}}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card-content">
                  <ProgressStudent
                    :weekData="val"
                    :projectKey="projectSelected.key"
                    :week="ind"
                    :progressTotal="projectSelected.progress ? projectSelected.progress : 0"
                    @upload="uploadfile"/>
                  <div v-if="val.sentTeacher && profile && profile.userType === 'teacher'" style="margin-bottom: 20px;">
                    <p class="title is-5">ข้อมูลจากนักศึกษา</p>
                    <b-field label="ความก้าวหน้า / ผลงานที่ดำเนินงานมาแล้ว">
                      <b-input disabled type="textarea" v-model="val.textProgress"></b-input>
                    </b-field>
                    <p class="title is-6">คิดเป็นร้อยละ {{val.progress}}%</p>
                    <hr>
                  </div>
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
        </div>
        <div class="column" v-if="showBooks == true">
          <div class="column box">
            <section>
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
      }]
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
      projectSelected: 'projects/projectSelected',
      profile: 'user/profile'
    }),
    showInput () {
      return this.InputProgress
    },
    weekScore () {
      if (this.projectSelected) {
        return 20 / this.projectSelected.scoreboard.length
      }
      return 0
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
