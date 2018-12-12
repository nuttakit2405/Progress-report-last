<template>
  <b-field>
    <b-input placeholder="เพิ่มขอบเขตทีละข้อ"
      type="text"
      icon="edit"
      size="is-large"
      v-model="newTodo"
      @keyup.native.enter="addTodoAndClearNewTodo" >
    </b-input>
  </b-field>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      newTodo: ''
    }
  },
  methods: {
    ...mapActions(['addTodo']),
    addTodoAndClearNewTodo () {
      this.addTodo(this.newTodo)
      this.newTodo = ''
    }
  }
}
</script>
