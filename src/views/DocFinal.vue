<template>
  <div>
    <div class="DownloadButton">
      <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading>
      <button class="button is-info DownloadButton" @click="printPDF">
          <b-icon icon="file-download"></b-icon> <span>ดาวโหลดแบบขอเสนอ</span>
      </button>
    </div>
    <div style="display: flex; justify-content: center; ">
      <div id="pdf" class="box LayoutFrame">
          <div class="media logoKMUTNB" >
            <figure>
              <img src="/static/img/logoKMUTNB.JPG"  width="200" alt="Image">
            </figure>
          </div>
          <div class= "topBorder">
            <div class= "topTitle" >
              <center><h2><b class="font" style="font-size: 20px;">แบบขอเสนอสอบโครงงานพิเศษ(ปริญญานิพนธ์)</b></h2></center><br>
              <center><h2><b class="font" style="font-size: 20px;">ภาควิชาเทคโนโลยีสารสนเทศ</b></h2></center><br>
              <center><h2><b class="font" style="font-size: 20px;">คณะเทคโนโลยีและการจัดการอุตสาหกรรม</b></h2></center><br>
            </div>
          </div>
          <div v-if="projectSelected">
            <div class="content" style="font-family: 'Sarabun', sans-serif; font-size: 17px;">
              <b class="font">ชื่อ-สกุลนักศึกษา</b>
              {{projectSelected.teams[0].name}}  {{projectSelected.teams[0].lastname}}
                <b class="font" style="margin-left:100px">รหัสประจำตัว</b>
                {{projectSelected.teams[0].id}} <br><br>

              <b class="font">ที่อยู่ที่สามารถติดต่อได้สะดวก</b> <b class="font" style="margin-left:160px">โทรศัพท์</b> {{projectSelected.tel}}<br>
              {{projectSelected.address}}<br><br>
              <b class="font">มีความประสงค์จะขอสอบโครงงานพิเศษ (ปริญญานิพนธ์) หลักสูตร เทคโนโลยีบัณฑิต</b><br>
              <b class="font">วิชา</b> {{projectSelected.subjectRegister}} &nbsp;&nbsp;
              <b class="font">จำนวนหน่วยกิต</b> 3 <b class="font">หน่วยกิต</b> &nbsp;&nbsp;
              <b class="font">ปีการศึกษาที่ลงทะเบียน</b> {{projectSelected.termRegister}} <br><br>
              &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;<b class="font">ชื่อโครงงาน (ภาษาไทย)</b>    {{projectSelected.thaiProjectName}}<br>
              &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b class="font">(ภาษาอังกฤษ)</b>  {{projectSelected.engProjectName}}<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b class="font">กรณีศึกษา:</b>     {{projectSelected.thaiCaseStudy?projectSelected.thaiCaseStudy:' -'}}<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b class="font">(Case Study):</b>  {{projectSelected.engCaseStudy?projectSelected.engCaseStudy: ' -'}}<br><br>
              <div v-if="projectSelected && projectSelected.teams[1]" class="font">
                <b class="font">นักศึกษาผู้ร่วมงาน</b><br>
                <b class="font">ชื่อ-สกุลนักศึกษา</b> {{projectSelected.teams[1].name}} {{projectSelected.teams[1].lastname}}
                <b class="font" style="margin-left:130px">รหัสประจำตัว</b> {{projectSelected.teams[1].id}} <br><br>
              </div>
              <div v-else class="font">
                <b class="font">นักศึกษาผู้ร่วมงาน</b><br>
                <b class="font">ชื่อ-สกุลนักศึกษา</b>  -
                <b class="font" style="margin-left:130px">รหัสประจำตัว</b> - <br><br>
              </div>
              <b class="font">ชื่ออาจารย์ที่ปรึกษา</b> {{projectSelected.mentor.position}} {{projectSelected.mentor.name}} {{projectSelected.mentor.lastname}}<br><br>
              <div v-if="projectSelected && projectSelected.coOpMentor[0]" class="font">
              <b class="font">ชื่ออาจารย์ที่ปรึกษาร่วม</b>{{projectSelected.coOpMentor}}<br><br>
              </div>
              <div v-else class="font">
              <b class="font">ชื่ออาจารย์ที่ปรึกษาร่วม</b>  -<br><br>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b class="font">จึงเรียนมาเพื่อโปรดพิจารณา</b><br><br><br>
              <div class="font" style="display: flex; justify-content: flex-end;">
                ลงชื่อ.................................................(ผู้ยื่นคำร้อง)<br>
                  &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;................/................/..............<br>
              </div>
            </div>

            <div class= "footerBorder"><br>
              <div class="CommentBorder" style="padding: 5px;">
                  <center class="font">ความคิดเห็นอาจารย์ที่ปรึกษาโครงงาน</center><br>
  .............................................................<br>
  .............................................................<br>
  .............................................................<br>
  .............................................................<br>
  .............................................................<br>
  .............................................................<br><br>
                ลงชื่อ.....................................................<br>
                  (...........................................................)<br>
              </div>
              <div class="CommentBorder" style="padding: 5px;">
                <center class="font">ความคิดเห็นหัวหน้าภาควิชา</center><br>
  .............................................................<br>
  .............................................................<br>
  .............................................................<br>
  .............................................................<br>
  .............................................................<br>
  .............................................................<br><br>
                ลงชื่อ.....................................................<br>
                  (...........................................................)<br>
              </div>
              <div class="font" style="padding: 5px;">
                <center class="font" >&nbsp;รายชื่อคณะกรรมการสอบ</center><br>
                ประธาน ......................................................<br><br>
                กรรมการ ....................................................<br><br>
                กรรมการ ....................................................<br><br>
                วันที่สอบ ............./......................./.............<br><br>
                สถานที่จัดสอบ............................................
              </div>
            </div>
          </div>
      </div>

    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  data () {
    return {
      isFullPage: true,
      isLoading: true
    }
  },
  props: {
    projectId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(
      {
        user: 'user/user',
        isLogged: 'user/isLogged',
        profile: 'user/profile',
        projectSelected: 'projects/projectSelected'
      }
    )
  },
  methods: {
    ...mapActions({
      selectProject: 'projects/selectProject'
    }),
    async printPDF () {
      // var docDefinition = {
      //   content: [
      //     { text: 'สวัสดีประเทศไทย reat pdf demo ', fontSize: 15 }
      //   ],
      //   defaultStyle: {
      //     font: 'THSarabunNew'
      //   }
      // }
      // loading
      const loadingComponent = this.$loading.open({
        container: this.isFullPage ? null : this.$refs.element.$el
      })
      setTimeout(() => loadingComponent.close(), 3 * 1000)
      // loading

      const canvas = await this.$html2canvas(document.getElementById('pdf'), {scale: 3})
      console.log(canvas)
      var data = canvas.toDataURL()
      var docDefinition = {
        content: [{
          image: data,
          width: 520,
          marginTop: 20
        }],
        defaultStyle: {
          font: 'THSarabunNew'
        }
      }
      // pdfMake.createPdf(docDefinition).open()
      this.$pdfMake.createPdf(docDefinition).download('แบบขอเสนอสอบโครงงานพิเศษ.pdf')
    }
  },
  created () {
    if (this.projectId) {
      this.selectProject(this.projectId)
      this.isLoading = false
    }
  }
}
</script>

<style scoped>
.LayoutFrame{
  margin-top: 50px;
  width: 920px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-style: double;
  padding: 0px;
  min-width: 870px;
}

.logoKMUTNB{
  display: flex;
  justify-content: flex-start;
  margin-left: 60px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.topBorder{
  padding: 5px;
  border-style: hidden hidden double hidden;
}
.footerBorder{
  display: flex;
  border-style: double hidden hidden hidden;
}
.CommentBorder{
  border-style: hidden double hidden hidden;
  font-family: 'THSarabunNew', sans-serif;
}
.topTitle{
  margin-left: 120px;
  margin-top: -175px;
}
.content{
  padding: 30px;
  margin-left: 50px;
}
.font{
  font-family: 'Sarabun', sans-serif;
}
.DownloadButton{
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  margin-right: 60px;
}
</style>
