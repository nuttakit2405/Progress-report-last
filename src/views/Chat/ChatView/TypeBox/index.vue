<template>
  <div class="columns mg-0px pd-0px">
    <div class="column mg-0px pd-0px">
      <TextAreaAutoSize v-model="input" :send="sendMsg" ref="text-area-auto-size"/>
    </div>
    <div class="column mg-0px typebox-option">
      <i class="fas fa-paper-plane"></i>
    </div>
  </div>
</template>

<script>
import TextAreaAutoSize from './TextAreaAutosize'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    TextAreaAutoSize
  },
  mounted () {
    window.addEventListener('keydown', (e) => {
      if (e.keyCode >= 49 && e.keyCode <= 56 && e.ctrlKey) {
        this.setInputMessage(this.storeOften.find(m => m.shortcut_key === e.key).message)
      }
    })
  },
  computed: {
    ...mapState({
      storeOften: state => state.sellsuki.storeOften,
      user: state => state.user.user
    }),
    threadSelectedID () {
      return this.$route.params.thread_id
    },
    channelID () {
      return this.$route.params.channel_id
    },
    userID () {
      return this.user.user.id
    },
    disableSend () {
      if (this.input.trim() !== '') {
        return false
      }
      return true
    }
  },
  data () {
    return {
      input: '',
      image: []
    }
  },
  methods: {
    ...mapActions({
      sendLineText: 'Line/chat/sendLineText',
      sendLineImage: 'Line/chat/sendLineImage'
    }),
    sendMsg (input) {
      if (this.disableSend) return
      const text = input.trim().slice()
      console.log(text)
      this.input = ''
    },
    clearImage () {
      document.getElementsByName('imageUpload')[0].value = ''
      this.image = []
    },
    async sendImage (images) {
      const image = images[0]
      await this.sendLineImage({
        storeID: this.$route.params.store_id,
        channelID: this.channelID,
        threadID: this.threadSelectedID,
        userID: this.userID,
        media: image,
        message: {
          originalContentUrl: window.URL.createObjectURL(image),
          previewImageUrl: window.URL.createObjectURL(image),
          type: image.type
        }
      })
      await this.clearImage()
    },
    setInputMessage (msg) {
      this.input = msg
      this.$refs['text-area-auto-size'].focus()
    }
  }
}
</script>

<style scoped>
.typebox-option {
  flex: none;
  width: fit-content;
  padding: 0px 5px;
  margin-bottom: 7px;
  margin-left: 5px;
  margin-right: 5px;
  align-items: flex-end;
  cursor: pointer;
  line-height: 1px;
}
.lineSend {
  color: #00c300;
}
.disableSend {
  color: #cacaca;
  pointer-events: none;
}
</style>
