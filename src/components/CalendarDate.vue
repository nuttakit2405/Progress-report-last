<template>
<div >
  <div class="columns is-marginless mg-bt-2px" :key="event.key" v-for="event in ee">
    <div class="column is-paddingless" style="width: 100%; position: relative;">
      <span style="width: 100%; padding: 0 2px" :class="['dotdotdot', event.waitaccept ? 'disable-events': 'accept-events' ]" @click="viewEvent(item.date.full, key, event)" :title="event.title">{{event.title}}</span>
      </div>

      <div class="column is-paddingless" style="flex: none; width: fit-content;">
      <button
        v-if="!(!item.isCurMonth || today > item.date.date) && event.waitaccept"
        class="button action-btn is-small"
        @click="editEvent(item.date.year, item.date.full, event.key, event)"
      >
        <b-icon size="is-small" icon="edit"/>
      </button>
      </div>

      <div class="column is-paddingless" style="flex: none; width: fit-content;">
      <button class="button action-btn is-small" @click="removeEvent(item.date.full, event.key, event)">
        <b-icon size="is-small" icon="times"/>
      </button>
    <!-- <button v-if="!(!item.isCurMonth || today > item.date.date)" class="button is-small" @click="removeEvent(item.date.full, key, event)"><b-icon size="is-small" icon="times"/></button> -->
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ['item', 'ee', 'viewEvent', 'removeEvent', 'editEvent', 'today']
}
</script>

<style scoped>
.dotdotdot {
  cursor: pointer;
  display: inline-block !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}
.accept-events {
  background-color: aquamarine;
}
.disable-events {
  background-color: lightgray;
}

.action-btn {
  width: 25px;
  height: 24px;
  padding: 3px;
  margin-left: 1px;
}
</style>
