<template>
  <div class="user f-left w-100pct">
    <div class="f-left w-50px t-al-center">
      <img class="user-profile-rounded" :src="thread.PictureURL === undefined ? tmpUserImageUrl : thread.PictureURL">
    </div>
    <div class="user-info">
      <div class="f-left w-100pct">
        <div class="f-left f-s-15px" :class="{ 'f-w-bold cl-black': !thread.seen }">{{ thread.name }}</div>
        <div class="f-right f-s-12px" :class="{ 'cl-0084ff f-w-bold': !thread.seen }">{{thread.last_update | format('HH:mm')}}</div>
      </div>
      <div class="unread-msg">{{ thread.last_message }}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'User',
  props: {
    thread: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      tmpUserImageUrl: 'https://kooledge.com/assets/default_medium_avatar-57d58da4fc778fbd688dcbc4cbc47e14ac79839a9801187e42a796cbd6569847.png'
    }
  }
}
</script>

<style scoped>
.user {
  padding: 15px 10px 11px 14px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
}
.container:hover {
  background-color: #f0f0f0;
}
.user-profile > img{
  border-radius: 50% !important;
  object-fit: cover !important;
  height: 42px;
}
.figure-status {
  border-radius: 50%;
  height: 50px;
  width: 50px;
  padding: 2px;
  border-width: 2px;
  border-style: solid;
}
.message-status {
  width: 12px;
  height: 12px;
  position: absolute;
  right: 0px;
  bottom: 0px;
  border-radius: 6px;
  border-width: 2px;
  border-style: solid;
  border-color: white;
}
.user-info {
  float: left;
  margin-left: 9px;
  width: calc(100% - 50px - 9px);
}
.selected {
  background-color: #f5f6fa;
}
.unread-msg {
  padding-bottom: 5px;
  font-size: 14px;
  color: #868686;
  width: 100%;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
}
.cl-0084ff {
  color: #0084ff;
}
.user-profile-rounded {
  width: 42px;
  height: 42px;
  border-radius: 50%;
}

</style>
