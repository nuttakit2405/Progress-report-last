<template>
  <div style="width: 100%; padding-top: 20px;" align="center">
    <!-- <a href="https://chrome.google.com/webstore/detail/screen-capturing/ajhifddimkapgcifgcodmmfdlknahffk">Install Chrome extension</a> -->
    <div style="display: flex; width: 100%; justify-content: center; ">
      <div class="vid">
        <!-- <span>Remote</span><br> -->
        <video class="video remote" id="remoteVideo" autoplay></video>
      </div>
      <!-- <div class="vid" v-if="showScreen">
        <span>Screen</span><br>
        <video class="video" id="screen" autoplay muted></video>
      </div> -->
      <div class="vid local">
        <!-- <span>Local</span><br> -->
        <div class="local">
          <video class="video" id="localVideo" autoplay muted></video>
          <!-- <div class="option">
            <button class="button" @click="toggleVideo()">
              <span v-show="onVideo"><i class="fas fa-video"></i></span>
              <span v-show="!onVideo"><i class="fas fa-video-slash"></i></span>
            </button>
            <button class="button" @click="toggleMicrophone()">
              <span v-show="onMicrophone"><b-icon icon="microphone-alt"></b-icon></span>
              <span v-show="!onMicrophone"><b-icon icon="microphone-alt-slash"></b-icon></span>
            </button>
          </div> -->
        </div>
      </div>
    </div>
    <!-- <button class="button" @click="share">Share Screen</button> -->
    <!-- <button class="button" @click="stream">Start Stream</button> -->
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
      showScreen: false,
      onVideo: true,
      onMicrophone: true
    }
  },
  methods: {
    log (e) {
      console.log(e)
    },
    toggleVideo () {
      this.onVideo = !this.onVideo
      console.log('TOGGLE VIDEO', this.onVideo)
    },
    toggleMicrophone () {
      this.onMicrophone = !this.onMicrophone
      console.log('TOGGLE MICROPHONE', this.onMicrophone)
    },
    changeLocal () {
      webrtc.closeLocalVideo()
      webrtc.openLocalVideo(this.onVideo, this.onMicrophone)
    },
    share () {
      this.showScreen = true
      webrtc.openScreen(() => {
        this.showScreen = false
      })
    },
    stream () {
      webrtc.startSteamLocal()
    }
  },
  async created () {
    // webrtc.droneOpen(this.roomHash)
    // await webrtc.openLocalVideo(this.onVideo, this.onMicrophone)
  },
  async mounted () {
    await webrtc.droneOpen(this.projectId)
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
-webkit-transform: scaleX(-1);
transform: scaleX(-1);
}
.vid {
  margin: 10px;
}
.remote {
}
.local {
  position: relative;
  z-index: -1;
}

.option {
  top: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 2;
}
</style>
