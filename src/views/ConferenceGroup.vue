<template>
<div>
  <div style=" margin-right:20px;">
        <!-- <button class="button block" @click="isActive = true" :disabled="isActive">สายที่ไม่ได้รับ</button>
        <b-notification
            auto-close type="is-warning"
            :active.sync="isActive"
            aria-close-label="Close notification" style="display: flex; justify-content: flex-end;">
            สายที่ไม่ได้รับ 0 สาย
        </b-notification> -->
         <!-- <b-message title="           " type="is-danger">
           สายที่ไม่ได้รับ <b>0</b> สาย จากกลุ่มนี้
        </b-message>
          <br> -->
  </div>

  <div v-if="roomOpen && canjoin" style="display: flex; justify-content: center;">
    <p class="bell"><b>มีสายเรียกเข้าจากกลุ่มนี้</b></p>
  </div>

  <div v-if="roomOpen && canjoin" style="display: flex; justify-content: center;">
    <img src="/static/img/animat-bell-color.gif" alt="" style="width:25%; height:25%;">
  </div>

  <div v-if="user" style="width: 100%; padding-top: 20px;" align="center">
    <div id="videos-container" class="videos" style="margin: 20px 0;"></div>

    <button class="button is-info" v-show="!roomOpen"  @click="open">
      <i class="fas fa-phone-square fa-1x"></i>&nbsp;โทรออก
    </button>

    <button class="button is-success" v-show="roomOpen && canjoin" @click="join">
      <i class="fas fa-phone-volume"></i>&nbsp;รับสาย
    </button>

    <button class="button is-danger" v-show="roomOpen && joined" @click="stop">
      <i class="fas fa-phone-slash"></i> &nbsp;วางสาย
    </button>

    <button class="button is-primary" v-show="roomOpen && joined" @click="shareScreen">
      <i class="fas fa-external-link-alt"></i> &nbsp;แชร์หน้าจอ
    </button>

    <button class="button is-black" v-show="roomOpen && joined && !mute" @click="muteToggle">
      <i class="fas fa-microphone-slash"></i> &nbsp;ปิดเสียง
    </button>

    <button class="button is-black" v-show="roomOpen && joined && mute" @click="muteToggle">
      <i class="fas fa-microphone"></i> &nbsp;เปิดเสียง
    </button>

    <div class="container mg-t-20px" align="left">
    <div class="pd-5px"><b>ประวัติการโทร</b></div>
    <b-table
        :data="callLog"
        ref="table"
        paginated
        per-page="5"
        detail-key="id"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page">

        <template slot-scope="props">
            <b-table-column field="id" label="ครั้งที่" width="70" numeric>
                <span :class="{'cl-red': props.row.missCall }">{{ props.row.id }}</span>
            </b-table-column>

            <b-table-column field="log.timeStart" label="วันที่" sortable>
                <template>
                    <span :class="{'cl-red': props.row.missCall }">{{ props.row.log.timeStart | format("DD/MM/YYYY") }}</span>
                </template>
            </b-table-column>

            <b-table-column field="log.timeStart" label="เวลาเริ่ม">
                <template>
                  <span :class="{'cl-red': props.row.missCall }">{{ props.row.log.timeStart | format("HH:mm:ss") }}</span>
                </template>
            </b-table-column>

            <b-table-column field="log.timeStart" label="เวลาสิ้นสุด">
                <template>
                  <span :class="{'cl-red': props.row.missCall }">
                    <span v-if="props.row.missCall">การโทรไม่สมบูรณ์</span>
                    <span v-else>{{ props.row.log.timeEnd | format("HH:mm:ss") }}</span>
                  </span>
                </template>
            </b-table-column>

        </template>

        <!-- <template slot="detail" slot-scope="props">
            <article class="media">
                <div class="media-content">
                    <div class="content">
                        <p>
                            <strong>{{ props.row.user.first_name }} {{ props.row.user.last_name }}</strong>
                            <small>@{{ props.row.user.first_name }}</small>
                            <small>31m</small>
                            <br>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Proin ornare magna eros, eu pellentesque tortor vestibulum ut.
                            Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
                        </p>
                    </div>
                </div>
            </article>
        </template> -->
    </b-table>
    </div>

    <!-- <div class="container" align="left">
      Call Log
      <div :key="i"  v-for="(log, i) in project.callLog">
        <li>ครั้งที่ {{i+1}} โทรเมื่อ {{log.timeStart | format("DD/MM/YYYY เวลา HH:mm:ss")}} ถึง {{log.timeEnd | format("DD/MM/YYYY เวลา HH:mm:ss")}}</li>
      </div>
    </div> -->
  </div>
</div>
</template>

<script>
import * as webrtc from '@/rtcsocket.js'
import db from '@/database'
import { mapGetters, mapActions } from 'vuex'

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
      project: {},
      defaultOpenedDetails: [],
      isActive: false
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
      profile: 'user/profile',
      allUsers: 'user/allUsers'
    }),
    callLog () {
      if (this.project.callLog) {
        return this.project.callLog.filter(log => !log.isRoomOpen).map((log, i) => {
          var missCall = false
          const members = Object.keys(log.member)
          if (members.length === 1 && members[0] === log.callBy) {
            missCall = true
          }
          const data = {
            id: i + 1,
            log: log,
            missCall: missCall
          }
          return data
        }).reverse()
      }
      return []
    },
    usersWithID () {
      return Object.keys(this.allUsers).map(key => {
        return {
          ...this.allUsers[key],
          key
        }
      })
    },
    roomOpen () {
      if (!this.project.callLog) {
        return false
      }
      return this.project.callLog[this.project.callLog.length - 1].isRoomOpen
    },
    joined () {
      return this.project.callLog && this.project.callLog[this.project.callLog.length - 1].member[this.user.uid]
    },
    canjoin () {
      if (!this.project.callLog) {
        return false
      }
      if (this.project.callLog && this.project.callLog[this.project.callLog.length - 1].member[this.user.uid]) {
        return false
      }
      return this.project.callLog[this.project.callLog.length - 1].callBy !== this.user.uid
    }
  },
  methods: {
    ...mapActions({
      sentNoti: 'sentNoti'
    }),
    callTime (start, end) {
      const diffMin = this.$dayjs(end).diff(this.$dayjs(start), 'minute') + ''
      const diffSec = this.$dayjs(end).diff(this.$dayjs(start), 'second')
      return `${diffMin.padStart(2, '0')}:${((diffSec % 60) + '').padStart(2, '0')}`
    },
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
        if (isRoomOpen) {
          this.notiEvent()
        }
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
      if (this.project.callLog[id] && this.project.callLog[id].member[this.user.uid]) {
        const dataUpdate = {}
        dataUpdate[this.user.uid] = false
        await db.database.ref(`projects/${this.projectId}/callLog/${id}/member`).update(dataUpdate)
        if (this.project.callLog[id].isRoomOpen === true) {
          console.log('update room open')
          await this.checkAllOut()
        }
      }
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
    },
    notiEvent () {
      const location = window.location + ''
      let findUser = []
      const emailMentor = this.project.mentor.email
      let uids = this.project.teams.map(member => {
        return this.usersWithID.find(user => user.sid === member.id)
      })
      const mentor = this.usersWithID.filter(user => user.userType === 'teacher' && emailMentor === user.email)
      uids = [...uids, ...mentor]
      findUser = uids.filter(member => member !== undefined)
      const data = {
        members: findUser.map(member => member.key)
      }

      const content = `
      การประชุมของกลุ่ม ${this.project.thaiProjectName} ถูกสร้างขึ้น
      โดย ${this.profile.fullName}<br>
      <a href="${location}">กดลิ้งเพื่อเข้าร่วมการประชุม</a>
      `
      const noti = {
        to: data.members,
        subject: `มีการประชุม`,
        content: content
      }
      this.sentNoti(noti)
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
  justify-content: flex-end;
  /* align-items: flex-end; */
  /* padding-bottom: 20px; */
  padding-right: 10px;
  padding-top: 10px;
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
.bell {
  font-size: 30pt;
}
</style>
