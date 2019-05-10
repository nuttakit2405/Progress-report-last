<template>
  <div>

    <div class="DownloadButton">
      <!-- <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading> -->
      <button class="button is-info DownloadButton" @click="printPDF">
          <b-icon icon="file-download"></b-icon> <span>ดาวโหลดไฟล์</span>
      </button>
    </div>
    <div style="display: flex; justify-content: center;" :key="key" v-for="(week, key) in project.scoreboard">
      <div :id="'pdf'+key" class="box LayoutFrame">
        <!-- {{week}} -->
          <div>
            <div class="content" style="font-family: 'Sarabun', sans-serif; font-size: 17px;">
              <center><b class="font">รายงานความก้าวหน้าโครงงานพิเศษ ครั้งที่ {{key+1}}</b></center>
              <center><b class="font">{{thaiDate(week.startDate)}}</b></center><br><br>

              <b class="font">1. เป้าหมายที่ตั้งไว้ในสัปดาห์นี้ (สัปดาห์ที่ {{key+1}})</b><br>
              <div class="font" style="margin-left:20px">1.1 ความก้าวหน้า / ผลงานที่ดำเนินการมาแล้ว</div>
              <div class="font" style="margin-left:50px"><b>{{week.textProgress}}</b></div><br><br><br><br>

              <div class="font" style="margin-left:20px">1.2 คิดเป็นร้อยละ <b>{{week.progress}}</b> ของงานทั้งหมด</div>
              <div class="font" style="margin-left:50px">จัดทำโครงงานได้
                <b v-if= "week.radio === 1" class="font">ตรงตามเป้าหมาย</b>
                <b v-else class="font">น้อยกกว่าเป้าหมาย</b>
              </div>
                <!-- ตรงตามเป้าหมาย / น้อยกกว่าเป้าหมาย -->
              <br><br><br><br>

              <div class="font" style="margin-left:20px">1.3 ปัญหาที่พบ</div>
              <div class="font" style="margin-left:50px"><b>{{week.problem}}</b></div><br><br><br><br>

              <div class="font" style="margin-left:20px">1.4 วิธีแก้ปัญหาที่พบ</div>
              <div class="font" style="margin-left:50px"><b>{{week.solution}}</b></div><br><br><br><br><br>

              <div :key="i" v-for="(members, i) in memberConfirm(week.membersSave)" class="font" style="display: flex; justify-content: flex-end; ">
                <b>{{members}}</b>&nbsp;&nbsp;(ผู้จัดทำโครงการ)
              </div><br><br>

              <div><b class="font">2. ความเห็นอาจารย์ที่ปรึกษา</b></div>
              <div class="font" style="margin-left:50px"><b>{{week.mentorComment}}</b></div><br><br><br>
              <div class="font" style="display: flex; justify-content: flex-end; "><b>{{project.mentor.position}}{{project.mentor.name}} {{project.mentor.lastname}}</b>&nbsp;&nbsp;(อาจารย์ที่ปรึกษา)</div><br><br>

              <div><b class="font">3. ความเห็นอาจารย์ประจำวิชา</b></div>
              <div class="font" style="margin-left:50px"><b>{{week.subjectComment}}</b></div><br><br><br>
              <div class="font" style="display: flex; justify-content: flex-end; "><b>รับทราบ</b>&nbsp;&nbsp;(อาจารย์ประจำวิชา)</div><br><br>

            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/database'
import {mapGetters} from 'vuex'

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
      // loading

      const docDefinition = {
        content: [],
        defaultStyle: {
          font: 'THSarabunNew'
        }
      }

      for (let i = 0; i < this.project.scoreboard.length; i++) {
        const key = i
        const page = document.getElementById('pdf' + key)
        console.log(page)

        const canvas = await this.$html2canvas(page, {scale: 2})
        docDefinition.content.push({
          image: canvas.toDataURL(),
          width: 520
          // marginTop: 20
        })
      }

      await loadingComponent.close()
      await console.log(docDefinition)
      // await this.$pdfMake.createPdf(docDefinition).open()
      await this.$pdfMake.createPdf(docDefinition).download('รายงานความก้าวหน้า.pdf')
    },
    thaiDate (value) {
      const date = this.$dayjs(value)
      return date.format(`วันที่ DD เดือน MMMM พ.ศ. `) + (date.year() + 543)
    },
    memberConfirm (members) {
      if (members) {
        return Object.keys(members).map(uid => this.allUsers[uid] ? this.allUsers[uid].fullName : '')
      }
      return ''
    }
  },
  async created () {
    await db.database.ref(`/projects/${this.projectId}`).once('value', snapshot => {
      console.log(snapshot.val())
      this.project = snapshot.val()
    })
  }
}
</script>

<style scoped>
.LayoutFrame{
  margin-top: 50px;
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
  padding: 60px;
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
