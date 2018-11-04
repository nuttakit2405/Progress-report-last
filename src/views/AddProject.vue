<template>
    <div class= "container">
        <div class="column"></div>
        <div class="columns">
            <div class="column is-8 is-offset-2">
                <div class="column box">
                    <div class="column is-10 is-offset-1">
                    <section>
                        <div class="box">
                            <b-field horizontal label="ชื่อโครงงาน">
                                <b-input name="ProjectName1" placeholder="ภาษาไทย" expanded  required></b-input>
                            </b-field>
                            <b-field horizontal>
                                <b-input name="ProjectName2" placeholder="ภาษาอังกฤษ" expanded  required></b-input>
                            </b-field> <br>

                            <b-field horizontal label="กรณีศึกษา">
                                <b-input name="CaseStudy1" placeholder="ภาษาไทย" expanded></b-input>
                            </b-field>
                            <b-field horizontal>
                                <b-input name="CaseStudy2" placeholder="ภาษาอังกฤษ" expanded></b-input>
                            </b-field> <br>
                        </div>
                        <!-- <div class= "aa" v-for="(item, index) in items" > -->
                        <div v-for="(n, i) in teams" :key="i" class="box">
                            <b-field horizontal :label="'ชื่อ-นามสกุล'+(i+1)">
                                <b-input v-model="n.name" name="name" placeholder="ชื่อ" expanded  required></b-input>
                                <b-input v-model="n.lastname" name="lastname" placeholder="นามสกุล" expanded required></b-input>
                            </b-field>
                            <b-field horizontal label="รหัสนักศึกษา">
                                <b-input v-model="n.id" name="id" type="number" maxlength="13" min="0" placeholder="รหัสนักศึกษา 13 หลัก" expanded  required></b-input>
                            </b-field>
                            <div class="level-item has-text-centered">
                            <button v-if="i > 0" :v-model="statusDelteam" @click="Delteam" class="button is-info">
                                <b-icon icon="times" size="is-small"></b-icon>
                            </button>
                            </div>
                        </div>
                        <b-field  class="buttonAddteam">
                            <button @click="Addteam" class ="button is-dark " icon="times">
                                <b-icon icon="plus" size="is-small"></b-icon>
                            </button>
                        </b-field>
                        <div class="box">
                            <b-field horizontal label="ชื่อที่ปรึกษา">
                                <b-select placeholder="เลือกอาจารย์ที่ปรึกษา" required>
                                    <option value="teacher1">ผู้ช่วยศาสตราจารย์ ดร. ขนิษฐา นามี</option>
                                    <option value="teacher2">ผู้ช่วยศาสตราจารย์ ดร. พาฝัน ดวงไพศาล</option>
                                    <option value="teacher3">ผู้ช่วยศาสตราจารย์ ดร. ยุพิน สรรพคุณ</option>
                                    <option value="teacher4">ผู้ช่วยศาสตราจารย์ ดร. วันทนี ประจวบศุภกิจ</option>
                                    <option value="teacher5">ผู้ช่วยศาสตราจารย์ อรบุษป์ วุฒิกมลชัย</option>
                                    <option value="teacher6">ผู้ช่วยศาสตราจารย์ ดร. อนิราช มิ่งขวัญ</option>
                                    <option value="teacher7">ผู้ช่วยศาสตราจารย์ สุปีติ กุลจันทร์</option>
                                    <option value="teacher8">ผู้ช่วยศาสตราจารย์ สุพาภรณ์ ซิ้มเจริญ</option>
                                    <option value="teacher9">อาจารย์ ดร. ประดิษฐ์ พิทักษ์เสถียรกุล</option>
                                    <option value="teacher10">อาจารย์ ดร. วิชญา รุ่นสุวรรณ์</option>
                                    <option value="teacher11">อาจารย์ ดร. สมพัตร์ เบ็ญจชัยพร</option>
                                    <option value="teacher12">อาจารย์ นัฎฐพันธ์ นาคพงษ์</option>
                                    <option value="teacher13">อาจารย์ นิติการ นาคเจือทอง</option>
                                    <option value="teacher14">อาจารย์ นพดล บูรณ์กุศล</option>
                                    <option value="teacher15">อาจารย์ นพเก้า ทองใบ</option>
                                    <option value="teacher16">อาจารย์ นิมิต ศรีคำทา</option>
                                    <option value="teacher17">อาจารย์ บีสุดา ดาวเรือง</option>
                                    <option value="teacher18">อาจารย์ ปองพล สพันธุ์พงศ์</option>
                                    <option value="teacher19">อาจารย์ วัชรชัย คงศิริวัฒนา</option>
                                    <option value="teacher20">อาจารย์ สมชัย เชียงพงศ์พันธุ์</option>
                                    <option value="teacher21">อาจารย์ สิวาลัย จินเจือ</option>
                                </b-select>
                            </b-field>
                            <b-field horizontal label="ที่ปรึกษาร่วม">
                                <b-input name="mentor2" placeholder="ชื่อ-นามสกุล อาจารย์ที่ปรึกษาร่วม" expanded></b-input>
                            </b-field>
                            <b-field horizontal label="หน่วยงาน">
                                <b-input name="dep" placeholder="ชื่อสถานประกอบการ/หน่วยงาน" expanded></b-input>
                            </b-field>
                            <b-field horizontal label="ภาคการศึกษา"  required>
                                <b-field class style="width:150px;">
                                <b-select expanded placeholder="เลือกภาคเรียน">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </b-select>
                                </b-field>
                                <b-field class style="margin-right:150px; width:100;"  required>
                                    <b-input name="year" type= "number" min="2500" max="3000" minlength="4" maxlength="4" placeholder="ปีการศึกษา" expanded></b-input>
                                </b-field>
                            </b-field>

                            <div class="field" style="margin-left:105px;">
                                <b-radio v-model="radio"
                                    native-value="term">
                                    โครงงาน 1 ภาคการศึกษา
                                </b-radio>
                                <b-radio v-model="radio"
                                    native-value="terms">
                                    โครงงาน 2 ภาคการศึกษา
                                </b-radio>
                            </div>

                            <b-field label="วันยื่นสอบ" horizontal  required>
                              <b-datepicker
                                  placeholder="เลือกวันยื่นสอบ"
                                  icon="calendar-alt" style="width:150px;">
                              </b-datepicker>
                            </b-field>

                        </div>
                        <center><button class="button is-success" @click="$router.push({name: 'Group'})">ยืนยัน</button></center>
                    </section></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      teams: [{
        name: '',
        lastname: '',
        id: ''
      }],
      radio: '',
      favorited: false,
      statusDelteam: true
    }
  },
  methods: {
    Addteam () {
      this.teams.push({
        name: '',
        lastname: '',
        id: ''
      })
    },
    Delteam (i) {
      this.teams.splice(i, 1)
    }
  }
}
</script>

<style>
.layout{
  padding-top: 30px;
  margin: auto;
  width:20cm;
 }
.buttonAddteam{
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>
