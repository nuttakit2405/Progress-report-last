<template>
  <div style="width: 100%; padding-top: 20px;" align="center">
    <div class="videos">
        <div>
            <video class="video" id="localVideo" autoplay muted playsinline ></video>
            <!-- <div class="soundbar"><span class="currentVolume"></span></div> -->
        </div>
    </div>
    <br />
    <div id="connections"></div>
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
  async mounted () {
    // await webrtc.droneOpen(this.projectId)
    webrtc.pageReady(this.projectId)
  },
  beforeDestroy () {
    // webrtc.closeLocalVideo()
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
