<template>
  <div>
    <div v-if="profile && profile.userType === 'teacher' && viewMode === 'subject'">
      <b-field label="ความเห็นอาจารย์ประจำวิชา">
        <b-input type="textarea" :disabled="weekData.subjectConfirm" v-model="subjectComment"></b-input>
      </b-field>
      <b-taglist>
        <b-tag >All Files:</b-tag>
        <b-tag :key="i" v-for="(file, i) in weekData.files" type="is-info">{{file.filename}}</b-tag>
      </b-taglist>
      <b-field class="file" v-if="!weekData.subjectConfirm" >
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
      <div class="has-text-centered" v-if="weekData.sentTeacher || weekData.subjectConfirm">
        <button @click="commentBySubject()" :disabled="weekData.subjectConfirm" class="button is-success" style="font-family: 'Kanit', sans-serif">รับทราบ</button>
      </div>
      <div class="has-text-centered" v-else>
        <button class="button" disabled>รอนักศึกษาส่งข้อมูล</button>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import db from '@/database'
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
      isFullPage: true,
      subjectComment: this.weekData.subjectComment ? this.weekData.subjectComment : ''
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
    async commentBySubject () {
      const {value} = await this.$swal({
        title: 'ยืนยันการแสดงความคิดเห็น',
        type: 'question',
        html: `<div><p style="white-space: pre-line">${this.subjectComment}</p></div>`,
        showCancelButton: true,
        confirmButtonColor: 'hsl(141, 71%, 48%)',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
      })
      if (value) {
        await this.$swal({
          type: 'success',
          title: 'การแสดงความคิดเห็นถูกส่งให้กับนักศึกษาแล้ว',
          showConfirmButton: false,
          timer: 1500,
          toast: true,
          position: 'top'
        })
      } else {
        this.$swal({
          type: 'error',
          title: 'ยังไม่ได้ยืนยันความคืบหน้า'
        })
        const data = {
          subjectComment: this.subjectComment,
          subjectConfirm: true
        }
        console.log(data)
        await db.database.ref(`projects/${this.projectKey}/scoreboard/${this.week}`).update(data)
      }
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
    }
  }
}
</script>

<style scoped>
 .UploadfileButton{
   margin-left:10px
 }
</style>
