<template>
    <div class="auth-success">
        <div v-if="user">
            <div class="container">
                <div class="column"></div>
                <div class="notification">
                    <section>
                        <!-- <div>11111</div> -->
                        <b-collapse class="card" :open="false" v-for="ind in 10" :key="ind">
                            <div slot="trigger" slot-scope="props" class="card-header">
                                <div class="card-header-title">
                                    สัปดาห์ที {{ind}}
                                </div>
                                <div class="card-header-title">
                                    หัวข้อที่ {{ind}}
                                </div>
                                <div class="level">
                                    <div class="level-item percent">55%</div>
                                    <div class ="double-down">
                                        <b-icon
                                            icon="angle-double-down"
                                            size="is-small">
                                        </b-icon>
                                    </div>
                                </div>
                            </div>
                            <div class="card-content fieldSize">
                                <b-field label="ความก้าวหน้า / ผลงานที่ดำเนินงานมาแล้ว">
                                    <b-input type="textarea"></b-input>
                                </b-field>

                                <b-field horizontal label="คิดเป็นร้อยละ">
                                    <b-input type="number" maxlength="3" style="width:70px"></b-input>
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

                                <button class="button is-medium is-success" style="font-family: 'Kanit', sans-serif" >
                                  ยืนยัน
                                </button>

                                <b-field label="ความเห็นอาจารย์ที่ปรึกษา">
                                    <b-input type="textarea"></b-input>
                                </b-field>
                                <button class="button is-medium is-success" style="font-family: 'Kanit', sans-serif">
                                  เห็นด้วย
                                </button>
                                <button class="button is-medium is-warning" @click="condition" style="font-family: 'Kanit', sans-serif">
                                  เห็นด้วย(มีเงื่อนไข)
                                </button>

                                <b-field label="ความเห็นอาจารย์ประจำวิชา">
                                    <b-input type="textarea"></b-input>
                                </b-field>
                                <button class="button is-medium is-success" style="font-family: 'Kanit', sans-serif">
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

        </div>
    </div>
</template>

<script>
import auth from '@/auth'

export default {
  name: 'auth-success',
  data () {
    return {
      dropFiles: [],
      radio: [],
      isSwitched: false,
      isSwitchedCustom: 'Yes'
    }
  },
  computed: {
    user () {
      return this.$store.getters['user/user']
    }
  },
  methods: {
    logOut () {
      auth.logout()
    },
    deleteDropFile (index) {
      this.dropFiles.splice(index, 1)
    },
    async condition () {
      const {value: percent} = await this.$swal({
        title: 'เปอร์เซนต์การทำงานที่เหมาะสม',
        html: `<div> 
            คิดเป็นร้อยละ <input id="swal-input1" class="swal2-input" style="width:90px" ><br>
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
