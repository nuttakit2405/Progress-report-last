<template>
  <div class="dp-flex f-drt-column pst-relative h-72calc">
    <div class="f-left w-100pct h-97px thread-info-container pd-20px pd-bt-15px">
      <div class="f-left w-100pct">
        <div class="f-left f-w-bold f-s-18px">
          {{threadSeletced.name}}
        </div>
      </div>
    </div>
    <div>
      <!-- <Messages/> -->
    </div>
    <div class="pst-absolute bt-12px w-99pct pd-t-15px pd-bt-5px bg-cl-white border-type-box">
      <TypeBox ref="tye-box-component"/>
    </div>
  </div>
</template>

<script>
import Messages from './Messages'
import TypeBox from './TypeBox'

export default {
  name: 'ChatView',
  components: {
    Messages,
    TypeBox
  },
  data () {
    return {
      isOpenSearchMessage: false,
      isShowPlugin: false
    }
  },
  computed: {
    threadSeletced () {
      return {
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
      }
    }
  },
  methods: {
    openSearchMessageBox () {
      this.isOpenSearchMessage = true
    },
    closeSearchMessageBox () {
      this.isOpenSearchMessage = false
    },
    async setThreadAutoReply (status) {
      const payload = {
        storeID: this.$route.params.store_id,
        channelID: this.$route.params.channel_id,
        threadID: this.$route.params.thread_id,
        status
      }
      await this.updateLineThreadAutoReply(payload)
    }
  }
}
</script>

<style scoped>
.border-type-box {
  border-top: 1px solid #f0f0f0;
}
.thread-info-container {
  border-bottom: 1px solid #f0f0f0;
}
.is-rotate {
  transform: scaleX(-1);
  -moz-transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  -ms-transform: scaleX(-1);
}
</style>
