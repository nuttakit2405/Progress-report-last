<template>
  <div>
    <b-tooltip
      class="pd-vtc-5px pd-hrzt-10px bd-rd-15px mn-w-25px mx-w-80pct f-s-16px"
      :class="{'message-bot' :isMsgFromBot, 'message-customer' :!isMsgFromBot, 'cs-pointer': message.status === 'error'}"
      :label="time | format('ddd DD/MM/YYYY HH:mm:ss')"
      type="is-light"
      style="white-space:pre-wrap;"
      :position="tooltipPositoion"
      v-html="htmlGenerator(message)"
      animated>
    </b-tooltip>
    <MessageStatus :userId="userId" :message="message"/>
  </div>
</template>

<script>
import MessageStatus from './MessageStatus'

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
  computed: {
    isMsgFromBot () {
      return this.message.sender === this.userId
    },
    tooltipPositoion () {
      return this.isMsgFromBot ? 'is-left' : 'is-right'
    },
    time () {
      return this.message.timestamp
    }
  },
  methods: {
    htmlGenerator (message) {
      if (this.keyword) {
        return this.highlightText(message.msg)
      } else {
        if (this.isURL(message.msg)) {
          return this.generateUrlElement(message.msg)
        } else {
          return message.msg
        }
      }
    },
    highlightText (message) {
      let match = new RegExp(this.keyword, 'g')
      if (match.test(message)) {
        return message.replace(match, `<span style="color: #fbcb12;display: contents;">${this.keyword}</span>`)
      }
      return message
    },
    isURL (msg) {
      const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/g
      return urlRegex.test(msg)
    },
    generateUrlElement (msg) {
      const colorFont = this.isMsgFromBot ? '#fff' : 'rgb(0, 129, 255)'
      return `<a href="${msg}" style="color: ${colorFont};text-decoration: underline;">${msg}</a>`
    }
  },
  components: {
    MessageStatus
  }
}
</script>

<style scoped>
.message-bot {
  float: right;
  background-color: #5ace3c;
  color: #fff;
  /* background-color: #beea68; */
  /* color: #4a4a4a; */
  /* background-color: #138eff; */
  /* color: #ffffff; */
}
.message-customer {
  float: left;
  background-color: #f5f6fa;
  color: #4a4a4a;
}
.icon-text-box {
  display: inline-flex;
  vertical-align: middle;
}
</style>
