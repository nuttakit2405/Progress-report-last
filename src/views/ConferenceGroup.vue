<template>
  <div style="width: 100%; padding-top: 20px;" align="center">
    <div id="videos-container" class="videos" style="margin: 20px 0;"></div>
    <button v-show="!roomOpen" class="button" @click="open">
      <i class="fas fa-phone-square fa-1x"></i>&nbsp;โทรออก
    </button>
    <button v-show="roomOpen && canjoin" class="button" @click="join">
      <i class="fas fa-phone-volume"></i>&nbsp;รับสาย
    </button>
    <button v-show="roomOpen" class="button" @click="shareScreen">
      <i class="fas fa-external-link-alt"></i> &nbsp;แชร์หน้าจอ
    </button>
    <button v-show="roomOpen" class="button" @click="stop">
      <i class="fas fa-phone-slash"></i> &nbsp;วางสาย
    </button>
    <button v-show="roomOpen && !mute" class="button" @click="muteToggle">
      <i class="fas fa-microphone"></i> &nbsp;ปิดเสียง
    </button>
    <button v-show="roomOpen && mute" class="button" @click="muteToggle">
      <i class="fas fa-microphone-slash"></i> &nbsp;เปิดเสียง
    </button>

    <div class="container" align="left">
      Call Log
      <div :key="i"  v-for="(log, i) in project.callLog">
        <li>ครั้งที่ {{i+1}} โทรเมื่อ {{log.timeStart | format("DD/MM/YYYY เวลา HH:mm:ss")}} ถึง {{log.timeEnd | format("DD/MM/YYYY เวลา HH:mm:ss")}}</li>
      </div>
    </div>
  </div>
</template>

<script>
import * as webrtc from '@/rtcsocket.js'
import db from '@/database'
import { mapGetters } from 'vuex'

export default {
  props: {
    projectId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      mute: false,
      project: {}
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/user'
    }),
    roomOpen () {
      if (!this.project.callLog) {
        return false
      }
      return this.project.callLog[this.project.callLog.length - 1].isRoomOpen
    },
    canjoin () {
      if (!this.project.callLog) {
        return false
      }
      return this.project.callLog[this.project.callLog.length - 1].callBy !== this.user.uid
    }
  },
  methods: {
    shareScreen () {
      webrtc.openScreen2()
    },
    muteToggle () {
      this.mute = !this.mute
      if (this.mute) {
        webrtc.mute()
      } else {
        webrtc.unmute()
      }
    },
    async open () {
      await webrtc.openRoom(this.projectId, (isRoomOpen) => {
        console.log(isRoomOpen)
      })
      let id = 0
      const data = {
        timeStart: new Date(),
        callBy: this.user.uid,
        member: {},
        isRoomOpen: true
      }
      data.member[this.user.uid] = true
      const callLog = {}
      if (this.project.callLog) {
        id = this.project.callLog.length
        callLog[id] = data
        await db.database.ref(`projects/${this.projectId}/callLog`).update(callLog)
      } else {
        callLog[id] = data
        await db.database.ref(`projects/${this.projectId}`).update({callLog: callLog})
      }
    },
    join () {
      webrtc.joinRoom(this.projectId)
      const id = this.project.callLog.length - 1
      const dataUpdate = {}
      dataUpdate[this.user.uid] = true
      db.database.ref(`projects/${this.projectId}/callLog/${id}/member`).update(dataUpdate)
    },
    async stop () {
      await webrtc.closeLocalVideo(this.projectId)
      const id = this.project.callLog.length - 1
      const dataUpdate = {}
      dataUpdate[this.user.uid] = false
      await db.database.ref(`projects/${this.projectId}/callLog/${id}/member`).update(dataUpdate)
      await this.checkAllOut()
    },
    checkAllOut () {
      const id = this.project.callLog.length - 1
      const allOut = Object.values(this.project.callLog[id].member).every(data => data === false)
      if (allOut) {
        const dataUpdate = {
          isRoomOpen: false,
          timeEnd: new Date()
        }
        db.database.ref(`projects/${this.projectId}/callLog/${id}`).update(dataUpdate)
      }
    }
  },
  async mounted () {
    db.database.ref(`projects/${this.projectId}`).on('value', (snapshot) => {
      this.project = snapshot.val()
    })
  //   // await webrtc.droneOpen(this.projectId)
  //   webrtc.pageReady(this.projectId)
  },
  beforeDestroy () {
    this.stop()
    console.log('close video call')
  }
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
.localVideo {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}
</style>

<style scoped>
.videos {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
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
