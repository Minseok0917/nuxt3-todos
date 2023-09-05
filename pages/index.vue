<template>
  <div class="todo">
    <div class="todo-container">
      <div class="todo-head">
        <h1 class="todo-title">TODOS</h1>
        <input
          type="text"
          class="todo-input"
          :value="state.todoInput"
          @input="handlers.todos.input"
          @keydown="handlers.todos.keydown"
        />
      </div>
      <div class="todo-body" v-if="state.todos.length">
        <div class="todo-list">
          <template v-for="todo in state.todos" :key="todo.id">
            <div class="todo-item" :class="{ checked: todo.checked }">
              <div
                class="todo-checkbox"
                @click="handlers.todos.toggleChecked(todo)"
              >
                <Icon v-if="todo.checked" name="ic:baseline-check"></Icon>
              </div>
              <div class="todo-text">
                {{ todo.text }}
              </div>
              <button
                class="todo-delete"
                type="button"
                @click="handlers.todos.delete(todo)"
              >
                <Icon name="ant-design:delete-outlined" />
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const state = reactive({
  key: 0,
  todos: [{ key: 1, text: "1231", active: false }],
  todoInput: "",
});

const handlers = {
  todos: {
    input(event) {
      state.todoInput = event.target.value;
    },
    keydown(event) {
      const isCreated = [13, 9].includes(event.keyCode); // Enter, Tab
      if (isCreated) {
        state.todos.push({
          id: state.key++,
          text: state.todoInput,
          checked: false,
        });
        state.todoInput = "";
      }
    },
    delete(todo) {
      state.todos = state.todos.filter(({ id }) => id !== todo.id);
    },
    toggleChecked(todo) {
      todo.checked = !todo.checked;
      console.log(todo);
    },
  },
};
</script>
<style lang="scss">
.todo {
  &-container {
    @apply w-[500px];
    @apply mx-auto mt-20;
  }
  &-title {
    @apply text-center;
    @apply text-4xl font-black;
    @apply mb-6;
  }
  &-head {
  }
  &-input {
    @apply w-full p-4;
    @apply text-sm;
    @apply border border-slate-200 rounded-sm;
    @apply outline-none;
  }
  &-list {
    @apply flex flex-col gap-4;
  }

  &-body {
    @apply p-4;
    @apply border border-slate-100;
    @apply shadow-2xl shadow-slate-200;
  }
  &-item {
    @apply flex items-center gap-4 p-2;
    &:hover .todo-delete {
      @apply flex;
    }
    &.checked {
      .todo-text {
        @apply line-through text-slate-400;
      }
    }
  }
  &-checkbox {
    @apply w-[30px] h-[30px];
    @apply cursor-pointer;
    @apply flex justify-center items-center;
    @apply border border-slate-200 rounded-full;
    @apply hover:border-slate-300;

    .icon {
      @apply text-green-600 text-xl;
    }
  }
  &-text {
    @apply flex-1;
    @apply text-sm text-slate-600 select-none;
    @apply whitespace-nowrap text-ellipsis overflow-hidden;
  }
  &-delete {
    @apply text-2xl hidden;
    @apply items-center;

    .icon {
      @apply text-slate-300 hover:text-slate-500;
    }
  }
}
</style>
