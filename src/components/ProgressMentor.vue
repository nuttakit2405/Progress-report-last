<template>
  <div style="margin-bottom: 20px;" v-if="profile && profile.userType != 'student' && profile.teacherGroup.some(type => type === 'mentor') && viewMode === 'mentor'">
    <div>
      <b-field label="ความเห็นอาจารย์ที่ปรึกษา">
      <b-input :disabled="weekData.mentorConfirm"  v-model="mentorComment" type="textarea"></b-input>
    </b-field>
    <div>
      <b-taglist>
        <b-tag >All Files:</b-tag>
        <b-tag :key="i" v-for="(file, i) in weekData.files" type="is-info">{{file.filename}}</b-tag>
      </b-taglist>
      <b-field class="file" v-if="!weekData.mentorConfirm" >
        <b-upload v-model="file">
          <a class="button is-primary">
            <b-icon icon="upload"></b-icon>
            <span>เลือกไฟล์</span>
          </a>
        </b-upload>
        <span class="file-name" v-if="file">
          {{ file.name }}
        </span>
        <button  v-if="file" class="button UploadfileButton is-success" @click="uploadfile(file)"
        style="font-family: 'Kanit', sans-serif">อัพโหลด</button>
      </b-field>
      <b-field horizontal label="จัดทำโครงงานได้">
        <b-radio v-model="radio" native-value="1" :disabled="weekData.mentorConfirm" >
          ตรงตามเป้าหมายที่ตั้งไว้
        </b-radio>
        <b-radio v-model="radio" native-value="2" :disabled="weekData.mentorConfirm" >
          น้อยกว่าเป้าหมาย
        </b-radio>
      </b-field>
      <div v-if="radio == 2" style="margin-bottom: 20px" >
        <div class="title is-5">ในกรณีทำได้น้อยกว่าเป้าหมาย</div>
        <b-field label="เป้าหมายที่ทำให้ล่าช้า">
          <b-input :disabled="weekData.mentorConfirm" type="textarea" placeholder="เป้าหมายที่ทำให้ล่าช้า" v-model="lateReason"></b-input>
        </b-field>
        <b-field label="แนวทางแก้ปัญหา">
            <b-input :disabled="weekData.mentorConfirm" placeholder="แนวทางแก้ปัญหา" type="textarea" v-model="solutions"></b-input>
        </b-field>
      </div>

      <div class="has-text-centered" v-if="weekData.sentTeacher || weekData.mentorConfirm">
        <button :disabled="weekData.mentorConfirm" class="button is-success" style="font-family: 'Kanit', sans-serif" @click="confirm">
          เห็นด้วย
        </button>
        <button :disabled="weekData.mentorConfirm"  class="button is-warning" @click="condition" style="font-family: 'Kanit', sans-serif">
        เห็นด้วย (มีเงื่อนไข)
        </button>
      </div>
      <div class="has-text-centered" v-else>
        <button class="button" disabled>รอนักศึกษาส่งข้อมูล</button>
      </div>
    </div>
    </div>
  </div>
</template>
<script>

import {mapGetters} from 'vuex'

export default {
  props: {
    projectKey: {
      type: String
    },
    week: {
      type: Number
    },
    weekData: {
      type: Object
    }
  },
  data () {
    return {
      file: null,
      mentorComment: this.weekData.mentorComment ? this.weekData.mentorComment : '',
      radio: this.weekData.radio ? this.weekData.radio : '1',
      lateReason: this.weekData.lateReason ? this.weekData.lateReason : '',
      solutions: this.weekData.solutions ? this.weekData.solutions : '',
      radioWorld: {
        '1': 'ตรงตามเป้าหมายที่ตั้งไว้',
        '2': 'น้อยกว่าเป้าหมาย',
        '3': 'มากกว่าเป้าหมาย'
      }
    }
  },
  computed: {
    ...mapGetters({
      viewMode: 'viewMode',
      user: 'user/user',
      projectSelected: 'projects/projectSelected',
      profile: 'user/profile'
    })
  },
  methods: {
    async confirm () {
      const data = {
        mentorComment: this.mentorComment,
        lateReason: this.lateReason,
        solutions: this.solutions,
        radio: this.radio
      }
      this.$emit('confirm', data)
    },
    async condition () {
      const {value} = await this.$swal({
        title: 'เปอร์เซนต์การทำงานที่เหมาะสม',
        html: `<div>
            คิดเป็นร้อยละ <input id="swal-progress" type="number" min="0" max="100" value="${this.weekData.progress}" class="swal2-input" style="width:90px"><br>
            ความคิดเห็นอาจารย์ที่ปรึกษา
            <textarea id="swal-comment" disabled class="swal2-textarea">${this.mentorComment}</textarea>
          </div>`,
        preConfirm: () => {
          return [
            document.getElementById('swal-progress').value, // ดึงค่าไปใช้ใน sweet
            document.getElementById('swal-comment').value // ดึงค่าไปใช้ใน sweet
          ]
        }
      })
      if (value) {
        await this.$swal({
          title: 'เปอร์เซนต์การทำงานถูกเปลี่ยนแปลงแล้ว',
          type: 'success'
        })

        await this.$emit('confirmCondition', {
          progress: value[0],
          mentorComment: this.mentorComment,
          lateReason: this.lateReason,
          solutions: this.solutions,
          radio: this.radio
        })
      }
    },
    async uploadfile (files) {
      const data = {
        files, projectKey: this.projectKey, week: this.week
      }
      await this.$emit('upload', data)
      this.file = await null
    }
  }
}
</script>

<style scoped>
 .UploadfileButton{
   margin-left:10px
 }
</style>
