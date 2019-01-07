<template>
  <div>
    <div class="copy">Send your URL to a friend to start a video call</div>
    <video class="video" id="localVideo" autoplay muted></video>
    <video class="video" id="screen" autoplay muted></video>
    <video class="video" id="remoteVideo" autoplay></video>

    <button class="button" @click="sendMessage">send message</button>
  </div>
</template>

<script>
import * as webrtc from '@/webrtc.js'

export default {
  props: {
    projectId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      roomHash: 'test'
    }
  },
  methods: {
    sendMessage () {
      webrtc.sendMessage({message: 'gg'})
    }
  },
  created () {
    // webrtc.droneOpen(this.roomHash)
    webrtc.openLocalVideo()
    // webrtc.openScreen()
  }
}
</script>

<style scoped>
.video {
border: 1px solid darkbluel;
border-radius: 10px;
padding: 5px;
width: 300px;
}
</style>
