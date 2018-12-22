<template>
  <div>
    <b-field class="is-pulled-right">
      <b-radio-button v-model="visibility"
        native-value="all" type="is-info">
        <span>ทั้งหมด ({{count}})</span>
      </b-radio-button>
      <b-radio-button v-model="visibility"
        native-value="active" type="is-warning">
        <span>ยังไม่เสร็จ ({{countActives}})</span>
      </b-radio-button>
      <b-radio-button v-model="visibility"
        native-value="completed" type="is-success">
        <span>เสร็จแล้ว ({{countCompleted}})</span>
      </b-radio-button>
    </b-field>
  </div>
</template>

<script>
export default {
  props: ['count', 'countActives', 'countCompleted', 'visibilityData'],
  computed: {
    visibility: {
      get: function () {
        return this.visibilityData
      },
      set: function (newValue) {
        this.$emit('changeVisibility', newValue)
      }
    }
  }
}
</script>
