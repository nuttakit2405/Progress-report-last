<template>
    <!-- template -->
    <!-- :dateData="data" -->
    <div class="column">
      <Calendar startDate="2018-10-13" :mode="mode" :renderHeader="renderHeader">
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
          <!-- <div slot="header-left" class="ui-calendar-header__left">
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
          </div> -->

          <div slot-scope="item" >
            <div class="calendar-item-date">
              <Button :class="['button', { 'is-otherMonth': !item.isCurMonth }]"
                @click="showAlert(item.date)">
                {{item.date.date}} <!--ตัวเลขวันที่ -->
              </Button>
              <ul v-if="events[item.date.full]">
                <li class="events " :class="[{ 'disable-events': event.waitaccept  }]"
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
    viewEvent (date, key, event) {
      // this.$swal('หัวข้อเรื่องa : ' + event.title + '\n' + 'รายละเอียดการนัดหมาย : ' + event.description)
      this.$swal({
        title: 'หัวข้อเรื่องa : ' + event.title + '\n' + 'รายละเอียดการนัดหมาย : ' + event.description,
        text: 'ตกลงในการนัดหมายในครั้งนี้หรือไม่ ?',
        // type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Accept'
      }).then((result) => {
        if (result.value) {
          event.waitaccept = false
          database.database.ref(`/events/${this.user.uid}/${date}/${key}`).set(event)
          this.$swal(
            'นัดหมายสำเร็จ',
            ' ',
            'success'
          )
        }
      })
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
    async showAlert (date) {
    // Use sweetalert2
      let timeOptions = ''
      let time = this.$dayjs()
      for (let i = 0; i < 24; i++) {
        const time1 = time.set('hour', i).set('minute', 0).format('HH:mm')
        timeOptions += `<option>${time1}</option>`
        const time2 = time.set('hour', i).set('minute', 30).format('HH:mm')
        timeOptions += `<option>${time2}</option>`
      }
      const {value: formValues} = await this.$swal({
        title: 'การนัดหมาย',
        html: (date.full) +
      '<input id="swal-input1" class="swal2-input" placeholder="เรื่องในการนัดหมาย">' +
      '<textarea id="swal-input2" class="swal2-input" placeholder="รายละเอียดในการนัดหมาย"></textarea>' +
      'เวลา <select class="input" style="width: auto" id="swal-input3">' + timeOptions + '</select> ถึง ' +
      '<select class="input" style="width: auto" id="swal-input4">' + timeOptions + '</select>',
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
        await this.$swal('หัวข้อเรื่องs : ' + formValues[0] + ' \n' + 'รายละเอียดการนัดหมาย : ' + formValues[1] + formValues[2])
        const data = {
          title: formValues[0],
          description: formValues[1],
          waitaccept: true
        }

        if (!this.events[date.full]) {
          this.$set(this.events, date.full, [data])
        } else {
          this.events[date.full].push(data)
        }
        database.database.ref(`/events/${this.user.uid}/${date.full}`).push(data)
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
  background-color: aquamarine;
  margin-top: 5px;
  cursor: pointer;
  padding: 0 5px;
}
.disable-events {
  background-color: lightgray;
}
</style>
