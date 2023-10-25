<template>
  <input
    v-if="state.existTodos"
    type="checkbox"
    :checked="state.isAllCompleted"
    @click="() => state.todoController.setAllCompletedStatus(!state.isAllCompleted)"
  />
  <input
    type="text"
    :value="state.todoName"
    @input="(event) => (state.todoName = event.target.value)"
    @keydown.enter="handleCreateTodo"
    @keydown.tab="handleCreateTodo"
  />
  <ul>
    <li v-for="(todo, index) in state.todos" :key="todo.id" class="flex gap-2">
      <input type="checkbox" v-model="todo.completed" />
      <template v-if="state.editId === null">
        <div @dblclick="() => (state.editId = todo.id)">
          {{ todo.name }}
        </div>
        <button type="button" @click="() => state.todoController.removeTodo({ id: todo.id })">삭제</button>
      </template>
      <template v-else>
        <input
          type="text"
          v-focus="true"
          :value="todo.name"
          @input="(event) => state.todoController.setChangeName(index, todo, event.target.value)"
          @keydown.enter="() => handleEditTodo(todo)"
          @keydown.tab="() => handleEditTodo(todo)"
          @focusout="() => handleEditTodo(todo)"
        />
      </template>
    </li>
  </ul>
  <div v-if="state.existTodos" class="flex gap-4">
    <p>{{ state.activeCount }} item{{ state.activeCount === 1 ? "" : "s" }} left</p>
    <ul class="flex">
      <li>
        <label><input type="radio" name="filter" v-model="state.todoFilter" value="all" />all</label>
      </li>
      <li>
        <label><input type="radio" name="filter" v-model="state.todoFilter" value="active" />active</label>
      </li>
      <li>
        <label><input type="radio" name="filter" v-model="state.todoFilter" value="complete" />complete</label>
      </li>
    </ul>
    <button v-if="state.existCompletedTodos" type="button" @click="() => state.todoController.removeCompletedTodos()">
      clear complete
    </button>
  </div>
</template>
<script setup>
const state = reactive({
  todoController: Todos.init(),
  todoName: "",
  id: 0,
  editId: null,
  todoFilter: "all",
  todos: computed(() => {
    return state.todoFilter === "all"
      ? state.todoController.todos
      : state.todoController.getAllCompletedStatus(state.todoFilter === "complete");
  }),
  isAllCompleted: computed(() => state.todoController.isAllCompletedStatus(true)),
  existTodos: computed(() => state.todoController.existTodos()),
  existCompletedTodos: computed(() => state.todoController.existCompletedTodos()),
  activeCount: computed(() => state.todoController.getActiveTodosCount()),
});

function handleCreateTodo() {
  if (isStringEmpty(state.todoName)) return;
  state.todoController.addTodo({
    id: state.id++,
    name: state.todoName,
  });
  state.todoName = "";
}

function handleEditTodo(todo) {
  state.editId = null;
  if (isStringEmpty(todo.name)) state.todoController.removeTodo({ id: todo.id });
}
</script>
