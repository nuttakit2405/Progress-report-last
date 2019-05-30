<template>
    <div class="container pd-t-10px">
      <Calendar v-if="profile"
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
              <div class="w-100pct dp-flex jtf-ct-center">
                <Button
                  :disabled="disabledDateBtn(item)"
                  :class="['button', 'is-small', 'date-btn', { 'is-otherMonth': disabledDateBtn(item) }, {'is-primary': item.isToday}]"
                  @click="addEvent(item.date)"
                >
                  {{item.date.date}} <!--ตัวเลขวันที่ -->
                </Button>
              </div>
              <div class="pd-hrzt-3px" v-if="events[item.date.full]">
                <div class="columns is-marginless" :key="key" v-for="(event, key) in events[item.date.full]">
                  <div class="column is-paddingless" style="width: 100%; position: relative;">
                    <span style="width: 100%; padding: 0 2px" :class="['dotdotdot', event.waitaccept ? 'disable-events': 'accept-events' ]" @click="viewEvent(item.date.full, key, event)" :title="event.title">{{event.title}}</span>
                  </div>

                  <div class="column is-paddingless" style="flex: none; width: fit-content;">
                    <button
                      v-if="!(!item.isCurMonth || today > item.date.date) && event.waitaccept"
                      class="button action-btn is-small"
                      @click="editEvent(item.date.year, item.date.full, key, event)"
                    >
                      <b-icon size="is-small" icon="edit"/>
                    </button>
                  </div>

                  <div class="column is-paddingless" style="flex: none; width: fit-content;">
                    <button class="button action-btn is-small" @click="removeEvent(item.date.full, key, event)">
                      <b-icon size="is-small" icon="times"/>
                    </button>
                    <!-- <button v-if="!(!item.isCurMonth || today > item.date.date)" class="button is-small" @click="removeEvent(item.date.full, key, event)"><b-icon size="is-small" icon="times"/></button> -->
                  </div>
                </div> <!-- เอาหัวเรื่อง มาโชว์-->
              </div>
            </div>
          </div>
        </Calendar>
        <b-loading v-else :active="true"></b-loading>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import db from '@/database'

export default {
  props: {
    projectId: {
      type: String
    }
  },
  data () {
    return {
      isAddEventModalActive: false,
      mode: 'month',
      time: new Date(),
      today: new Date().getDate(),
      now: this.$dayjs()
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
      getProjects: 'projects/getProjects',
      sentNoti: 'sentNoti'
    }),
    initData (user) {
      if (user && user.uid) {
        const year = this.$dayjs().year()
        const uid = user.uid
        this.getEvents({year, uid})
      }
    },
    disabledDateBtn (item) {
      const year = this.now.year()
      const iyear = item.date.year
      if (iyear < year) {
        return true
      }

      const month = this.now.month() + 1
      const imonth = item.date.month
      if (imonth < month) {
        return true
      } else if (imonth > month) {
        return false
      }

      const day = this.now.date()
      const iday = item.date.date
      if (iday < day) {
        return true
      }

      return false
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
      const data = await this.eventForm(date, event, true, event.projectId)
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
        this.$swal({
          title: 'นัดหมายสำเร็จ',
          type: 'success',
          confirmButtonText: 'ตกลง'
        })
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
        this.notiEvent(data)
        const toast = this.$swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000
        })
        await toast({
          type: 'success',
          title: 'นัดหมายสำเร็จ',
          confirmButtonText: 'ตกลง'
        })
      }
    },
    notiEvent (data) {
      const content = `
      นัดหมายถูกสร้างขึ้น <b>วัน${this.$dayjs(data.date).format('dddที่ DD MMMM YYYY')} เวลา ${data.start} ถึง ${data.end}<b><br>
      หัวข้อ: ${data.title}<br>
      รายระเอียด: ${data.description}<br>
      โดย ${this.profile.fullName}
      `
      const noti = {
        to: data.members,
        subject: `มีการนัดหมาย`,
        content: content
      }
      console.log(noti)
      this.sentNoti(noti)
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
    projectOption (projectId = '') {
      if (this.viewMode === 'subject') {
        return Object.keys(this.projects).filter(key => {
          return !this.projects[key].deleted
        }).map(key => {
          return `<option value="${key}" ${key === projectId ? 'selected' : ''}>${this.projects[key].thaiProjectName}</option>`
        })
      } else if (this.viewMode === 'mentor') {
        return Object.keys(this.projects).filter(key => {
          return !this.projects[key].deleted && (this.projects[key].mentor.email === this.user.email)
        }).map(key => {
          return `<option value="${key}" ${key === projectId ? 'selected' : ''}>${this.projects[key].thaiProjectName}</option>`
        })
      } else if (this.viewMode === 'student') {
        return this.profile.myProject.filter(key => {
          return this.projects[key] && !this.projects[key].deleted
        }).map(key => {
          return `<option value="${key}" ${key === projectId ? 'selected' : ''}>${this.projects[key].thaiProjectName}</option>`
        })
      }
      return ''
    },
    async eventForm (date, defaultData = null, editMode = false, projectId = '') {
      console.log({date, defaultData, editMode, projectId})
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
                <select id="swal-input6">
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
                    ${this.projectOption(editMode ? projectId : this.projectId)}
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
        ${this.profile.userType === 'student' ? teacherForm + '<br>' + studentForm : ''}
        ${this.profile.userType === 'teacher' ? teacherForm : ''}
      </div>`
      const {value: formValues} = await this.$swal({
        title: editMode ? 'แก้ไขการนัดหมาย' : 'สร้างการนัดหมาย',
        html: rawHtml,
        focusConfirm: false,
        confirmButtonText: 'ตกลง',
        onBeforeOpen: () => {
          const content = this.$swal.getContent()
          const $content = content.querySelector.bind(content)
          const input1 = $content('#swal-input1')
          const input2 = $content('#swal-input2')
          var flag1 = false
          var flag2 = false

          const actions = this.$swal.getActions()
          const $actions = actions.querySelector.bind(actions)

          const value1 = input1.value
          const value2 = input1.value
          if (!value1.trim() && !value2.trim()) {
            $actions('.swal2-confirm').disabled = true
          }

          function update1 (e) {
            updateValue(e.srcElement.value, 1)
          }
          function update2 (e) {
            updateValue(e.srcElement.value, 2)
          }
          function updateValue (value, input) {
            if (value.trim() !== '') {
              if (input === 1) {
                flag1 = true
              }
              if (input === 2) {
                flag2 = true
              }
            } else {
              if (input === 1) {
                flag1 = false
              }
              if (input === 2) {
                flag2 = false
              }
            }

            if (flag1 && flag2) {
              $actions('.swal2-confirm').disabled = false
            } else {
              $actions('.swal2-confirm').disabled = true
            }
          }

          input1.addEventListener('input', update1)
          input2.addEventListener('input', update2)
        },
        preConfirm: () => {
          return [
            document.getElementById('swal-input1').value, // ดึงค่าไปใช้ใน sweet
            document.getElementById('swal-input2').value, // ดึงค่าไปใช้ใน sweet
            document.getElementById('swal-input3').value, // ดึงค่าไปใช้ใน sweet
            document.getElementById('swal-input4').value, // ดึงค่าไปใช้ใน sweet
            document.getElementById('swal-input5').value, // ดึงค่าไปใช้ใน sweet
            document.getElementById('swal-input6') ? document.getElementById('swal-input6').value : '' // ดึงค่าไปใช้ใน sweet
          ]
        }
      })
      if (formValues) {
        const projectId = formValues[4]
        const teacherSelect = formValues[5]
        let findUser = null
        if (projectId !== '' && this.viewMode !== 'student') {
          const uids = this.projects[projectId].teams.map(member => {
            return this.usersWithID.find(user => user.sid === member.id)
          })
          findUser = uids.filter(member => member !== undefined)
        }

        if (teacherSelect === 'mentor') {
          const project = this.projectsWithId.filter(p => p.key === projectId)
          const emailMentor = project.map(p => p.mentor.email)
          const uids = this.usersWithID.filter(user => user.userType === 'teacher' && emailMentor.findIndex(e => e === user.email) !== -1)
          findUser = uids.filter(member => member !== undefined)
        } else if (teacherSelect === 'subject') {
          const uids = this.usersWithID.filter(user => user.userType === 'teacher' && user.teacherGroup.some(group => group === 'subject'))
          findUser = uids.filter(member => member !== undefined)
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
          projectId: projectId,
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
.vue-calendar-body, .vue-calendar-week-title {
  border-right: 1px solid #e8ebee;
}
.vue-calendar-body {
  display: block !important;
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

.date-btn {
  margin: 3px;
  width: 23px;
  height: 23px;
  padding: 2px;
  border-radius: 50%;
  border: 0px;
}
.date-btn:disabled {
  color: black;
}
.date-btn:hover {
  background: #e8ebee;
  color: black;
}
.action-btn {
  width: 25px;
  height: 25px;
  padding: 3px;
  margin-left: 1px;
}
</style>
