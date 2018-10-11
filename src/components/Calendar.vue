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
        title: 'การนัดหมาย',
        html: (date.full) +
      '<input id="swal-input1" class="swal2-input" placeholder="เรื่องในการนัดหมาย">' +
      '<input id="swal-input2" class="swal2-input" placeholder="รายละเอียดในการนัดหมาย">',
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
        const toast = this.$swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000
        })
        await toast({
          type: 'success',
          title: 'Signed in successfully'
        })
      }
    }
    // aa
    // async Alert (date) {
    // // Use sweetalert2
    //   const toast = this.swal.mixin({
    //     toast: true,
    //     position: 'top-end',
    //     showConfirmButton: false,
    //     timer: 3000
    //   })

    //   toast({
    //     type: 'success',
    //     title: 'Signed in successfully'
    //   })
    // }
    // aa
  }
}
</script>
