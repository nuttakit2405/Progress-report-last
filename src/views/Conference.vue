<template>
  <div style="width: 100%; padding-top: 20px;" align="center">
    <a href="https://chrome.google.com/webstore/detail/screen-capturing/ajhifddimkapgcifgcodmmfdlknahffk">Install Chrome extension</a>
    <div style="display: flex; width: 100%; justify-content: center; ">
      <div class="vid">
        <span>Remote</span><br>
        <video class="video" id="remoteVideo" autoplay></video>
      </div>
      <div class="vid" v-if="showScreen">
        <span>Screen</span><br>
        <video class="video" id="screen" autoplay muted></video>
      </div>
      <div class="vid">
        <span>Local</span><br>
        <video class="video" id="localVideo" autoplay muted></video>
      </div>
    </div>
    <button class="button" @click="share">Share Screen</button>
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
      roomHash: 'test',
      showScreen: false
    }
  },
  methods: {
    log (e) {
      console.log(e)
    },
    share () {
      this.showScreen = true
      webrtc.openScreen(() => {
        this.showScreen = false
      })
    }
  },
  created () {
    // webrtc.droneOpen(this.roomHash)
    webrtc.openLocalVideo()
    // webrtc.openScreen()
  },
  beforeDestroy () {
    webrtc.closeLocalVideo()
  }
}
</script>

<style scoped>
.video {
border-radius: 6px;
padding: 1px;
width: 500px;
background-color: black;
}
.vid {
  margin: 10px;
}
</style>
