<template>
  <div v-sortable="{onEnd: reorder}">
    <div v-for="(todo, index) in todos" :key="todo.title" v-show="(visibility === 'all') || (visibility === 'active' && todo.completed === false) || (visibility === 'completed' && todo.completed === true)">
      <b-field class="is-pulled-left">
        <!-- <b-checkbox @input="toggle(index)" size="is-large" type="is-success" :class="{ 'line': todo.completed }" >{{ todo.title }}</b-checkbox> -->
        <label class="b-checkbox checkbox is-large">
          <input v-model="todo.completed"  @input="toggle(index)" type="checkbox">
          <span class="check is-success"></span>
          <span class="control-label" :class="{ 'line': todo.completed }" >{{todo.title}}</span></label>
      </b-field>
      <a class="delete is-pulled-right" @click="deleteTodo(index)" ></a>
      <div class="is-clearfix"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    todos: {
      type: Array
    },
    visibility: {
      type: String
    }
  },
  methods: {
    toggle (index) {
      this.$emit('toggle', index)
    },
    deleteTodo (index) {
      this.$emit('delete', index)
    },
    reorder (data) {
      this.$emit('reOrder', data)
    }
  }
}
</script>

<style scoped>
  .line {
    text-decoration: line-through;
    color: lightgray;
  }
</style>
