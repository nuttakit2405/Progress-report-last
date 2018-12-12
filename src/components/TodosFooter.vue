<template>
  <div>
    <div class="columns">
      <div class="column ">
        <!-- <p class="is-pulled-left"> ขอบเขต {{count}} ข้อ</p> -->
        <visibility-input/>
      </div>
    </div>
    <div class="columns is-centered">
      <div class="column is-4">
        <div style="display: flex; justify-content: center;">
        <button class="button is-danger " @click="clearCompeleted()"
          style="font-family: 'Kanit', sans-serif">ลบทั้งหมดที่เสร็จเเล้ว</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VisibilityInput from '@/components/VisibilityInput'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    VisibilityInput
  },
  computed: {
    ...mapGetters(['count', 'countActives', 'countCompleted'])
  },
  methods: {
    ...mapActions(['clearCompeleted'])
  }
}
</script>
