<template>
    <!-- template -->
    <!-- :dateData="data" -->

<Calendar startDate="2018-10-13"
 :mode="mode">
  <div slot="header-left" class="ui-calendar-header__left">
    <button
      :class="['ui-calendar-modeBtn' ,{ active: mode === 'month' }]"
      @click="mode = 'month'"
    >
      Month
    </button>
    <button
      :class="['ui-calendar-modeBtn', { active: mode === 'week' }]"
      @click="mode = 'week'"
    >
      Week
    </button>
  </div>

  <div slot-scope="item" >
    <div class="calendar-item-date">
      <Button :class="['button', { 'is-otherMonth': !item.isCurMonth }]"
        @click="showAlert(item.date)">
        {{item.date.date}} <!--ตัวเลขวันที่ -->
      </Button>
      <ul v-if="events[item.date.full]">
        <li class="events " :class="[{ 'disable-events': event.waitaccept  }]"
          :key="key" v-for="(event, key) in events[item.date.full]"
          @click="viewEvent(event, true )" >
        {{event.title}}</li> <!-- เอาหัวเรื่อง มาโชว์-->
      </ul>
    </div>
  </div>
</Calendar>
</template>

<script>
export default {
  data () {
    return {
      mode: 'month',
      events: {
        '2018-10-03': [
          {
            title: 'event',
            description: 'test test',
            waitaccept: true
          }
        ]
      }
    }
  },
  methods: {
    viewEvent (event) {
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

      const prevButton = h('div', {
        on: {
          click: prev
        },
        style: styleButton
      }, ['<'])

      const nextButton = h('div', {
        on: {
          click: next
        },
        style: styleButton
      }, ['>'])
      console.log(selectedDate)
      return h('div', {
        style: {
          display: 'flex'
        }
      }, [prevButton, this.$dayjs(selectedDate).format('MMMM YYYY'), nextButton])
    },
    async showAlert (date) {
    // Use sweetalert2
      const {value: formValues} = await this.$swal({
        title: 'การนัดหมาย',
        html: (date.full) +
      '<input id="swal-input1" class="swal2-input" placeholder="เรื่องในการนัดหมาย">' +
      '<textarea id="swal-input2" class="swal2-input" placeholder="รายละเอียดในการนัดหมาย" />',
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById('swal-input1').value, // ดึงค่าไปใช้ใน sweet
            document.getElementById('swal-input2').value // ดึงค่าไปใช้ใน sweet
          ]
        }
      })
      if (formValues) {
        await this.$swal('หัวข้อเรื่องs : ' + formValues[0] + ' \n' + 'รายละเอียดการนัดหมาย : ' + formValues[1])
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
        // waitaccept: true ถ้าเป็นtrue เมื่อกรอกเสร็จจะเป็นสีเขียว
        console.log(this.events)
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
