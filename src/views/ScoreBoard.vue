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
                </div>
                <div class="card-content">
                    <ProgressStudent/>
                    <ProgressMentor/>
                    <ProgressTeacher/>
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
                  <b-tab-item :visible="showBooks" label="ขอบเขตการทำงาน">
                    <ScalWork/>
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
import auth from '@/auth'
import ScalWork from '@/components/ScalWork'
import ProgressStudent from '@/components/ProgressStudent'
import ProgressMentor from '@/components/ProgressMentor'
import ProgressTeacher from '@/components/ProgressTeacher'

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
  components: {
    ScalWork,
    ProgressStudent,
    ProgressMentor,
    ProgressTeacher
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
.ButtonAddWork{
  display: flex;
  justify-content: flex-end;
}
</style>
