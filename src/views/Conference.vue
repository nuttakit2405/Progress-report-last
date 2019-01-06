<template>
  <div>
    <div class="copy">Send your URL to a friend to start a video call</div>
    <video id="localVideo" autoplay muted></video>
    <video id="remoteVideo" autoplay></video>

    <button class="button" @click="sendMessage">send message</button>
  </div>
</template>

<script>
import * as webrtc from '@/webrtc.js'
export default {
  data () {
    return {
      roomHash: 'test'
    }
  },
  methods: {
    sendMessage () {
      webrtc.sendMessage('gg')
    }
  },
  created () {
    webrtc.droneOpen(this.roomHash)
  }
}
</script>
