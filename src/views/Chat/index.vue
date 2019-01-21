<template>
  <div class="dp-flex jtf-ct-center"  >
    <div class="chat">
      <div class="h-72calc thread-view">
        <Threads/>
      </div>
      <div class="h-72calc pst-relative chat-view" >
        <ChatView/>
      </div>
    </div>
  </div>
</template>

<script>
import Threads from './Threads'
import ChatView from './ChatView'

export default {
  name: 'Inbox',
  components: {
    ChatView,
    Threads
  }
}
</script>

<style>
.mx-h-72calc {
  max-height: calc(100vh - 85px) !important;
}
.h-72calc {
  height: calc(100vh - 85px) !important;
}
</style>

<style scoped>
.chat {
  display: flex;
  min-width: 1000px;
  max-width: 1000px;
  background-color: white;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  margin-top: 12px;
}
.chat-view {
 min-width: 700px;
}
.thread-view {
  min-width: 300px;
  border-right: 1px solid #f0f0f0;
}
.plugin-view {
  width: 351px;
  border-left: 1px solid #f0f0f0;
}
.bd-r-plugin-tab {
  border-right: 1px solid #f0f0f0;
}
.bd-bt-plugin-tab {
  border-bottom: 1px solid #f0f0f0;
}
.bg-cl-f5f6fa {
  background-color: #f5f6fa;
}
.plugin-tab:hover {
  background-color: #f0f0f0 !important;
}
</style>
