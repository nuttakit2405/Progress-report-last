<template>
    <!-- template -->
    <!-- :dateData="data" -->

<Calendar startDate="2018-10-13" :renderHeader="renderHeader">
  {{events}}
  <div slot="header-left">
    <Button>month</Button>
    <Button>week</Button>
    <!-- <div class="buttons has-addons is-centered">
    <span class="button">Yes</span>
    </div> -->
  </div>
    <!-- :class="['calendar-item', { 'is-otherMonth': !isCurMonth }]" -->

  <div slot-scope="item">
    <div class="buttons has-addons is-centered">
      <div :class="['calendar-item-date']">
      <!-- <Button v-on:click="showAlert(item.date)">{{item.date.date}}</Button> -->
        <span class="button" v-on:click="showAlert(item.date)">{{item.date.date}} </span>
          <ul v-if="events[item.date.full]">
            <!-- <li :key="key" v-for="(event, key) in events[item.date.full]">{{event.title}}  {{event.description}}</li> -->
            <li :key="key" v-for="(event, key) in events[item.date.full]">{{event.title}} </li>
            <li :key="key" v-for="(event, key) in events[item.date.full]">  {{event.description}}</li>
          </ul>
      </div>
      <div class="calendar-item-name">{{item.data.title}}</div>
    </div>
  </div>
</Calendar>
</template>

<script>
export default {
  data () {
    return {
      events: {
        '2018-02-28': [
          {
            title: 'event',
            description: 'test test'
          }
        ]
      }
    }
  },
  // ...
  methods: {
    renderHeader ({ prev, next, selectedDate }) {
      const h = this.$createElement

      const prevButton = h('div', {
        on: {
          click: prev
        }
      }, ['<'])
      console.log(prevButton)
      const nextButton = h('div', {
        on: {
          click: next
        }
      }, ['>'])
      console.log(selectedDate)
      return h('div', [prevButton, this.$dayjs(selectedDate).format('MMMM YYYY'), nextButton])
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
            document.getElementById('swal-input1').value,
            document.getElementById('swal-input2').value
          ]
        }
      })
      if (formValues) {
        await this.$swal(formValues[0] + ' \n' + formValues[1])
        const data = [
          {
            title: formValues[0],
            description: formValues[1]
          }
        ]
        this.$set(this.events, date.full, data)
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
