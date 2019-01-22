<template>
  <VuePerfectScrollbar @ps-scroll-y="scrollHandle" class="f-left ft w-100pct h-100pct" :settings="settingsScrollbar" id="vue-perfect-scrollbar-threads">
    <div :key="thread.thread_id" v-for="thread in threads" class="z-id--1">
      <User :thread="thread"></User>
    </div>
  </VuePerfectScrollbar>
</template>

<script>
import User from './User'

export default {
  name: 'Thread',
  props: {
    threads: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      settingsScrollbar: {
        suppressScrollX: true
      },
      statusPluginSelected: -1
    }
  },
  components: {
    User
  },
  methods: {
    scrollHandle (evt) {
      // const scrollBottom = evt.target.scrollTop + evt.target.clientHeight
      // const height = evt.target.scrollHeight
      // if (evt.target.scrollTop !== 0 && scrollBottom === height) {
      //   let payload = {
      //     storeID: this.storeID,
      //     channelID: this.channelID,
      //     timestamp: this.threads.data[this.threads.data.length - 1].last_update
      //   }
      //   this.fetchThreads(payload)
      // }
    }
  }
}
</script>

<style>
#vue-perfect-scrollbar-threads .ps__scrollbar-y-rail {
  z-index: 999;
}
</style>

<style scoped>
.status-box {
  border-bottom: 1px solid #f0f0f0;
}
.status-item {
  border-left: 1px solid #f0f0f0;
}
</style>
