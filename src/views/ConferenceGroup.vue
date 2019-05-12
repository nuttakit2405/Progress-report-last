<template>
  <div style="width: 100%; padding-top: 20px;" align="center">
    <div id="videos-container" class="videos" style="margin: 20px 0;"></div>
    <button class="button" @click="open">OpenOrJoin</button>
    <button class="button" @click="shareScreen">shareScreen</button>
    <!-- <div id="videos-container" class="videos">
        <div class="flex-vid player">
            <video class="video" id="localVideo" autoplay muted playsinline ></video>
            <div class="control-vid">
              <button class="button mg-r-5px" @click="shareScreen">
                <i class="fas fa-desktop"></i>
              </button>
              <button class="button" @click="muteToggle">
                <i class="fas fa-microphone"></i>
              </button>
            </div>
        </div>
    </div>
    <br />
    <div id="connections"></div> -->
  </div>
</template>

<script>
import * as webrtc from '@/rtcsocket.js'

export default {
  props: {
    projectId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      mute: false
    }
  },
  methods: {
    shareScreen () {
      webrtc.openScreen2()
    },
    muteToggle () {
      this.mute = !this.mute
      // webrtc.muteLocal(this.mute)
    },
    open () {
      webrtc.openRoom()
    }
  }
  // async mounted () {
  //   // await webrtc.droneOpen(this.projectId)
  //   webrtc.pageReady(this.projectId)
  // },
  // beforeDestroy () {
  //   webrtc.closeLocalVideo()
  //   console.log('close video call')
  // }
}
</script>

<style>
.video {
  border-radius: 6px;
  padding: 1px;
  width: 500px;
  background-color: black;
}
.flex-vid {
  flex-direction: row;
  margin: 5px;
}
</style>

<style scoped>
.videos {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
#localVideo {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}
.vid {
  margin: 10px;
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
.player {
  float: left;
  position: relative;
}

.control-vid:hover {
  opacity: 1;
}
.control-vid {
  opacity: 0.4;
  display: flex;
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 20px;
}
</style>
