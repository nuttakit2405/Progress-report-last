<template>
  <div class="app">
    <div>
      <div class="row header">
      </div>

<section class="section">
        <div>
          <div>
            <new-todo-input/>
            <br>
            <todos/>
            <hr>
            <todos-footer/>
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

export default {
  components: {
    NewTodoInput,
    Todos,
    TodosFooter
  }
}
</script>
