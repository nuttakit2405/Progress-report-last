<template>
    <div class= "container">
        <div class="column"></div>
        <div class="columns">
            <div class="column is-8 is-offset-2">
                <div class="column box">
                    <div class="column is-10 is-offset-1">
                    <section>
                        <b-field horizontal label="ชื่อโครงงาน">
                            <b-input name="ProjectName1" placeholder="ภาษาไทย" expanded></b-input>
                        </b-field>
                        <b-field horizontal>
                            <b-input name="ProjectName2" placeholder="ภาษาอังกฤษ" expanded></b-input>
                        </b-field> <br>

                        <b-field horizontal label="กรณีศึกษา">
                            <b-input name="CaseStudy1" placeholder="ภาษาไทย" expanded></b-input>
                        </b-field>
                        <b-field horizontal>
                            <b-input name="CaseStudy2" placeholder="ภาษาอังกฤษ" expanded></b-input>
                        </b-field> <br>

                        <!-- <div class= "aa" v-for="(item, index) in items" > -->
                        <div v-for="(n, i) in teams" :key="i">
                            <b-field horizontal :label="'ชื่อ-นามสกุล'+(i+1)">
                                <b-input v-model="n.name" name="name" placeholder="ชื่อ" expanded></b-input>
                                <b-input v-model="n.lastname" name="lastname" placeholder="นามสกุล" expanded></b-input>
                            </b-field>
                            <b-field horizontal label="รหัสนักศึกษา">
                                <b-input v-model="n.id" name="id" type="number" maxlength="13" min="0" placeholder="รหัสนักศึกษา 13 หลัก" expanded></b-input>
                            </b-field> <br>
                            <button v-if="i > 0" :v-model="statusDelteam" @click="Delteam" class="button is-info">1</button>
                        </div>
                        <b-field  class="buttonAddteam">
                            <button @click="Addteam" class ="button is-primary" icon="times">+</button>
                        </b-field>

                        <b-field horizontal label="ชื่อที่ปรึกษา">
                            <b-input name="mentor1" placeholder="ชื่อ-นามสกุล อาจารย์ที่ปรึกษา" expanded></b-input>
                        </b-field>
                        <b-field horizontal label="ชื่อที่ปรึกษาร่วม">
                            <b-input name="mentor2" placeholder="ชื่อ-นามสกุล อาจารย์ที่ปรึกษาร่วม" expanded></b-input>
                        </b-field>
                        <b-field horizontal label="หน่วยงาน">
                            <b-input name="dep" placeholder="ชื่อสถานประกอบการ/หน่วยงาน" expanded></b-input>
                        </b-field>
                        <b-field horizontal label="ภาคการศึกษา">
                            <b-field >
                            <b-select expanded placeholder="เลือกภาคเรียน">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </b-select>
                            </b-field>
                            <b-field>
                                <b-input name="year" type= "number" min="2500" max="3000" minlength="4" maxlength="4" placeholder="ปีการศึกษา" expanded></b-input>
                            </b-field>
                        </b-field><br>
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
