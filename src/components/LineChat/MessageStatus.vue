<template>
  <div>
    <span
      @click="resendErrorMessage(message)"
      v-if="message.status === 'error' || message.status === 'pending'"
      class="f-right pd-t-8px cs-pointer">
      <b-tooltip
        :label="message.status === 'error' ? 'Click for resend' : ''"
        type="is-light"
        position="is-left"
        animated>
        <b-icon v-if="message.status === 'error'" icon="alert-circle-outline cl-danger pd-r-10px"></b-icon>
      </b-tooltip>
    </span>
    <span
      v-if="message.status === 'success' || message.status === undefined"
      :class="{'f-right  pd-r-5px' :isMsgFromBot, 'f-left  pd-l-5px' :!isMsgFromBot}"
      class="pd-t-10px f-s-12px cl-8A899B">
      {{ message.timestamp | timeFormat }}
    </span>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import dayjs from 'dayjs'

const now = dayjs()

export default {
  name: 'ChatText',
  props: {
    message: {
      type: Object,
      required: true
    },
    userId: {
      type: String,
      required: true
    }
  },
  filters: {
    timeFormat (time) {
      const thisTime = dayjs(time)
      let format = 'HH:mm'
      if (now.format('DD/MM/YYYY') !== thisTime.format('DD/MM/YYYY')) {
        format = 'ddd ' + format
      }
      return thisTime.format(format)
    }
  },
  methods: {
    ...mapActions({
      resendLineText: 'Line/chat/resendLineText',
      resendLineImage: 'Line/chat/resendLineImage'
    }),
    resendErrorMessage (data) {
      if (data.status === 'error') {
        if (data.type === 'text') {
          const text = data.msg.trim().slice()
          this.resendLineText({
            storeID: this.$route.params.store_id,
            channelID: this.channelID,
            threadID: this.threadSelectedID,
            message: text,
            tmpMsgID: data.msg_id
          })
        } else if (data.type === 'image') {
          this.resendLineImage({
            storeID: this.$route.params.store_id,
            channelID: this.channelID,
            threadID: this.threadSelectedID,
            message: this.message,
            media: this.message.media,
            tmpMsgID: data.msg_id
          })
        }
      }
    }
  },
  computed: {
    isMsgFromBot () {
      return this.message.sender === this.userId
    },
    threadSelectedID () {
      return this.$route.params.thread_id
    },
    channelID () {
      return this.$route.params.channel_id
    }
  }
}
</script>

<style scoped>
.cl-8A899B {
  color: #8A899B;
}
</style>
