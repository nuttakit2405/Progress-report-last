<template>
    <!-- template -->
<Calendar startDate="2018-03-07" :dateData="data">
  <div slot="header-left">
    <Button>month</Button>
    <Button>week</Button>
  </div>

  <div
    :class="['calendar-item', { 'is-otherMonth': !isCurMonth }]"
    slot-scope="item"
  >
    <div
      :class="['calendar-item-date']">
      <Button v-on:click="showAlert(item.date)">{{item.date.date}}</Button>
    </div>
    <div class="calendar-item-name">{{item.data.title}}</div>
  </div>
</Calendar>
</template>

<script>
export default {
  // ...
  methods: {
    renderHeader ({ prev, next, selectedDate }) {
      const h = this.$createElement

      const prevButton = h('div', {
        on: {
          click: prev
        }
      }, ['prev'])

      const nextButton = h('div', {
        on: {
          click: next
        }
      }, ['next'])

      return h('div', [prevButton, selectedDate, nextButton])
    },
    async showAlert (date) {
    // Use sweetalert2
      const {value: formValues} = await this.$swal({
        title: 'Multiple inputs' + date.full,
        html:
      '<input id="swal-input1" class="swal2-input">' +
      '<input id="swal-input2" class="swal2-input">',
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById('swal-input1').value,
            document.getElementById('swal-input2').value
          ]
        }
      })
      if (formValues) {
        this.$swal(JSON.stringify(formValues))
      }
    }
  }
}
</script>
