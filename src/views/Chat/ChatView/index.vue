<template>
  <div class="dp-flex f-drt-column pst-relative h-72calc">
    <div class="f-left w-100pct-1 thread-info-container pd-15px pd-bt-15px">
      <div class="f-left w-100pct-1">
        <div class="f-left f-w-bold f-s-18px">
          {{threadSelected.name}}
        </div>
      </div>
    </div>
    <div class="message-box">
      <Messages :userId="userId" :messages="messages"/>
    </div>
    <div class="pst-absolute bt-12px w-100pct-1 pd-t-15px pd-bt-5px bg-cl-white border-type-box">
      <TypeBox @sent="$emit('sent', $event)" ref="tye-box-component"/>
    </div>
  </div>
</template>

<script>
import Messages from './Messages'
import TypeBox from './TypeBox'

export default {
  name: 'ChatView',
  props: {
    threadSelected: {
      type: Object,
      required: true
    },
    messages: {
      type: Array,
      default: () => []
    },
    userId: {
      type: String,
      required: true
    }
  },
  components: {
    Messages,
    TypeBox
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style scoped>
.border-type-box {
  border-top: 1px solid #f0f0f0;
}
.thread-info-container {
  border-bottom: 1px solid #f0f0f0;
}
.is-rotate {
  transform: scaleX(-1);
  -moz-transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  -ms-transform: scaleX(-1);
}
.message-box {
  position: relative;
  max-height: calc(100% - 110px);
}
.w-100pct-1 {
  width: calc(100% - 1px) !important;
}
</style>
