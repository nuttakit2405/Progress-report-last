<template>
  <div>
    <div v-if="profile && profile.userType === 'teacher' && viewMode === 'subject'">
      <b-field label="ความเห็นอาจารย์ประจำวิชา">
        <b-input type="textarea"></b-input>
      </b-field>
      <button class="button is-success" style="font-family: 'Kanit', sans-serif">รับทราบ</button>
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
      viewMode: 'viewMode',
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
        this.$swal({
          title: 'เปอร์เซนต์การทำงานถูกเปลี่ยนแปลงแล้ว',
          // text: 'Do you want to continue',
          type: 'success'
          // confirmButtonText: 'Cool'
        })
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
