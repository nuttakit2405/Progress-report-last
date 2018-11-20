<template>
    <!-- template -->
    <!-- :dateData="data" -->
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

          <div slot-scope="item" >
            <div class="calendar-item-date">
              <Button :class="['button', { 'is-otherMonth': !item.isCurMonth }, {'is-primary': item.isToday}]"
                @click="addEvent(item.date)">
                {{item.date.date}} <!--ตัวเลขวันที่ -->
              </Button>
              <ul v-if="events[item.date.full]">
                <li class="events" :key="key" v-for="(event, key) in events[item.date.full]">
                  <span :class="['event', event.waitaccept ? 'disable-events': 'accept-events' ]" @click="viewEvent(item.date.full, key, event)">{{event.title}}</span>
                  <button class="button is-small" @click="removeEvent(item.date.full, key, event)"><b-icon size="is-small" icon="times"/></button>
                </li> <!-- เอาหัวเรื่อง มาโชว์-->
              </ul>
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
      time: new Date()
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
      events: 'events/events'
    })
  },
  watch: {
    user (user) {
      this.initData(user)
    }
  },
  created () {
    this.initData(this.user)
  },
  methods: {
    ...mapActions({
      getEvents: 'events/getEvents'
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
    async viewEvent (date, key, event) {
      const year = this.$dayjs(date).year()
      if (!event.waitaccept) {
        const {value} = await this.$swal({
          title: 'หัวข้อเรื่อง: ' + event.title,
          text: 'รายละเอียดการนัดหมาย : ' + event.description,
          confirmButtonText: 'แก้ไข <i class="fas fa-edit"></i>',
          showCloseButton: true
        })

        if (value) {
          const data = await this.eventForm(date, event)
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
        }
        return
      }

      const { value } = await this.$swal({
        title: 'หัวข้อเรื่อง: ' + event.title + '\n' + 'รายละเอียดการนัดหมาย : ' + event.description,
        text: 'ตกลงในการนัดหมายในครั้งนี้หรือไม่ ?',
        // type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Accept'
      })
      if (value) {
        event.waitaccept = false
        const year = this.$dayjs(date).year()
        db.database.ref(`/allEvents/${year}/${key}`).set(event)
        this.$swal('นัดหมายสำเร็จ', ' ', 'success')
      }
    },
    async removeEvent (date, eventKey, event) {
      const year = this.$dayjs(date).year()
      const { value } = await this.$swal({
        type: 'error',
        title: 'ยืนยันการลบนัดหมายนี้?',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: 'ลบ',
        cancelButtonText: 'ยกเลิก'
      })

      if (value) {
        await db.database.ref(`/allEvents/${year}`).child(eventKey).remove()
        await this.$swal('ลบเสร็จสิ้น')
      }
    },
    async addEvent (date) {
      const data = await this.eventForm(date.full)
      if (data) {
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
    async eventForm (date, defaultData = null) {
      const fullDate = this.$dayjs(date).format('ddddที่ D MMMM YYYY')
      const titileValue = defaultData && defaultData.title ? `value="${defaultData.title}"` : ''
      const descriptionValue = defaultData && defaultData.description ? defaultData.description : ''
      const startTimeOption = defaultData && defaultData.start ? this.createTimeOptions(defaultData.start) : this.createTimeOptions()
      const endTimeOption = defaultData && defaultData.end ? this.createTimeOptions(defaultData.end) : this.createTimeOptions()
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
        
        <div style="display: flex; flex-direction: row; justify-content: center;">
          <span style="display: flex; align-items: center; margin: 0px 5px;">
            ต้องการนัด:
            <span class="radio" style="width: auto; margin: 0px 5px;">
               <span class="select" style="width: auto; margin: 0px 5px;">
                  <select id="swal-input5">
                    <option value="mentor">อาจารย์ที่ปรึกษา</option>
                    <option value="teacher">อาจารย์ประจำวิชา</option>
                  </select>
                </span>
            </span>
        </div><br>

        <div style="display: flex; flex-direction: row; justify-content: center;">
          <span style="display: flex; align-items: center; margin: 0px 5px;">
            ต้องการนัด:
            <span class="radio" style="width: auto; margin: 0px 5px;">
               <span class="select" style="width: auto; margin: 0px 5px;">
                  <select id="swal-input6">
                    <option value="1">กลุ่ม1</option>
                    <option value="2">กลุ่ม2</option>
                  </select>
                </span>
            </span>
        </div>

      </div>`
      const {value: formValues} = await this.$swal({
        title: 'สร้างการนัดหมาย',
        html: rawHtml,
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById('swal-input1').value, // ดึงค่าไปใช้ใน sweet
            document.getElementById('swal-input2').value, // ดึงค่าไปใช้ใน sweet
            document.getElementById('swal-input3').value, // ดึงค่าไปใช้ใน sweet
            document.getElementById('swal-input4').value // ดึงค่าไปใช้ใน sweet
          ]
        }
      })
      if (formValues) {
        await this.$swal({
          title: `หัวข้อเรื่อง: ${formValues[0]}`,
          html: `<div style="display: flex; flex-direction: column;">
            <span>รายละเอียดการนัดหมาย: ${formValues[1]}</span>
            <span>เวลา ${formValues[2]} - ${formValues[3]}</span>
            <span>วัน${fullDate}</span>
          </div>`
        })
        const waitaccept = defaultData && defaultData.waitaccept !== null ? defaultData.waitaccept : true
        const members = defaultData && defaultData.members !== null ? defaultData.members : [this.user.uid]
        const data = {
          date: date,
          title: formValues[0],
          description: formValues[1],
          waitaccept: waitaccept,
          members: members,
          start: formValues[2],
          end: formValues[3]
        }
        return data
      }
      return null
    }
  },
  mounted () {
    // tcTZz4y4dlTzevPyk2LVjtkG9as2
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
}
.event {
  display: flex;
  width: 100%;
  padding: 1px 5px;
  margin: 0 3px;
  cursor: pointer;
}
.accept-events {
  background-color: aquamarine;
}
.disable-events {
  background-color: lightgray;
}
</style>
