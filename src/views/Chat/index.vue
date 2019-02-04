<template>
  <div class="dp-flex jtf-ct-center"  >
    <div class="chat">
      <div class="h-72calc thread-view">
        <Threads :threads="threads" @select="select" :selected="threadSelected"/>
      </div>
      <div class="h-72calc pst-relative chat-view" >
        <ChatView v-if="threadSelected" :userId="user ? user.uid : ''" :threadSelected="threadSelected" :messages="messages" @sent="sent"/>
        <div class="dp-flex jtf-ct-center w-100pct mg-vtc-30px" v-else>ยังไม่ได้เลือกแชท</div>
      </div>
    </div>
  </div>
</template>

<script>
import Threads from './Threads'
import ChatView from './ChatView'

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Chat',
  props: {
    projectId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      threads: 'chat/threads',
      user: 'user/user',
      messages: 'chat/messages',
      threadSelected: 'chat/threadSelected'
    })
  },
  components: {
    ChatView,
    Threads
  },
  methods: {
    ...mapActions({
      getMessages: 'chat/getMessages',
      getThreads: 'chat/getThreads',
      sentMessage: 'chat/sentMessage',
      clearChat: 'chat/clearChat',
      clearMessages: 'chat/clearMessages',
      selectThread: 'chat/selectThread'
    }),
    sent (text) {
      this.sentMessage({
        chatId: this.projectId,
        message: {
          msg: text,
          recipient: this.projectId,
          sender: this.user.uid,
          timestamp: (new Date()).getTime(),
          type: 'text'
        }
      })
    },
    select (data) {
      this.$router.replace({path: `/chat/${data.user_id}`})
      this.selectThread(data)
    }
  },
  async created () {
    await this.getThreads()
    await this.getMessages(this.projectId)
  },
  beforeDestroy () {
    this.clearChat()
  },
  watch: {
    async projectId (newVal) {
      await this.clearMessages()
      await this.getMessages(newVal)
    },
    threads (val) {
      // console.log('watch thread', val, val.find(thread => thread.user_id === this.projectId))
      this.selectThread(val.find(thread => thread.user_id === this.projectId))
    }
  }
}
</script>

<style>
.mx-h-72calc {
  max-height: calc(100vh - 85px) !important;
}
.h-72calc {
  height: calc(100vh - 85px) !important;
}
</style>

<style scoped>
.chat {
  display: flex;
  min-width: 1000px;
  max-width: 1000px;
  background-color: white;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  margin-top: 12px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.chat-view {
 min-width: 700px;
}
.thread-view {
  min-width: 300px;
  border-right: 1px solid #f0f0f0;
  position: relative;
  max-width: 100%;
}
.plugin-view {
  width: 351px;
  border-left: 1px solid #f0f0f0;
}
.bd-r-plugin-tab {
  border-right: 1px solid #f0f0f0;
}
.bd-bt-plugin-tab {
  border-bottom: 1px solid #f0f0f0;
}
.bg-cl-f5f6fa {
  background-color: #f5f6fa;
}
.plugin-tab:hover {
  background-color: #f0f0f0 !important;
}
</style>
