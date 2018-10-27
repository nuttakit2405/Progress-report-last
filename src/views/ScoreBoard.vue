<template>
    <div class="auth-success">
        <div v-if="user">
            <div class="container">
                <div class="column"></div>
                <div class="notification">

                    <section>
                        <div>11111</div>
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
                                    <b-select placeholder=" " style="width:auto">
                                        <option> 5%  </option>
                                        <option> 10% </option>
                                        <option> 15% </option>
                                        <option> 20% </option>
                                        <option> 25%  </option>
                                        <option> 30% </option>
                                        <option> 35% </option>
                                        <option> 40% </option>
                                        <option> 45%  </option>
                                        <option> 50% </option>
                                        <option> 55% </option>
                                        <option> 60% </option>
                                        <option> 65%  </option>
                                        <option> 70% </option>
                                        <option> 75% </option>
                                        <option> 80% </option>
                                        <option> 85% </option>
                                        <option> 90% </option>
                                        <option> 95% </option>
                                        <option> 100% </option>
                                    </b-select>
                                </b-field>

                                <!-- <b-field horizontal label="จัดทำโครงงานได้">
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
                                </b-field> -->

                                <b-field label="ในกรณีทำได้น้อยกว่าเป้าหมาย">
                                    <b-input type="textarea" placeholder="เป้าหมายที่ทำให้ล่าช้า"></b-input>
                                </b-field>

                                <b-field label="แนวทางแก้ปัญหา">
                                    <b-input type="textarea"></b-input>
                                </b-field>

                                <div class="field">
                                  <b-switch v-model="isSwitchedCustom"
                                      type="is-success"
                                      true-value="Yes"
                                      false-value="No">
                                      {{ isSwitchedCustom }}
                                  </b-switch>
                                </div>

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
  computed: {
    user () {
      return this.$store.getters['user/user']
    },
    data () {
      return {
        dropFiles: [],
        radio: [],
        isSwitched: false,
        isSwitchedCustom: 'Yes'
      }
    }
  },
  methods: {
    logOut () {
      auth.logout()
    },
    deleteDropFile (index) {
      this.dropFiles.splice(index, 1)
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
