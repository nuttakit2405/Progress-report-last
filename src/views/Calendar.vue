<template>
    <div class="container">
      <Calendar
      :mode="mode"
      :renderHeader="renderHeader">
          <div slot="header-left" class="ui-calendar-header__left">
            <button
              :class="['button' ,{ 'is-info': mode === 'month' }]"
              @click="mode = 'month'">
              Month
            </button>
            <button
              :class="['button', { 'is-info': mode === 'week' }]"
              @click="mode = 'week'">
              Week
            </button>
          </div>

          <div slot-scope="item" :class="{'is-not-curr-month': !item.isCurMonth}">
            <div class="calendar-item-date" style="position: relative;">
              <Button style="margin: 2px;" :disabled="!item.isCurMonth || today > item.date.date" :class="['button', 'is-small', { 'is-otherMonth': !item.isCurMonth || today > item.date.date }, {'is-primary': item.isToday}]"
                @click="addEvent(item.date)">
                {{item.date.date}} <!--ตัวเลขวันที่ -->
              </Button>
              <div v-if="events[item.date.full]">
                <div class="columns is-marginless" :key="key" v-for="(event, key) in events[item.date.full]">
                  <div class="column is-paddingless" style="width: 100%; position: relative;">
                    <span style="width: 100%;" :class="['dotdotdot', event.waitaccept ? 'disable-events': 'accept-events' ]" @click="viewEvent(item.date.full, key, event)" :title="event.title">{{event.title}}</span>
                  </div>

                  <div class="column is-paddingless" style="flex: none; width: fit-content;">
                    <button v-if="!(!item.isCurMonth || today > item.date.date) && event.waitaccept"
                  class="button is-small" @click="editEvent(item.date.year, item.date.full, key, event)"><b-icon size="is-small" icon="edit"/></button>
                  </div>

                  <div class="column is-paddingless" style="flex: none; width: fit-content;">
                    <button class="button is-small" @click="removeEvent(item.date.full, key, event)"><b-icon size="is-small" icon="times"/></button>
                    <!-- <button v-if="!(!item.isCurMonth || today > item.date.date)" class="button is-small" @click="removeEvent(item.date.full, key, event)"><b-icon size="is-small" icon="times"/></button> -->
                  </div>
                </div> <!-- เอาหัวเรื่อง มาโชว์-->
              </div>
            </div>
          </div>
        </Calendar>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import db from '@/database'

export default {
  data () {
    return {
      isAddEventModalActive: false,
      mode: 'month',
      time: new Date(),
      today: new Date().getDate()
    }
  },
  computed: {
    ...mapGetters({
      viewMode: 'viewMode',
      allUsers: 'user/allUsers',
      user: 'user/user',
      profile: 'user/profile',
      events: 'events/events',
      projects: 'projects/projects'
    }),
    projectOption () {
      if (this.viewMode === 'subject') {
        return Object.keys(this.projects).filter(key => {
          return !this.projects[key].deleted
        }).map(key => {
          return `<option value="${key}">${this.projects[key].thaiProjectName}</option>`
        })
      } else if (this.viewMode === 'mentor') {
        return Object.keys(this.projects).filter(key => {
          return !this.projects[key].deleted && (this.projects[key].mentor.email === this.user.email)
        }).map(key => {
          return `<option value="${key}">${this.projects[key].thaiProjectName}</option>`
        })
      }
      return ''
    },
    usersWithID () {
      return Object.keys(this.allUsers).map(key => {
        return {
          ...this.allUsers[key],
          key
        }
      })
    },
    projectsWithId () {
      return Object.keys(this.projects).map(key => {
        return {
          key,
          ...this.projects[key]
        }
      })
    }
  },
  watch: {
    user (user) {
      this.initData(user)
    }
  },
  created () {
    this.initData(this.user)
    this.getProjects()
  },
  methods: {
    ...mapActions({
      getEvents: 'events/getEvents',
      getProjects: 'projects/getProjects'
    }),
    initData (user) {
      if (user && user.uid) {
        const year = this.$dayjs().year()
        const uid = user.uid
        this.getEvents({year, uid})
      }
    },
    renderHeader ({ prev, next, selectedDate }) {
      const h = this.$createElement
      const styleButton = {
        margin: '0 5px',
        cursor: 'pointer'
      }
      const prevButton = h('button', {
        on: {
          click: prev
        },
        class: 'button',
        style: styleButton
      }, ['<'])
      const nextButton = h('button', {
        on: {
          click: next
        },
        class: 'button',
        style: styleButton
      }, ['>'])
      let header = this.$dayjs(selectedDate).format('MMMM YYYY')
      if (this.mode === 'week') {
        let [start, end] = selectedDate.split(' - ')
        header = `${this.$dayjs(start).format('DD MMMM YYYY')} - ${this.$dayjs(end).format('DD MMMM YYYY')}`
      }
      return h('div', {
        style: {
          display: 'flex',
          alignItems: 'center'
        }
      },
      [
        prevButton,
        header,
        nextButton
      ])
    },
    async editEvent (year, date, key, event) {
      const data = await this.eventForm(date, event, true)
      if (data) {
        db.database.ref(`/allEvents/${year}`).child(key).set(data)
        const toast = this.$swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000
        })
        await toast({
          type: 'success',
          title: 'successfully'
        })
      }
    },
    async viewEvent (date, key, event) {
      const year = this.$dayjs(date).year()
      if (!event.waitaccept) {
        const {value} = await this.$swal({
          title: 'หัวข้อเรื่อง: ' + event.title,
          html: `<div>รายละเอียดการนัดหมาย : ${event.description}</div> <div>เวลาในการนัดหมาย :  ${event.start} ถึง ${event.end}</div>`,
          confirmButtonText: 'แก้ไข <i class="fas fa-edit"></i>',
          showConfirmButton: false,
          showCloseButton: true
        })

        if (value) {
          this.editEvent(year, date, key, event)
        }
        return
      }

      let config = {
        title: 'หัวข้อเรื่อง: ' + event.title,
        html: `<div>รายละเอียดการนัดหมาย : ${event.description}</div>
                 <div>เวลาในการนัดหมาย : ${event.start} ถึง ${event.end}</div>
                 <div>ยอมรับการนัดหมายในครั้งนี้หรือไม่ ?</div>`,
        showConfirmButton: false
      }
      if (this.profile.userType === 'teacher') {
        config = {
          title: 'หัวข้อเรื่อง: ' + event.title,
          html: `<div>รายละเอียดการนัดหมาย : ${event.description}</div>
                 <div>เวลาในการนัดหมาย : ${event.start} ถึง ${event.end}</div>
                 <div>ยอมรับการนัดหมายในครั้งนี้หรือไม่ ?</div>`,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          showCancelButton: true,
          confirmButtonText: 'ยอมรับ',
          cancelButtonText: 'ปฏิเสธ'
        }
      }

      const viewData = await this.$swal({
        showCloseButton: true,
        ...config
      })

      if (viewData.value) {
        event.waitaccept = false
        const year = this.$dayjs(date).year()
        db.database.ref(`/allEvents/${year}/${key}`).set(event)
        this.$swal('นัดหมายสำเร็จ', ' ', 'success')
      }
      if (viewData.dismiss === 'cancel') {
        const { value } = await this.$swal({
          title: 'ยืนยันการปฏิเสธ',
          text: 'หากยืนยัน การนัดหมายนี้จะถูกลบออกจากปฏิทิน',
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          confirmButtonText: 'ลบ',
          cancelButtonText: 'ยกเลิก'
        })
        if (value) {
          db.database.ref(`/allEvents/${year}/${key}`).remove()
        }
      }
    },
    async removeEvent (date, eventKey, event) {
      const year = this.$dayjs(date).year()
      const { value } = await this.$swal({
        type: 'question',
        title: 'ยืนยันการลบนัดหมายนี้?',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: 'ลบ',
        cancelButtonText: 'ยกเลิก'
      })

      if (value) {
        await db.database.ref(`/allEvents/${year}`).child(eventKey).remove()
        const toast = this.$swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000
        })
        await toast({
          type: 'success',
          title: 'ลบการนัดหมายเรียบร้อยแล้ว'
        })
      }
    },
    async addEvent (date) {
      const data = await this.eventForm(date.full)
      if (data) {
        console.log(data)
        db.database.ref(`/allEvents/${date.year}`).push(data)
        const toast = this.$swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000
        })
        await toast({
          type: 'success',
          title: 'successfully'
        })
      }
    },
    createTimeOptions (select = null) {
      let timeOptions = ''
      let time = this.$dayjs()
      for (let i = 0; i < 24; i++) {
        const time1 = time.set('hour', i).set('minute', 0).format('HH:mm')
        const time2 = time.set('hour', i).set('minute', 30).format('HH:mm')
        timeOptions = timeOptions + (select === time1 ? `<option selected>${time1}</option>` : `<option>${time1}</option>`)
        timeOptions = timeOptions + (select === time2 ? `<option selected>${time2}</option>` : `<option>${time2}</option>`)
      }
      return timeOptions
    },
    async eventForm (date, defaultData = null, editMode = false) {
      const fullDate = this.$dayjs(date).format('ddddที่ D MMMM YYYY')
      const titileValue = defaultData && defaultData.title ? `value="${defaultData.title}"` : ''
      const descriptionValue = defaultData && defaultData.description ? defaultData.description : ''
      const startTimeOption = defaultData && defaultData.start ? this.createTimeOptions(defaultData.start) : this.createTimeOptions()
      const endTimeOption = defaultData && defaultData.end ? this.createTimeOptions(defaultData.end) : this.createTimeOptions()

      const studentForm = `<div style="display: flex; flex-direction: row; justify-content: center;">
          <span style="display: flex; align-items: center; margin: 0px 5px;">
            ต้องการนัด:
            <span class="radio" style="width: auto; margin: 0px 5px;">
               <span class="select" style="width: auto; margin: 0px 5px;">
                  <select id="swal-input5">
                    <option value="mentor">อาจารย์ที่ปรึกษา</option>
                    <option value="subject">อาจารย์ประจำวิชา</option>
                  </select>
                </span>
            </span>
        </div><br>`

      const teacherForm = `<div style="display: flex; flex-direction: row; justify-content: center;">
          <span style="display: flex; align-items: center; margin: 0px 5px;">
            ต้องการนัดโครงงานกลุ่ม:
            <span class="radio" style="width: auto; margin: 0px 5px;">
               <span class="select" style="max-width: 250px; margin: 0px 5px;">
                  <select id="swal-input5">
                    ${this.projectOption}
                  </select>
                </span>
            </span>
        </div>`

      const rawHtml = `<div>
        <span>วัน${fullDate}</span>
        <input id="swal-input1" class="swal2-input" ${titileValue} placeholder="เรื่องในการนัดหมาย">
        <textarea id="swal-input2" class="swal2-textarea" placeholder="รายละเอียดในการนัดหมาย">${descriptionValue}</textarea>
        <div style="display: flex; flex-direction: row; justify-content: center;">
          <span style="display: flex; align-items: center; margin: 0px 5px;">
            เวลา:
            <span class="select" style="width: auto; margin: 0px 5px;">
              <select id="swal-input3">
                ${startTimeOption}
              </select>
            </span>
          </span>
          <span style="display: flex; align-items: center; margin: 0px 5px;">
            ถึงเวลา:
            <span class="select" style="width: auto; margin: 0px 5px;">
              <select id="swal-input4">
                ${endTimeOption}
              </select>
            </span>
          </span>
        </div><br>
        ${this.profile.userType === 'student' ? studentForm : ''}
        ${this.profile.userType === 'teacher' ? teacherForm : ''}
      </div>`
      const {value: formValues} = await this.$swal({
        title: editMode ? 'แก้ไขการนัดหมาย' : 'สร้างการนัดหมาย',
        html: rawHtml,
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById('swal-input1').value, // ดึงค่าไปใช้ใน sweet
            document.getElementById('swal-input2').value, // ดึงค่าไปใช้ใน sweet
            document.getElementById('swal-input3').value, // ดึงค่าไปใช้ใน sweet
            document.getElementById('swal-input4').value, // ดึงค่าไปใช้ใน sweet
            document.getElementById('swal-input5').value // ดึงค่าไปใช้ใน sweet
          ]
        }
      })
      if (formValues) {
        const memberSelect = formValues[4]
        let findUser = null
        if (memberSelect !== '') {
          if (memberSelect === 'mentor') {
            const project = this.projectsWithId.filter(p => this.profile.myProject.findIndex(mp => mp === p.key) !== -1)
            const emailMentor = project.map(p => p.mentor.email)
            const uids = this.usersWithID.filter(user => user.userType === 'teacher' && emailMentor.findIndex(e => e === user.email) !== -1)
            findUser = uids.filter(member => member !== undefined)
          } else if (memberSelect === 'subject') {
            const uids = this.usersWithID.filter(user => user.userType === 'teacher' && user.teacherGroup.some(group => group === 'subject'))
            findUser = uids.filter(member => member !== undefined)
          } else {
            const uids = this.projects[memberSelect].teams.map(member => this.usersWithID.find(user => user.sid === member.id))
            findUser = uids.filter(member => member !== undefined)
          }
        }

        await this.$swal({
          title: `หัวข้อเรื่อง: ${formValues[0]}`,
          html: `<div style="display: flex; flex-direction: column;">
            <span>รายละเอียดการนัดหมาย: ${formValues[1]}</span>
            <span>เวลา ${formValues[2]} - ${formValues[3]}</span>
            <span>วัน${fullDate}</span>
            ${findUser != null ? `<span>นัดหมาย ${findUser.map(member => member.fullName)}</span>` : ''}
          </div>`
        })

        const waitaccept = defaultData && defaultData.waitaccept !== null ? defaultData.waitaccept : true
        const members = defaultData && defaultData.members !== null ? defaultData.members : findUser !== null ? [this.user.uid, ...findUser.map(member => member.key)] : [this.user.uid]
        const data = {
          date: date,
          title: formValues[0],
          description: formValues[1],
          waitaccept: waitaccept,
          members: members,
          start: formValues[2],
          end: formValues[3],
          createdBy: this.user.uid
        }
        if (this.profile.userType === 'teacher') {
          data.waitaccept = false
        }
        return data
      }
      return null
    }
  }
}
</script>

<style>
.vue-calendar-week-title-item {
  text-align: center;
}
.vue-calendar-body-row {
  height: 6em;
}
</style>

<style scoped>
.is-otherMonth {
  color: lightgray;
}
.events {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 2px 0;
  position: relative;
  width: 100%;
}
.event {
  width: 100%;
  padding: 1px 5px;
  margin: 0 3px;
  cursor: pointer;
  font-size: 14px;
}
.dotdotdot {
  cursor: pointer;
  display: inline-block !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}
.accept-events {
  background-color: aquamarine;
}
.disable-events {
  background-color: lightgray;
}
.is-not-curr-month {
  height: 100%;
  background-color: #f9f9f9;
}
</style>

<style>
.vue-calendar-body, .vue-calendar-week-title {
  border-right: 1px solid #e8ebee;
}
</style>
