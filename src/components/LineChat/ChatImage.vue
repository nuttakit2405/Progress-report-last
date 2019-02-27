<template>
  <div>
    <div
      class="mg-vtc-3px w-fit-content"
      :class="{'message-bot t-al-right' :isMsgFromBot, 'message-customer t-al-left' :!isMsgFromBot}">
      <b-tooltip
        class="bd-rd-15px"
        :label="time"
        type="is-light"
        :position="tooltipPositoion"
        animated>
        <img :src="message.msg.previewImageUrl" class="img cs-pointer" @click="imageModal(message.msg.previewImageUrl)">
      </b-tooltip>
      <div class="f-s-12px cl-4a4a4a" :class="{'t-al-right' :isMsgFromBot, 't-al-left' :!isMsgFromBot}">
      </div>
    </div>
    <!-- <MessageStatus :message="message"/> -->
  </div>
</template>

<script>
import MessageStatus from './MessageStatus'

export default {
  name: 'ChatImage',
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  methods: {
    imageModal (src) {
      this.$modal.open({
        content: `<div class="t-al-center f-left w-100pct">
          <img class="modal-img" src="${src}">
        </div>`
      })
    }
  },
  computed: {
    isMsgFromBot () {
      return this.message.sender === this.message.channel_id
    },
    tooltipPositoion () {
      return this.isMsgFromBot ? 'is-left' : 'is-right'
    },
    time () {
      return this.$moment.unix(this.message.timestamp / 1000).calendar()
    }
  },
  components: {
    MessageStatus
  }
}
</script>
<style>
.modal-img {
  max-width: 640px;
  max-height: 90vh;
  width: auto;
  height: auto;
}
</style>
<style scoped>
.message-bot {
  float: right;
}
.message-customer {
  float: left;
}
.img {
  display: block;
  max-width:400px;
  max-height:200px;
  width: auto;
  height: auto;
  border: 1px solid #d8d8d8;
  border-radius: 6px;
}
.cl-4a4a4a {
  color: #4a4a4a;
}
.cl-4a4a4a a {
  color: #4a4a4a !important;
  font-weight: 700;
}
.cl-4a4a4a a:hover {
  text-decoration: underline !important;
}
</style>
