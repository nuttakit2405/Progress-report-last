<template>
    <!-- template -->
    <!-- :dateData="data" -->
    <div>
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
                <li class="events " :class="[{ 'disable-events': event.waitaccept }]"
                  :key="key" v-for="(event, key) in events[item.date.full]"
                  @click="viewEvent(item.date.full, key, event)" >
                {{event.title}}</li> <!-- เอาหัวเรื่อง มาโชว์-->
              </ul>
            </div>
          </div>
        </Calendar>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import database from '@/database'

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
  methods: {
    async viewEvent (date, key, event) {
      // this.$swal('หัวข้อเรื่องa : ' + event.title + '\n' + 'รายละเอียดการนัดหมาย : ' + event.description)

      if (!event.waitaccept) {
        this.$swal({
          title: 'หัวข้อเรื่อง: ' + event.title,
          text: 'รายละเอียดการนัดหมาย : ' + event.description,
          confirmButtonText: 'แก้ไข <i class="fas fa-edit"></i>',
          showCloseButton: true
        })
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
        database.database.ref(`/allEvents/${year}/${key}`).set(event)
        this.$swal('นัดหมายสำเร็จ', ' ', 'success')
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
        await database.database.ref(`/allEvents/${year}`).child(eventKey).remove()
        await this.$swal('ลบเสร็จสิ้น')
      }
    },
    async addEvent (date) {
    // Use sweetalert2
      let timeOptions = ''
      let time = this.$dayjs()
      for (let i = 0; i < 24; i++) {
        const time1 = time.set('hour', i).set('minute', 0).format('HH:mm')
        timeOptions += `<option>${time1}</option>`
        const time2 = time.set('hour', i).set('minute', 30).format('HH:mm')
        timeOptions += `<option>${time2}</option>`
      }

      const fullDate = this.$dayjs(date.full).format('ddddที่ D MMMM YYYY')

      const rawHtml = `
      <div>
        <span>วัน${fullDate}</span>
        <input id="swal-input1" class="swal2-input" placeholder="เรื่องในการนัดหมาย">
        <textarea id="swal-input2" class="swal2-textarea" placeholder="รายละเอียดในการนัดหมาย"></textarea>
        <div style="display: flex; flex-direction: row; justify-content: center;">
          <span style="display: flex; align-items: center; margin: 0px 5px;">
            เวลา:
            <span class="select" style="width: auto; margin: 0px 5px;">
              <select id="swal-input3">
                ${timeOptions}
              </select>
            </span>
          </span>
          <span style="display: flex; align-items: center; margin: 0px 5px;">
            ถึงเวลา:
            <span class="select" style="width: auto; margin: 0px 5px;">
              <select id="swal-input4">
                ${timeOptions}
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
        // `หัวข้อเรื่อง : formValues[0] + ' \n' + 'รายละเอียดการนัดหมาย : ' + formValues[1] + formValues[2]
        await this.$swal({
          title: `หัวข้อเรื่อง: ${formValues[0]}`,
          html: `<div style="display: flex; flex-direction: column;">
            <span>รายละเอียดการนัดหมาย: ${formValues[1]}</span>
            <span>เวลา ${formValues[2]} - ${formValues[3]}</span>
            <span>วัน${fullDate}</span>
          </div>`
        })
        const data = {
          date: date.full,
          title: formValues[0],
          description: formValues[1],
          waitaccept: true,
          members: [this.user.uid],
          start: formValues[2],
          end: formValues[3]
        }
        database.database.ref(`/allEvents/${date.year}`).push(data)

        // waitaccept: true ถ้าเป็นtrue เมื่อกรอกเสร็จจะเป็นสีเขียว
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
  height: 8em;
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
  background-color: aquamarine;
  margin-top: 5px;
  cursor: pointer;
  padding: 0 5px;
}
.disable-events {
  background-color: lightgray;
}
</style>
