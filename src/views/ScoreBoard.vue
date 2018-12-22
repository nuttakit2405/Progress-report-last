<template>
  <div class="auth-success">
    <div v-if="user" class="container ">
      <div class="column"></div>
      <div class="columns">
        <div class="column">
            <section class="box" v-if="projectSelected !== null">
              <div class="block" style="display:flex;justify-content: space-between; align-items: flex-end;">
                <b-switch v-model="showBooks"> ดูขอบเขต </b-switch>
                <div style="display: flex; flex-direction: column;align-items: flex-end;">
                  <div style="margin-bottom: 10px;" v-if="allMentorConfirm && profile && profile.userType == 'teacher' && viewMode === 'mentor'">
                    <span class="title is-6" v-if="projectSelected.approveSpecialProject == undefined">อนุมัติให้นักศึกษามีสิทธิ์ยื่นสอบ 100 เปอร์เซนต์</span>
                    <div style="display: flex; justify-content: space-around; width: 100%; margin-top: 10px;" v-if="projectSelected.approveSpecialProject == undefined">
                      <button class="button is-success" v-if="+projectSelected.progress === 100" @click="approveSpecialProject(true)">อนุมัติ</button>
                      <button class="button is-danger" v-else @click="approveSpecialProject(false)">ไม่อนุมัติ</button>
                    </div>
                    <div style="display: flex; justify-content: space-around; width: 100%; margin-top: 10px;" v-else>
                      <button disabled class="button is-success" v-if="projectSelected.approveSpecialProject" >อนุมัติให้นักศึกษามีสิทธิ์ยื่นสอบ 100 เปอร์เซนต์แล้ว</button>
                      <button disabled class="button is-danger" v-else>ไม่อนุมัติให้นักศึกษามีสิทธิ์ยื่นสอบ 100 เปอร์เซนต์</button>
                    </div>
                  </div>
                  <div style="margin-bottom: 10px;" v-if="projectSelected.approveSpecialProject !== undefined && profile && profile.userType == 'teacher' && viewMode === 'subject'">
                    <button class="button" disabled>{{projectSelected.approveSpecialProject ? 'นักศึกษามีสิทธิ์ยื่นสอบโครงงานพิเศษ' : 'นักศึกษาไม่มีสิทธิ์ยื่นสอบโครงงานพิเศษ'}}</button>
                  </div>
                  <div style="margin-bottom: 10px;" v-if="projectSelected.approveSpecialProject !== undefined && profile && profile.userType == 'student'">
                    <span class="title is-6">{{projectSelected.approveSpecialProject ? 'นักศึกษามีสิทธิ์ยื่นสอบโครงงานพิเศษ' : 'นักศึกษาไม่มีสิทธิ์ยื่นสอบโครงงานพิเศษ'}}</span>
                    <div style="display: flex; justify-content: space-around; width: 100%; margin-top: 10px;">
                      <button class="button is-primary" v-if="projectSelected.approveSpecialProject" @click="address(projectSelected)">พิมพ์ใบแบบขอสอบโครงงานพิเศษ</button>
                      <button class="button is-danger" disabled v-else>ไม่สามารถยื่นสอบได้</button>
                    </div>
                  </div>
                  <span class="is-size-5">ความคืบหน้า {{projectSelected.progress}}% | คะแนนรวม {{totalScore | twopoint}}/{{maxScore}}</span>
                </div>
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

                              <span v-if="val.mentorConfirm" class="icon has-text-success" title="อาจารย์ที่ปรึกษารับทราบแล้ว"><i class="fas fa-check-square"></i></span>
                              <span v-if="val.subjectConfirm" class="icon has-text-info" title="อาจารย์ประจำวิชารับทราบแล้ว"><i class="fas fa-check-square"></i></span>

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
                    <TodosApp/>
                  </b-tab-item>
              </b-tabs>
            </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import TodosApp from '@/components/TodosApp'
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
    allMentorConfirm () {
      return this.projectSelected.scoreboard.every(week => week.mentorConfirm)
    },
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
    TodosApp,
    ProgressStudent,
    ProgressMentor,
    ProgressTeacher
  },
  methods: {
    ...mapActions({
      selectProject: 'projects/selectProject'
    }),
    async approveSpecialProject (approve) {
      const message = 'อนุมัติให้นักศึกษามีสิทธิ์สอบ 100 เปอร์เซนต์'
      const swalMessage = approve ? message : 'ไม่' + message
      const { value } = await this.$swal({
        text: swalMessage,
        type: approve ? 'success' : 'error',
        confirmButtonText: 'ยืนยัน'
      })
      if (value) {
        db.database.ref(`/projects/${this.projectId}`).update({approveSpecialProject: approve})
      }
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

      console.log({dataUpdate, progress, index})
      console.log(this.projectSelected)

      const scoreWeek = this.projectSelected.scoreboard.length
      console.log(scoreWeek)

      if (+progress === 100) {
        const updateOther = {
          score: score,
          mentorConfirm: true,
          subjectConfirm: true,
          progress: '100',
          sentTeacher: true,
          saveProgress: true,
          earlyConfirm: true
        }

        for (let i = index + 1; i < scoreWeek; i++) {
          console.log({updateOther})
          await db.database.ref(`projects/${key}/scoreboard/${i}`).update(updateOther)
        }
      }

      await this.$swal({
        // title: 'เสร็จสิ้น',
        // type: 'success'
        title: 'ยันยันการแสดงความคิดเห็น',
        type: 'question',
        html: `<div>เปอร์เซ็นต์ความคืบหน้า ${this.projectSelected.progress} % </div>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
      })
    },
    calScore (score = 0, max) {
      return (max * score) / 100
    },
    async address (project) {
      console.log(project)
      if (!project.docfinalData) {
        const {value: text} = await this.$swal({
          html:
          `<div>
              <b><div style="margin-top:20px;">กรอกข้อมูลสำหรับพิมพ์ใบแบบขอสอบโครงงานพิเศษ</div></b><br>

              <div style="display: flex; justify-content: center">
                &nbsp;&nbsp;ที่อยู่&nbsp;<textarea placeholder="กรอกที่อยู่ปัจจุบันที่สามารถติดต่อได้สะดวก" class="swal2-textarea" id="swal-input1" rows="5" cols="50"></textarea>
              </div><br>

              เบอร์โทรศัพท์
              <input class="swal2-input" id="swal-input2"><br> <br>

              วิชาที่ลงทะเบียน
              <span class="select">
              <select id="swal-input3">
                <option value="" disabled selected>เลือกวิชาที่ลงทะเบียน</option>
                <option>60213411 โครงงานพิเศษ 1</option>
                <option>60213412 โครงงานพิเศษ 2</option>
                <option>60213413 โครงงานพิเศษ 3</option>
              </select>
              </span><br><br>

              ปีการศึกษาที่ลงทเบียน
              <input class="swal2-input" id="swal-input4" type="text" placeholder="เช่น 1/2561"><br><br>

          </div>`,
          showConfirmButton: 'true',
          showCancelButton: 'true',
          confirmButtonText: 'ตกลง',
          cancelButtonText: 'ยกเลิก',
          showCloseButton: 'true',

          preConfirm: () => {
            return [
              document.getElementById('swal-input1').value, // ดึงค่าไปใช้ใน sweet
              document.getElementById('swal-input2').value, // ดึงค่าไปใช้ใน sweet
              document.getElementById('swal-input3').value, // ดึงค่าไปใช้ใน sweet
              document.getElementById('swal-input4').value // ดึงค่าไปใช้ใน sweet
            ]
          }
        })

        if (text) {
          const { value } = await this.$swal({
            html:
            `<b>` + 'ที่อยู่:' + `</b>` + text[0] + `<br>` +
            `<b>` + 'เบอร์โทร:' + `</b>` + text[1] + `<br>` +
            `<b>` + 'วิชา:' + `</b>` + text[2] + `<br>` +
            `<b>` + 'ปีการศึกษาที่ลงทเบียน:' + `</b>` + text[3] + `<br>`,
            showConfirmButton: 'true',
            showCancelButton: 'true',
            confirmButtonText: 'ตกลง',
            cancelButtonText: 'ยกเลิก',
            showCloseButton: 'true'
          })
          console.log(value)
          if (value) {
            await db.database.ref(`projects/${this.projectId}`).update({address: text[0], tel: text[1], subjectRegister: text[2], termRegister: text[3], docfinalData: true})
            await this.$router.push({name: 'Docfinal', params: {projectId: this.projectId}})
          }
        }
      } else {
        await this.$router.push({name: 'Docfinal', params: {projectId: this.projectId}})
      }
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
