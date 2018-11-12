<template>
  <div>
    <div v-if="profile.userType != 'student'">
      <b-field label="ความเห็นอาจารย์ที่ปรึกษา">
      <b-input type="textarea"></b-input>
    </b-field>

    <div v-if="profile.teacherGroup[0] === 'mentor' || profile.teacherGroup[1] === 'mentor'">
      <b-field class="file">
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
    }
  },
  data () {
    return {
      file: null
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
    uploadfile (files) {
      const data = {
        files, projectKey: this.projectKey, week: this.week
      }
      this.$emit('upload', data)
    }
  }
}
</script>

<style scoped>
 .UploadfileButton{
   margin-left:10px
 }
</style>
