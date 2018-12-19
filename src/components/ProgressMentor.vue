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
      isFullPage: true,
      mentorComment: this.weekData.mentorComment ? this.weekData.mentorComment : '',
      radio: this.weekData.radio ? this.weekData.radio : '1',
      radioWorld: {
        '1': 'ตรงตามเป้าหมายที่ตั้งไว้',
        '2': 'น้อยกว่าเป้าหมาย'
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
        radio: 1
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
          return document.getElementById('swal-progress').value
        }
      })
      if (value) {
        await this.$swal({
          title: 'เปอร์เซนต์การทำงานถูกเปลี่ยนแปลงแล้ว',
          type: 'success'
        })

        await this.$emit('confirmCondition', {
          progress: value,
          mentorComment: this.mentorComment,
          radio: 2
        })
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
