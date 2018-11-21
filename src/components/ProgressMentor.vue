<template>
  <div style="margin-bottom: 20px;" v-if="profile && profile.userType != 'student' && profile.teacherGroup.some(type => type === 'mentor')">
    <div>
      <b-field label="ความเห็นอาจารย์ที่ปรึกษา">
      <b-input type="textarea"></b-input>
    </b-field>
    <div>
      <b-taglist>
        <b-tag >All Files:</b-tag>
        <b-tag :key="i" v-for="(file, i) in weekData.files" type="is-info">{{file.filename}}</b-tag>
      </b-taglist>
      <b-field class="file">
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
        <b-radio v-model="radio" native-value="1" :disabled="weekData.sentTeacher">
          ตรงตามเป้าหมายที่ตั้งไว้
        </b-radio>
        <b-radio v-model="radio" native-value="2" :disabled="weekData.sentTeacher">
          น้อยกว่าเป้าหมาย
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
      <button class="button is-success" style="font-family: 'Kanit', sans-serif" @click="$emit('confirm')">
        เห็นด้วย
      </button>
      <button class="button is-warning" @click="condition" style="font-family: 'Kanit', sans-serif">
      เห็นด้วย (มีเงื่อนไข)
      </button>
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
      radio: this.weekData.radio ? this.weekData.radio : '1'
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
    async condition () {
      const {value: percent} = await this.$swal({
        title: 'เปอร์เซนต์การทำงานที่เหมาะสม',
        html: `<div>
            คิดเป็นร้อยละ <input id="swal-input1" class="swal2-input" style="width:90px"><br>
            ความคิดเห็นอาจารย์ที่ปรึกษา
            <textarea id="swal-input2" class="swal2-textarea"></textarea>
            </div> `
      })
      if (percent) {
        await this.$swal({
          title: 'เปอร์เซนต์การทำงานถูกเปลี่ยนแปลงแล้ว',
          // text: 'Do you want to continue',
          type: 'success'
          // confirmButtonText: 'Cool'
        })
        await this.$emit('confirmCondition')
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
