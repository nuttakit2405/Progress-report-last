<template>
  <div v-if="projectSelected">
    <div class="DownloadButton">
      <!-- <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading> -->
      <button class="button is-info DownloadButton" @click="printPDF(projectSelected.thaiProjectName)">
          <b-icon icon="file-download"></b-icon> <span>ดาวโหลดไฟล์</span>
      </button>
    </div>

    <div style="display: flex; justify-content: center;" >
      <div id="frontBook" class="box LayoutFrame">

      <div class="NameProject">ทก.02</div>

      <div class="media logoKMUTNB" style="margin-top:50px;">
        <figure>
          <img src="/static/img/logoKMUTNB.JPG" width="200" alt="Image">
        </figure>
      </div>

          <div class= "topTitle" >
            <center><h2><b class="font" style="font-size: 25px;">แบบรายงานความก้าวหน้าของโครงงานพิเศษ (ปริญญานิพนธ์)</b></h2></center><br>
            <center><h2><b class="font" style="font-size: 25px;">สาขาวิชาเทคโนโลยีสารสนเทศ ภาควิชาเทคโนโลยีสารสนเทศ</b></h2></center><br>
            <center><h2><b class="font" style="font-size: 25px;">คณะเทคโนโลยีและการจัดการอุตสาหกรรม</b></h2></center><br>
          </div>

        <div class="ReportCover">
          <b class="font">ชื่อโครงการ</b>
            <div class="font" style="margin-left:40px;"><b class="font">(ภาษาไทย)</b> {{projectSelected.thaiProjectName}}</div>
            <div class="font" style="margin-left:40px;"><b class="font">(ภาษาอังกฤษ)</b> {{projectSelected.engProjectName}}</div> <br>

          <b class="font">กรณีศึกษา</b>
            <div class="font" style="margin-left:40px;"><b class="font">(ภาษาไทย)</b> {{projectSelected.thaiCaseStudy?projectSelected.thaiCaseStudy:' -'}}</div>
            <div class="font" style="margin-left:40px;"><b class="font">(ภาษาอังกฤษ)</b> {{projectSelected.engCaseStudy?projectSelected.engCaseStudy:' -'}}</div> <br><br><br>

          <b class="font">ชื่อนักศึกษาผู้ทำโครงงาน</b><br>
          <div class="font" style="margin-left:40px;" :key="keyy" v-for="(member, keyy) in projectSelected.teams">
            {{keyy+1}}. {{member.name}} {{member.lastname}}&nbsp;&nbsp;<b class="font">รหัสนักศึกษา</b> {{member.id}} <br>
          </div><br><br><br>

          <b class="font">ชื่ออาจารย์ที่ปรึกษา / อาจารย์ที่ปรึกษาร่วม</b><br>
            <div class="font" style="margin-left:40px;"> <b class="font"> อาจารย์ที่ปรึกษา</b>
              {{project.mentor.position}}{{project.mentor.name}} {{project.mentor.lastname}}
          </div>
            <div class="font" style="margin-left:40px;"> <b class="font"> อาจารย์ที่ปรึกษาร่วม</b>
              {{projectSelected.coOpMentor?projectSelected.coOpMentor:' -'}}<br><br>
          </div><br><br>

        </div>
      </div>
    </div>
<!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
    <div style="display: flex; justify-content: center;" :key="key" v-for="(week, key) in project.scoreboard">
      <div :id="'pdf'+key" class="box LayoutFrame">
        <div class="NameProject">{{projectSelected.thaiProjectName}} &nbsp;&nbsp;หน้า {{key+1}}</div>
        <!-- {{week.radio}} -->
          <div>
            <div class="content" style="font-family: 'Sarabun', sans-serif; font-size: 17px;">
              <center><b class="font">รายงานความก้าวหน้าโครงงานพิเศษ ครั้งที่ {{key+1}}</b></center>
              <center><b class="font">{{thaiDate(week.startDate)}}</b></center><br><br>

              <b class="font">1. เป้าหมายที่ตั้งไว้ในสัปดาห์นี้ (สัปดาห์ที่ {{key+1}})</b><br>
              <div class="font" style="margin-left:20px">1.1 ความก้าวหน้า / ผลงานที่ดำเนินการมาแล้ว</div>
              <div class="cut-text" style="margin-left:50px">
                <b><div class="font">{{week.textProgress}}</div></b>
              </div><br><br>

              <div class="font" style="margin-left:20px">1.2 คิดเป็นร้อยละ &nbsp;<b class="font">{{week.progress?week.progress:'&nbsp;&nbsp;&nbsp;&nbsp;'}}</b> &nbsp;ของงานทั้งหมด</div>

              <div class="font" style="margin-left:50px">จัดทำโครงงานได้
                <b v-if= "week.radio === 1" class="font">ตรงตามเป้าหมาย</b>
                <b v-else-if= "week.radio === 2" class="font">น้อยกว่าเป้าหมาย</b>
                <b v-else class="font"> &nbsp;   </b>
              </div>
                <!-- ตรงตามเป้าหมาย / น้อยกกว่าเป้าหมาย -->
              <br><br>

              <div class="font" style="margin-left:20px">1.3 ปัญหาที่พบ</div>
              <div class="cut-text" style="margin-left:50px">
                <b><div class="font">{{week.problem}}</div></b>
              </div><br><br>

              <div class="font" style="margin-left:20px">1.4 วิธีแก้ปัญหาที่พบ</div>
              <div class="cut-text" style="margin-left:50px">
                <b><div class="font">{{week.solution}}</div></b>
              </div><br><br>
              <div class="font" style="display: flex; justify-content: flex-end; ">
                <b class="font">{{memberConfirm(week.membersSave)}}</b><br>
              </div>
              <div class="font" style="display: flex; justify-content: flex-end;">(ผู้จัดทำโครงการ)</div>
              <br><br>

              <div><b class="font">2. ความเห็นอาจารย์ที่ปรึกษา</b></div>
              <div class="cut-text" style="margin-left:50px">
                <b><div class="font">{{week.mentorComment}}</div></b>
              </div><br><br>

              <div class="font" style="display: flex; justify-content: flex-end; ">
                <b class="font">{{week.membersSave?project.mentor.position:' '}}{{week.membersSave?project.mentor.name:' '}} {{week.membersSave?project.mentor.lastname:' '}}</b><br>
              </div>
              <div class="font" style="display: flex; justify-content: flex-end;">(อาจารย์ที่ปรึกษา)</div>
              <br><br>

              <div><b class="font">3. ความเห็นอาจารย์ประจำวิชา</b></div>
              <div class="cut-text" style="margin-left:50px">
                <b><div class="font">{{week.subjectComment}}</div></b>
                </div><br>

              <div class="font" style="display: flex; justify-content: flex-end; ">
                <b class="font">{{week.membersSave?'รับทราบ':' '}}</b><br>
              </div>
                <div class="font" style="display: flex; justify-content: flex-end;">(อาจารย์ประจำวิชา)</div>
                <br><br><br><br><br><br><br><br><br><br><br><br>

            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/database'
import {mapGetters, mapActions} from 'vuex'

export default {
  props: {
    projectId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      project: {},
      isFullPage: true,
      isLoading: true
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
      projectSelected: 'projects/projectSelected',
      profile: 'user/profile',
      allUsers: 'user/allUsers',
      isLogged: 'user/isLogged'
    }),
    allMembersConfirm () {
      return this.weekData.membersSave && Object.keys(this.weekData.membersSave).length === this.projectSelected.teams.length
    },
    yourConfirm () {
      return this.weekData.membersSave && this.weekData.membersSave[this.user.uid]
    }
  },
  methods: {
    ...mapActions({
      selectProject: 'projects/selectProject'
    }),
    async printPDF (name) {
      const loadingComponent = await this.$loading.open({
        container: this.isFullPage ? null : this.$refs.element.$el
      })
      // loading
      this.gennerate(name, loadingComponent)
    },
    async gennerate (name, loadingComponent) {
      const docDefinition = {
        content: [],
        defaultStyle: {
          font: 'THSarabunNew'
        }
      }

      const pdftoimg = (e) => {
        return new Promise((resolve, reject) => {
          this.$html2canvas(e, {scale: 2, logging: false}).then((canvas) => {
            resolve({
              image: canvas.toDataURL(),
              width: 520
            })
          })
        })
      }

      const data = []
      const page = document.getElementById('frontBook')
      data.push(pdftoimg(page))
      for (let i = 0; i < this.project.scoreboard.length; i++) {
        const page = document.getElementById('pdf' + i)
        data.push(pdftoimg(page))
      }

      docDefinition.content = await Promise.all(data)
      this.$pdfMake.createPdf(docDefinition).download(`รายงานความก้าวหน้าโครงงาน${name}.pdf`, () => {
        loadingComponent.close()
      })
    },
    thaiDate (value) {
      const date = this.$dayjs(value)
      return date.format(`วันที่ DD เดือน MMMM พ.ศ. `) + (date.year() + 543)
    },
    memberConfirm (members) {
      if (members) {
        return Object.keys(members).map(uid => this.allUsers[uid] ? this.allUsers[uid].fullName : '').join(', ')
      }
      return ''
    }
  },
  async created () {
    if (this.projectId) {
      this.selectProject(this.projectId)
    }
    await db.database.ref(`/projects/${this.projectId}`).once('value', snapshot => {
      console.log(snapshot.val())
      this.project = snapshot.val()
    })
  }
}
</script>

<style scoped>
.LayoutFrame{
  margin-top: 25px;
  width: 870px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  /* border-style: double; */
  padding: 0px;
  min-width: 870px;
}

.logoKMUTNB{
  display: flex;
  justify-content: flex-start;
  margin-left: 10px;
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
  margin-left: 190px;
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
.cut-text {
  /* text-overflow: ellipsis; */
  overflow: hidden;
  max-width: 520px;
  white-space: pre;
  font-family: 'Sarabun', sans-serif;
}
.NameProject{
  display: flex;
  justify-content: flex-end;
  margin-right: 10px;
  margin-top: -1px;
  color: gray;
  font-family: 'Sarabun', sans-serif;
  padding: 0px;
}
.ReportCover{
  font-family: 'Sarabun', sans-serif;
  font-size: 23px;
  margin-left:110px;
  margin-top: 60px;
}
</style>
