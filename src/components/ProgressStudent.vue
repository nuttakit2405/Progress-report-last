<template>
  <div v-if="profile && profile.userType == 'student'">
    <b-field label="ความก้าวหน้า / ผลงานที่ดำเนินงานมาแล้ว">
      <b-input :disabled="weekData.sentTeacher" type="textarea" v-model="textProgress"></b-input>
    </b-field>

    <b-field label="ปัญหาที่พบ">
      <b-input :disabled="weekData.sentTeacher" type="textarea" v-model="problem"></b-input>
    </b-field>

    <b-field label="วิธีแก้ปัญหาที่พบ">
      <b-input :disabled="weekData.sentTeacher" type="textarea" v-model="solution"></b-input>
    </b-field>

    <!-- upload section -->
    <b-taglist>
      <b-tag>All Files:</b-tag>
      <b-tag :key="i" v-for="(file, i) in weekData.files" type="is-info">{{file.filename}}</b-tag>
    </b-taglist>
    <b-field v-if="weekData.sentTeacher !== true" class="file">
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

    <!-- working percent -->
    <b-field horizontal label="คิดเป็นร้อยละ">
      <b-input :disabled="weekData.sentTeacher" type="number" maxlength="3" style="width:95px" :min="progressTotal" max="100" v-model="progress"></b-input>
    </b-field>

      <b-field label="สมาชิกที่ยืนยันแล้ว" v-if="weekData.membersSave">
        <b-message type="is-info">
        <div>
          <div :key="i" v-for="(members, i) in memberConfirm(weekData.membersSave)">{{members}}</div>
        </div>
        </b-message>
      </b-field>

    <div class="has-text-centered">
      <button class="button is-info" style="font-family: 'Kanit', sans-serif" @click="saveConfirm" :disabled="weekData.sentTeacher"> ยืนยัน<span v-if="yourConfirm">แล้ว</span> </button>
      <button class="button is-success" style="font-family: 'Kanit', sans-serif" @click="sentToTeacher" v-if="allMembersConfirm" :disabled="weekData.sentTeacher"> ส่งความคืบหน้า </button>
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
      problem: this.weekData.problem ? this.weekData.problem : '',
      solution: this.weekData.solution ? this.weekData.solution : '',
      progress: this.weekData.progress ? this.weekData.progress : this.progressTotal,
      isFullPage: true
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
      projectSelected: 'projects/projectSelected',
      profile: 'user/profile',
      allUsers: 'user/allUsers'
    }),
    allMembersConfirm () {
      return this.weekData.membersSave && Object.keys(this.weekData.membersSave).length === this.projectSelected.teams.length
    },
    yourConfirm () {
      return this.weekData.membersSave && this.weekData.membersSave[this.user.uid]
    }
  },
  methods: {
    memberConfirm (members) {
      if (members) {
        return Object.keys(members).map(uid => this.allUsers[uid].fullName)
      }
      return ''
    },
    async uploadfile (files) {
      // loading
      const loadingComponent = this.$loading.open({
        container: this.isFullPage ? null : this.$refs.element.$el
      })
      setTimeout(() => loadingComponent.close(), 3 * 1000)
      // loading
      const data = {
        files, projectKey: this.projectKey, week: this.week
      }
      await this.$emit('upload', data)
      this.file = await null
    },
    async saveConfirm () {
      const datas = {
        textProgress: this.textProgress,
        problem: this.problem,
        solution: this.solution,
        progress: this.progress,
        saveProgress: true
      }
      const {value} = await this.$swal({
        title: 'ยืนยันความคืบหน้า',
        text: `เปอร์เซ็นที่ทำงานได้ คิดเป็น ${this.progress}%`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
      })
      if (value) {
        await db.database.ref(`projects/${this.projectKey}/scoreboard/${this.week}`).update(datas)
        await db.database.ref(`projects/${this.projectKey}/scoreboard/${this.week}/membersSave`).update({[this.user.uid]: true})
      }
    },
    async sentToTeacher () {
      if (this.weekData.saveProgress) {
        const {value} = await this.$swal({
          title: 'ยืนยันที่จะส่งความคืบหน้าให้กับอาจารย์',
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'ยืนยัน',
          cancelButtonText: 'ยกเลิก',
          text: `เปอร์เซ็นต์ที่ทำงานได้ คิดเป็น ${this.progress}%`
        })
        if (value) {
          this.$swal({
            type: 'success',
            title: 'ความคืบหน้าถูกส่งให้กับอาจารย์แล้ว',
            // confirmButtonText: 'ยืนยัน'
            showConfirmButton: false,
            timer: 1500
          })
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
