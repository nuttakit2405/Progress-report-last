<template>
  <div class="app">
    <div>
      <div class="row header">
      </div>

<section class="section">
        <div>
          <div>
            <new-todo-input @add="addTodos"/>
            <br>
            <todos :todos="todos" :visibility="visibility" @delete="deleteTodo" @toggle="toggleTodo" @reOrder="reOrder"/>
            <hr>
            <todos-footer :visibility="visibility" :count="count" :countActives="countActives" :countCompleted="countCompleted" @clear="clearComplete" @changeVisibility="changeVisibility"/>
          </div>
        </div>
    </section>

    </div>
  </div>
</template>

<script>
import NewTodoInput from '@/components/NewTodoInput'
import Todos from '@/components/Todos'
import TodosFooter from '@/components/TodosFooter'
import db from '@/database'

export default {
  props: {
    projectId: {
      type: String
    }
  },
  data () {
    return {
      todos: [],
      visibility: 'all'
    }
  },
  computed: {
    count () {
      return this.todos.length
    },
    countActives () {
      return this.todos.filter(todo => todo.completed === false).length
    },
    countCompleted () {
      return this.todos.filter(todo => todo.completed === true).length
    }
  },
  methods: {
    changeVisibility (newVisibilityValue) {
      this.visibility = newVisibilityValue
    },
    addTodos (title) {
      this.todos.push({
        title,
        completed: false
      })
      this.save()
    },
    deleteTodo (index) {
      this.todos.splice(index, 1)
      this.save()
    },
    toggleTodo (index) {
      this.todos[index].completed = !this.todos[index].completed
      this.save()
    },
    clearComplete () {
      this.todos = this.todos.filter(todo => todo.completed === false)
      this.save()
    },
    reOrder ({oldIndex, newIndex}) {
      const movedItem = this.todos.splice(oldIndex, 1)[0]
      this.todos.splice(newIndex, 0, movedItem)
      this.save()
    },
    save () {
      console.log(this.todos)
      db.database.ref(`/projects/${this.projectId}`).update({todos: this.todos})
    }
  },
  components: {
    NewTodoInput,
    Todos,
    TodosFooter
  },
  created () {
    db.database.ref(`/projects/${this.projectId}`).on('value', snap => {
      if (snap.val().todos) {
        this.todos = snap.val().todos
      }
    })
  }
}
</script>
