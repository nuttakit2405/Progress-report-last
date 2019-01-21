<template>
  <div>
    <VuePerfectScrollbar @ps-scroll-y="scrollHandle" class="f-left  ft w-100pct h-102calc" :settings="settingsScrollbar" id="vue-perfect-scrollbar-threads">
      <div :key="thread.thread_id" v-for="thread in threads" class="z-id--1">
        <User :thread="thread"></User>
      </div>
    </VuePerfectScrollbar>
  </div>
</template>

<script>
import User from './User'

export default {
  name: 'Thread',
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
  computed: {
    threads () {
      return [{
        'user_id': 'Uc0ef6468fd333657d7aa31393a2cdd92',
        'channel_id': '1524607372',
        'admin_id': ':unassign:',
        'name': 'Ton Piromplad',
        'name_search': 'ton piromplad',
        'raw_profile': {
          'DisplayName': 'Ton Piromplad',
          'PictureURL': 'https://profile.line-scdn.net/0hq9AengQjLhZ8HAPPaRNRQUBZIHsLMiheBH42IAkUIHRXLmhBRig2eQtJICdXKGtGE3lmcQ0VdnJW',
          'StatusMessage': '(t)(o)(n)',
          'UserID': 'Uc0ef6468fd333657d7aa31393a2cdd92'
        },
        'seen': true,
        'last_message': 'Photo sent.',
        'last_update': 1546855270857,
        'tags': null,
        'tags_search': null,
        'auto_reply': false
      }]
    }
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
