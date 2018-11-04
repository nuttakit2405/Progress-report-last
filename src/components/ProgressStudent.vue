<template>
<div>
  <b-field label="ความก้าวหน้า / ผลงานที่ดำเนินงานมาแล้ว">
    <b-input type="textarea"></b-input>
  </b-field>

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
    <button class="button UploadfileButton" @click="uploadfile(file)"
                  style="font-family: 'Kanit', sans-serif">uploadfile</button>
  </b-field>

  <b-field horizontal label="คิดเป็นร้อยละ">
    <b-input type="number" maxlength="3" style="width:95px" min="1" max="100" v-model="InputProgress"></b-input>
  </b-field>
  <b-field horizontal label="จัดทำโครงงานได้">
    <b-radio v-model="radio" native-value="1">
      ตรงตามเป้าหมายที่ตั้งไว้
  </b-radio>
    <b-radio v-model="radio" native-value="2">
      น้อยกว่าเป้าหมาย
    </b-radio>
    <b-radio v-model="radio" native-value="3">
      มากกว่าเป้าหมาย
    </b-radio>
  </b-field>

    <b-field label="ในกรณีทำได้น้อยกว่าเป้าหมาย">
      <b-input type="textarea" placeholder="เป้าหมายที่ทำให้ล่าช้า"></b-input>
    </b-field>
    <b-field label="แนวทางแก้ปัญหา">
        <b-input type="textarea"></b-input>
    </b-field>

  <button class="button is-primary" style="font-family: 'Kanit', sans-serif" > ยืนยัน </button>
  <button class="button is-success" style="font-family: 'Kanit', sans-serif" > ส่งความคืบหน้า </button>
</div>
</template>
<script>
import storage from '@/storage'
export default {
  data () {
    return {
      file: null
    }
  },
  methods: {
    async uploadfile (files) {
      console.log(files)
      console.log(storage)
      const res = await storage.upload(files.name, files, '/projectId')
      console.log(res)
    }
  }
}
</script>
<style scoped>
 .UploadfileButton{
   margin-left:10px
 }
</style>
