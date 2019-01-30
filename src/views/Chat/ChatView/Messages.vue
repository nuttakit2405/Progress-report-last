<template>
  <VuePerfectScrollbar ref="ps-messages-view" class="messages-view"
    :settings="settingsScrollbar"
      @ps-scroll-y="moveScorllY">
    <LineChat :userId="userId" :data="messages" />
  </VuePerfectScrollbar>
</template>

<script>
import LineChat from '@/components/LineChat'

export default {
  name: 'Messages',
  props: {
    messages: {
      type: Array,
      default: () => []
    },
    userId: {
      type: String,
      required: true
    }
  },
  watch: {
    messages () {
      this.$refs['ps-messages-view'].$el.scrollTop = this.$refs['ps-messages-view'].$el.scrollHeight
      this.$refs['ps-messages-view'].update()
    }
  },
  data () {
    return {
      oldScrollHeight: 0,
      settingsScrollbar: {
        suppressScrollX: true
      },
      isEveryMessages: true
    }
  },
  methods: {
    async moveScorllY (e) {
      if (e.target.scrollTop <= 0 && !this.isEveryMessages && this.messagesView[0]) {
        this.oldScrollHeight = this.$refs['ps-messages-view'].$el.scrollHeight
        this.$refs['ps-messages-view'].$el.scrollTop = this.$refs['ps-messages-view'].$el.scrollHeight - this.oldScrollHeight
        this.$refs['ps-messages-view'].update()
      }
    },
    async callGetLastMessages () {
      const payload = {
        storeID: this.$route.params.store_id,
        channelID: this.$route.params.channel_id,
        threadID: this.currentThreadId
      }
      await this.clearMessagesData()
      await this.getLastMessages(payload)
    }
  },
  components: {
    LineChat
  }
}
</script>

<style scoped>
.loading-box {
  float: left;
  width: 100%;
  text-align: center;
  color: #777;
  font-size: 14px;
  margin: 10px 0;
  text-align: center;
}
.loaded-btn {
  border-color: #E4E8EB;
  color: #444;
}
.icon-text-box {
  display: inline-flex;
  vertical-align: middle;
}
.messages-view {
  height: 100%;
}
</style>
