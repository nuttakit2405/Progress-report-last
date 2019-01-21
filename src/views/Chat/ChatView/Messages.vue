<template>
  <VuePerfectScrollbar ref="ps-messages-view" class="messages-view"
    :settings="settingsScrollbar"
      @ps-scroll-y="moveScorllY">
    <LineChat :data="messagesView" />
  </VuePerfectScrollbar>
</template>

<script>
import LineChat from '@/components/LineChat'

export default {
  name: 'Messages',
  data () {
    return {
      oldScrollHeight: 0,
      settingsScrollbar: {
        suppressScrollX: true
      },
      isEveryMessages: true
    }
  },
  computed: {
    messagesView () {
      return [
        {
          'msg_id': '8570670381268',
          'timestamp': 1536916185394,
          'msg': 'Hi',
          'recipient': '1524607372',
          'sender': 'Uc0ef6468fd333657d7aa31393a2cdd92',
          'type': 'text'
        },
        {
          'msg_id': '8570670381268',
          'timestamp': 1536916185394,
          'msg': 'Hi',
          'recipient': '1524607372',
          'sender': 'Uc0ef6468fd333657d7aa31393a2cdd92',
          'type': 'text'
        },
        {
          'msg_id': '8570670381268',
          'timestamp': 1536916185394,
          'msg': 'Hi',
          'recipient': '1524607372',
          'sender': 'Uc0ef6468fd333657d7aa31393a2cdd92',
          'type': 'text'
        },
        {
          'msg_id': '8570670381268',
          'timestamp': 1536916185394,
          'msg': 'Hi',
          'recipient': '1524607372',
          'sender': 'Uc0ef6468fd333657d7aa31393a2cdd92',
          'type': 'text'
        },
        {
          'msg_id': '8570670381268',
          'timestamp': 1536916185394,
          'msg': 'Hi',
          'recipient': '1524607372',
          'sender': 'Uc0ef6468fd333657d7aa31393a2cdd92',
          'type': 'text'
        },
        {
          'msg_id': '8570670381268',
          'timestamp': 1536916185394,
          'msg': 'Hi',
          'recipient': '1524607372',
          'sender': 'Uc0ef6468fd333657d7aa31393a2cdd92',
          'type': 'text'
        },
        {
          'msg_id': '8570670381268',
          'timestamp': 1536916185394,
          'msg': 'Hi',
          'recipient': '1524607372',
          'sender': 'Uc0ef6468fd333657d7aa31393a2cdd92',
          'type': 'text'
        },
        {
          'msg_id': '8570670381268',
          'timestamp': 1536916185394,
          'msg': 'Hi',
          'recipient': '1524607372',
          'sender': 'Uc0ef6468fd333657d7aa31393a2cdd92',
          'type': 'text'
        },
        {
          'msg_id': '8570670381268',
          'timestamp': 1536916185394,
          'msg': 'Hi',
          'recipient': '1524607372',
          'sender': 'Uc0ef6468fd333657d7aa31393a2cdd92',
          'type': 'text'
        },
        {
          'msg_id': '8570670381268',
          'timestamp': 1536916185394,
          'msg': 'Hi',
          'recipient': '1524607372',
          'sender': 'Uc0ef6468fd333657d7aa31393a2cdd92',
          'type': 'text'
        },
        {
          'msg_id': '8570670381268',
          'timestamp': 1536916185394,
          'msg': 'Hi',
          'recipient': '1524607372',
          'sender': 'Uc0ef6468fd333657d7aa31393a2cdd92',
          'type': 'text'
        },
        {
          'msg_id': '8570670381268',
          'timestamp': 1536916185394,
          'msg': 'Hi',
          'recipient': '1524607372',
          'sender': 'Uc0ef6468fd333657d7aa31393a2cdd92',
          'type': 'text'
        },
        {
          'msg_id': '8570670381268',
          'timestamp': 1536916185394,
          'msg': 'Hi',
          'recipient': '1524607372',
          'sender': 'Uc0ef6468fd333657d7aa31393a2cdd92',
          'type': 'text'
        },
        {
          'msg_id': '8570670381268',
          'timestamp': 1536916185394,
          'msg': 'Hi',
          'recipient': '1524607372',
          'sender': 'Uc0ef6468fd333657d7aa31393a2cdd92',
          'type': 'text'
        },
        {
          'msg_id': '8570670381268',
          'timestamp': 1536916185394,
          'msg': 'Hi',
          'recipient': '1524607372',
          'sender': 'Uc0ef6468fd333657d7aa31393a2cdd92',
          'type': 'text'
        },
        {
          'msg_id': '8570670381268',
          'timestamp': 1536916185394,
          'msg': 'Hi',
          'recipient': '1524607372',
          'sender': 'Uc0ef6468fd333657d7aa31393a2cdd92',
          'type': 'text'
        },
        {
          'msg_id': '8570670381268',
          'timestamp': 1536916185394,
          'msg': 'Hi',
          'recipient': '1524607372',
          'sender': 'Uc0ef6468fd333657d7aa31393a2cdd92',
          'type': 'text'
        },
        {
          'msg_id': '8570670381268',
          'timestamp': 1536916185394,
          'msg': 'Hi',
          'recipient': '1524607372',
          'sender': 'Uc0ef6468fd333657d7aa31393a2cdd92',
          'type': 'text'
        },
        {
          'msg_id': '8570670381268',
          'timestamp': 1536916185394,
          'msg': 'Hi',
          'recipient': '1524607372',
          'sender': 'Uc0ef6468fd333657d7aa31393a2cdd92',
          'type': 'text'
        },
        {
          'msg_id': '8570670381268',
          'timestamp': 1536916185394,
          'msg': 'Hi',
          'recipient': '1524607372',
          'sender': 'Uc0ef6468fd333657d7aa31393a2cdd92',
          'type': 'text'
        },
        {
          'msg_id': '8570670381268',
          'timestamp': 1536916185394,
          'msg': 'Hi',
          'recipient': '1524607372',
          'sender': 'Uc0ef6468fd333657d7aa31393a2cdd92',
          'type': 'text'
        }
      ]
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
  },
  async mounted () {
    if (this.$route.params.channel_id && this.$route.params.thread_id) {
      await this.callGetLastMessages()
    }
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
