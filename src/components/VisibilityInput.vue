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
import { store } from '@/store'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['count', 'countActives', 'countCompleted']),
    visibility: {
      get: function () {
        return store.state.visibility
      },
      set: function (newValue) {
        store.dispatch('changeVisibility', newValue)
      }
    }
  }
}
</script>
