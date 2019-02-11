<template>
  <div class="f-left w-100pct pd-bt-25px pd-15px">
    <div v-for="(msg, index) in data" :key="index" class="f-left w-100pct mg-vtc-5px">
      <!-- <img v-if="isMsgFromUser(msg) && (!isSameTimeMessage(msg, index) || isPreviousMsgComeFromBot(index))" :src="userImage === undefined ? tmpUserImageUrl : userImage" class="user-profile"> -->
      <span class="w-30px h-30px mg-r-10px f-left"></span>
      <ChatText :userId="userId" v-if="msg.type === 'text'" :message="msg" />
      <!-- <ChatImage v-if="msg.type === 'image'" :message="msg" /> -->
      <!-- <div v-if="data[index + 1] && (date(msg.timestamp) !== date(data[index + 1].timestamp))" class="f-left w-100pct t-al-center mg-vtc-10px">
        <span class="split-date-box">{{ data[index + 1].timestamp | day }}</span>
      </div> -->
    </div>
  </div>
</template>

<script>
import ChatText from './ChatText'
import ChatImage from './ChatImage'

export default {
  name: 'Messages',
  props: {
    data: {
      type: Array,
      required: true
    },
    userId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      tmpUserImageUrl: 'https://kooledge.com/assets/default_medium_avatar-57d58da4fc778fbd688dcbc4cbc47e14ac79839a9801187e42a796cbd6569847.png'
    }
  },
  methods: {
    isMsgFromUser (msg) {
      return msg.sender !== msg.channel_id
    },
    isSameTimeMessage (msg, index) {
      return index > 0 ? this.time(msg.timestamp) === this.time(this.data[index - 1].timestamp) : false
    },
    isPreviousMsgComeFromBot (currentIndex) {
      return currentIndex > 0 ? !this.isMsgFromUser(this.data[currentIndex - 1]) : false
    },
    date (timestamp) {
      return this.$moment.unix(timestamp / 1000).format('DD-MM-YYYY')
    },
    time (timestamp) {
      return this.$moment.unix(timestamp / 1000).calendar()
    }
  },
  components: {
    ChatText,
    ChatImage
  }
}
</script>

<style scoped>
.user-profile {
  float: left;
  margin-right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.split-date-box {
  padding: 5px 15px;
  background-color: #f5f6fa;
  border-radius: 30px;
  font-size: 12px;
}
</style>
