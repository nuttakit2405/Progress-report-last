<template>
  <div class="auth-success">
    <div v-if="user" class="container ">
      <div class="column"></div>
      <!-- <div class="column"></div> -->
      <div class="columns">
        <div class="column">
          <div class="column box">
            <section>
              <div class="block">
                <b-switch v-model="showBooks"> ดูขอบเขต </b-switch>
              </div>
              <b-collapse class="card" :open="false" v-for="ind in 10" :key="ind">
                <div slot="trigger" slot-scope="props" class="card-header">
                  <div class="card-header-title">
                    <div class="level">
                        <div class="level-item ">
                          <div class="">
                            <p class="title is-5">สัปดาห์ที {{ind}} </p>
                          </div>
                          <div>
                            &nbsp;หัวข้อที่ {{ind}}
                          </div>
                        </div>
                    </div>
                  </div>
                  <div class="level">
                    <div class="level-item percent">{{showInput}}%</div>
                    <div class ="double-down">
                        <b-icon
                            icon="angle-double-down"
                            size="is-small">
                        </b-icon>
                    </div>
                  </div>
                </div>
                <div class="card-content">
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
                    </b-field>
                    <button class="button" @click="uploadfile(file)">uploadfile</button>

                    <b-field horizontal label="คิดเป็นร้อยละ">
                        <b-input type="number" maxlength="3" style="width:95px" min="1" max="100" v-model="InputProgress"></b-input>
                    </b-field>
                    <b-field horizontal label="จัดทำโครงงานได้">
                    <b-radio v-model="radio"
                        native-value="1">
                        ตรงตามเป้าหมายที่ตั้งไว้
                    </b-radio>
                    <b-radio v-model="radio"
                        native-value="2">
                        น้อยกว่าเป้าหมาย
                    </b-radio>
                    <b-radio v-model="radio"
                        native-value="3">
                        มากกว่าเป้าหมาย
                    </b-radio>
                    </b-field>

                    <b-field label="ในกรณีทำได้น้อยกว่าเป้าหมาย">
                        <b-input type="textarea" placeholder="เป้าหมายที่ทำให้ล่าช้า"></b-input>
                    </b-field>

                    <b-field label="แนวทางแก้ปัญหา">
                        <b-input type="textarea"></b-input>
                    </b-field>

                    <button class="button is-success" style="font-family: 'Kanit', sans-serif" >
                    ยืนยัน
                    </button>

                    <b-field label="ความเห็นอาจารย์ที่ปรึกษา">
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
                    </b-field>

                    <button class="button is-success" style="font-family: 'Kanit', sans-serif">
                    เห็นด้วย
                    </button>
                    <button class="button is-warning" @click="condition" style="font-family: 'Kanit', sans-serif">
                    เห็นด้วย (มีเงื่อนไข)
                    </button>

                    <b-field label="ความเห็นอาจารย์ประจำวิชา">
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
                    </b-field>

                    <button class="button is-success" style="font-family: 'Kanit', sans-serif">
                    รับทราบ
                    </button>
                </div>
                <footer class="card-footer">
                    <a class="card-footer-item">Save</a>
                    <a class="card-footer-item">Edit</a>
                    <!-- <a class="card-footer-item">Delete</a> -->
                </footer>
              </b-collapse>
            </section>
          </div>
        </div>
        <div class="column" v-if="showBooks == true">
          <div class="column box">
            <section>
              <b-tabs v-model="activeTab">
                <b-tab-item :visible="showBooks" label="ยังไม่เสร็จ">
                  ขอบเขตการทำงาน
                  <div v-for="(n, i) in teams" :key="i">
                    <b-field>
                      <b-input name="name" placeholder="Name" expanded></b-input>
                    </b-field>
                  </div>

                  <button @click="Addteam" class ="button is-dark " icon="times">
                    <b-icon icon="plus" size="is-small"></b-icon>
                  </button>

                </b-tab-item>
                <b-tab-item :visible="showBooks" label="เสร็จแล้ว">
                    ขอบเขตนะจ๊ะ
                </b-tab-item>
              </b-tabs>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import storage from '@/storage'
export default {
  name: 'auth-success',
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
      }]
    }
  },
  computed: {
    user () {
      return this.$store.getters['user/user']
    },
    showInput () {
      return this.InputProgress
    }
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
    async uploadfile (files) {
      console.log(files)
      console.log(storage)
      const res = await storage.upload(files.name, files, '/projectId')
      console.log(res)
    },
    Addteam () {
      this.teams.push({
        name: ''
      })
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
</style>
