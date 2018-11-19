<template>
  <div class="app">
    <div>
      <div class="row header">
      </div>
      <div class="row">
        <form @submit.prevent="submitTodo" class="col s6 offset-s3">
          <div class="input-field">
            <center>
            <b-field style="width:600px">
              <b-input placeholder="เพิ่มขอบเขตที่ละข้อ" type="textarea" v-model="newTodo"></b-input>
            </b-field>
            </center>
          </div><br>
          <!-- <button class="btn waves-effect col s12">Add</button> -->
          <div style="display: flex; justify-content: flex-end;">
            <button class="button is-success">เพิ่มขอบเขต</button>
          </div><br>
        </form>
      </div>
      <div class="row">
        <ul class="collection col s6 offset-s3">
          <li class="collection-item" v-for="todo in todos" :key="todo.id">
            <p>
              <label>
                <!-- <input type="checkbox" :checked=todo.done @change="todo.done = !todo.done" /> -->
                <div class="field">
                  <b-checkbox :checked=todo.done @input="(val) => todo.done=val" type="is-success">
                    <span style="white-space: pre-wrap" :class="{'textcompleted':todo.done}">{{todo.title}}</span>
                  </b-checkbox>
                <span>
                  <a @click.prevent="deleteTodo(todo)">
                    <i class="fas fa-trash-alt"></i>
                  </a>
                </span>
                </div><br>
              </label>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      todos: [
        // {
        //   id: 1,
        //   title: 'Learn Vue.js',
        //   done: false,
        //   editing: false
        // },
        // {
        //   id: 2,
        //   title: 'Build a project with vue.js',
        //   done: false,
        //   editing: false
        // }
      ],
      newTodo: ''
    }
  },
  methods: {
    submitTodo () {
      this.todos.push({
        title: this.newTodo,
        done: false
      })
      this.newTodo = ''
    },
    deleteTodo (todo) {
      const todoIndex = this.todos.indexOf(todo)
      this.todos.splice(todoIndex, 1)
    }
  }
}
</script>

<style scoped>
.textcompleted {
  text-decoration: line-through;
}
</style>
