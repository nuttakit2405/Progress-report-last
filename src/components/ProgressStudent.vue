<template>
<div>
  <div v-if="profile && profile.userType == 'student'">
  <b-field label="ความก้าวหน้า / ผลงานที่ดำเนินงานมาแล้ว">
    <b-input :disabled="weekData.sentTeacher" type="textarea" v-model="textProgress"></b-input>
  </b-field>

  <b-taglist>
    <b-tag>All Files:</b-tag>
    <b-tag :key="i" v-for="(file, i) in weekData.files" type="is-info">{{file.filename}}</b-tag>
  </b-taglist>
  <b-field v-if="weekData.sentTeacher !== true" class="file">
    <b-upload v-model="file">
      <a class="button is-primary">
        <b-icon icon="upload"></b-icon>
          <span>Click to upload</span>
      </a>
    </b-upload>
    <span class="file-name" v-if="file">
      {{ file.name }}
    </span>
    <button class="button UploadfileButton is-success" @click="uploadfile(file)"
    style="font-family: 'Kanit', sans-serif">OK</button>
  </b-field>

  <b-field horizontal label="คิดเป็นร้อยละ">
    <b-input  :disabled="weekData.sentTeacher" type="number" maxlength="3" style="width:95px" :min="progressTotal" max="100" v-model="progress"></b-input>
  </b-field>
  <b-field horizontal label="จัดทำโครงงานได้">
    <b-radio v-model="radio" native-value="1" :disabled="weekData.sentTeacher">
      ตรงตามเป้าหมายที่ตั้งไว้
    </b-radio>
    <b-radio v-model="radio" native-value="2" :disabled="weekData.sentTeacher">
      น้อยกว่าเป้าหมาย
    </b-radio>
    <b-radio v-model="radio" native-value="3" :disabled="weekData.sentTeacher">
      มากกว่าเป้าหมาย
    </b-radio>
  </b-field>

  <div v-if="radio == 2">
   <b-field label="ในกรณีทำได้น้อยกว่าเป้าหมาย">
      <b-input type="textarea" placeholder="เป้าหมายที่ทำให้ล่าช้า" v-model="lateReason"></b-input>
    </b-field>
    <b-field label="แนวทางแก้ปัญหา">
        <b-input type="textarea" v-model="solutions"></b-input>
    </b-field>
    </div>
    <div class="has-text-centered">
      <button class="button is-primary" style="font-family: 'Kanit', sans-serif" @click="Pushpro"> ยืนยัน </button>
      <button class="button is-success" style="font-family: 'Kanit', sans-serif" @click="sentToTeacher"  :disabled="weekData.sentTeacher"> ส่งความคืบหน้า </button>
    </div>
  </div>
</div>

</template>
<script>
import db from '@/database'
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
    },
    progressTotal: {
      type: [Number, String]
    }
  },
  watch: {
    progressTotal (val) {
      this.progress = this.weekData.progress ? this.weekData.progress : this.progressTotal
    }
  },
  data () {
    return {
      file: null,
      textProgress: this.weekData.textProgress ? this.weekData.textProgress : '',
      radio: this.weekData.radio ? this.weekData.radio : '1',
      progress: this.weekData.progress ? this.weekData.progress : this.progressTotal,
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
      user: 'user/user',
      projectSelected: 'projects/projectSelected',
      profile: 'user/profile'
    })
  },
  methods: {
    async uploadfile (files) {
      const data = {
        files, projectKey: this.projectKey, week: this.week
      }
      await this.$emit('upload', data)
      this.file = await null
    },
    async Pushpro () {
      const datas = {
        textProgress: this.textProgress,
        progress: this.progress,
        lateReason: this.lateReason,
        solutions: this.solutions,
        radio: this.radio,
        saveProgress: true
      }
      const {value} = await this.$swal({
        title: 'ยืนยันความคืบหน้า',
        text: `ทำงานได้ ${this.radioWorld[this.radio]} คิดเป็น ${this.progress}%`
      })
      if (value) {
        console.log(datas)
        await db.database.ref(`projects/${this.projectKey}/scoreboard/${this.week}`).update(datas)
      }
    },
    async sentToTeacher () {
      if (this.weekData.saveProgress) {
        const {value} = await this.$swal({
          title: 'ส่งความคืบหน้าให้กับอาจารย์',
          text: `ทำงานได้ ${this.radioWorld[this.radio]} คิดเป็น ${this.progress}%`
        })
        if (value) {
          await db.database.ref(`projects/${this.projectKey}/scoreboard/${this.week}`).update({sentTeacher: true})
        }
      } else {
        this.$swal({
          type: 'error',
          title: 'ยังไม่ได้ยืนยันความคืบหน้า'
        })
      }
    }
  }
}
</script>
<style scoped>
 .UploadfileButton{
   margin-left:10px
 }
</style>
