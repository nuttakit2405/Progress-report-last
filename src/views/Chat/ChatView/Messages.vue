<template>
  <div>
    <VuePerfectScrollbar
      ref="ps-messages-view"
      class="messages-view"
      :settings="settingsScrollbar"
       @ps-scroll-y="moveScorllY">
        <div v-if="isEveryMessages" class="f-left w-100pct t-al-center">
          <div v-if="messagesView.length > 25" class="w-fit-content mg-hrzt-auto mg-t-15px pd-vtc-5px pd-hrzt-15px bd-w-1px bd-st-solid bd-rd-30px f-s-13px loaded-btn">
            <p class="icon-text-box">
              <i class="mdi mdi-close mdi-13px mg-r-5px"></i>
              โหลดข้อมูลครบแล้ว
            </p>
          </div>
        </div>
        <div v-else class="loading-box">
          <img src="/static/spinner.gif" class="mg-bt-10px">
          <div>{{ oldestMessageTime }}</div>
        </div>
      <LineChat :data="messagesView" :user-image="currentUserPictureProfile" />
    </VuePerfectScrollbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import LineChat from '@/components/LineChat'

export default {
  name: 'Messages',
  data () {
    return {
      oldScrollHeight: 0,
      settingsScrollbar: {
        suppressScrollX: true
      }
    }
  },
  computed: {
    ...mapGetters({
      messagesView: 'Line/chat/messagesView',
      isEveryMessages: 'Line/chat/isEveryMessages',
      objThreads: 'Line/thread/objThreads'
    }),
    oldestMessageTime () {
      if (this.messagesView && this.messagesView[0]) {
        return this.$moment(this.messagesView[0].timestamp).format('D MMM HH:mm:ss')
      }
    },
    currentThreadId () {
      return this.$route.params.thread_id
    },
    currentUserPictureProfile () {
      if (Object.keys(this.objThreads.data).length && this.currentThreadId && this.objThreads.data[this.currentThreadId]) {
        return this.objThreads.data[this.currentThreadId].raw_profile.PictureURL
      } else {
        return ''
      }
    }
  },
  watch: {
    messagesView (newVal, oldVal) {
      const lengthNewVal = Object.keys(newVal).length
      const lengthOldVal = Object.keys(oldVal).length
      // if get messages first time || send new message should scroll to bottom
      if ((lengthNewVal > 0 && lengthOldVal === 0) || lengthNewVal - 1 === lengthOldVal) {
        this.$nextTick(() => {
          this.$refs['ps-messages-view'].$el.scrollTop = this.$refs['ps-messages-view'].$el.scrollHeight
          this.$refs['ps-messages-view'].update()
        })
      }
    },
    currentThreadId (val) {
      if (val) {
        this.callGetLastMessages()
      } else {
        this.clearMessagesData()
      }
    }
  },
  methods: {
    ...mapActions({
      getLastMessages: 'Line/chat/getLastMessages',
      clearMessagesData: 'Line/chat/clearMessagesData',
      loadMoreMessages: 'Line/chat/loadMoreMessages'
    }),
    async moveScorllY (e) {
      if (e.target.scrollTop <= 0 && !this.isEveryMessages && this.messagesView[0]) {
        this.oldScrollHeight = this.$refs['ps-messages-view'].$el.scrollHeight
        const payload = {
          storeID: this.$route.params.store_id,
          channelID: this.$route.params.channel_id,
          threadID: this.currentThreadId,
          timestamp: this.messagesView[0].timestamp
        }
        await this.loadMoreMessages(payload)
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
  height: calc(100vh - 51px - 96px);
}
</style>
