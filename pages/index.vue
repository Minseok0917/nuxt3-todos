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
        <div class="todo-list" v-if="state.currentTodos.length">
          <template v-for="todo in state.currentTodos" :key="todo.id">
            <div
              class="todo-item"
              :class="{ checked: todo.checked, edit: todo.edit }"
            >
              <div
                class="todo-checkbox"
                @click="handlers.todos.toggleChecked(todo)"
              >
                <Icon v-if="todo.checked" name="ic:baseline-check"></Icon>
              </div>
              <template v-if="todo.edit">
                <input
                  type="text"
                  class="todo-edit-input"
                  :value="todo.text"
                  v-focus="true"
                  ref="$foucsInput"
                  @focusout="(e) => handlers.todos.editFocusOut(e, todo)"
                  @input="(e) => handlers.todos.editInput(e, todo)"
                  @keydown="(e) => handlers.todos.editKeydown(e, todo)"
                />
              </template>
              <template v-else>
                <div class="todo-text" @dblclick="handlers.todos.edit(todo)">
                  {{ todo.text }}
                </div>
                <button
                  class="todo-delete"
                  type="button"
                  @click="handlers.todos.delete(todo)"
                >
                  <Icon name="ant-design:delete-outlined" />
                </button>
              </template>
            </div>
          </template>
        </div>
        <div class="todo-options">
          <span class="todo-length">{{ state.todos.length }} items left</span>
          <div class="todo-filters">
            <template v-for="buttonText in filterButtons" :key="buttonText">
              <button
                type="button"
                :class="{ active: state.selectedFilter === buttonText }"
                @click="handlers.todos.changeFilter(buttonText)"
              >
                {{ buttonText }}
              </button>
            </template>
          </div>
          <button
            v-if="state.complete.length"
            class="todo-clear"
            type="button"
            @click="handlers.todos.clearComplete"
          >
            Clear Complete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const filterButtons = ["all", "active", "complete"];
const state = reactive({
  key: 0,
  editId: -1,
  todos: [],
  todoInput: "",
  selectedFilter: "all",
  test: "",

  all: computed(() => state.todos),
  active: computed(() => state.todos.filter(({ checked }) => !checked)),
  complete: computed(() => state.todos.filter(({ checked }) => checked)),
  currentTodos: computed(() => state[state.selectedFilter] || state.all),
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
          edit: false,
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
    changeFilter(filterName) {
      state.selectedFilter = filterName;
    },
    clearComplete() {
      state.todos = state.active;
    },
    edit(todo) {
      todo.edit = true;
    },
    editFocusOut(event, todo) {
      todo.edit = false;
    },
    editKeydown(event, todo) {
      const isUpdated = [13, 9].includes(event.keyCode); // Enter, Tab
      if (isUpdated) {
        todo.edit = false;
      }
    },
    editInput(event, todo) {
      todo.text = event.target.value;
    },
  },
};
</script>
<style lang="scss">
.todo {
  &-container {
    @apply w-[600px];
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
  &-edit-input {
    @apply flex-1 p-2;
    @apply text-sm;
    @apply outline-none;
    @apply border border-slate-200;
  }
  &-list {
    @apply flex flex-col;
  }

  &-body {
    @apply p-4;
    @apply border border-slate-100;
    @apply shadow-2xl shadow-slate-200;
  }
  &-item {
    @apply flex items-center  p-2;
    @apply border-b border-b-slate-100;

    &:last-child {
      @apply border-b-transparent;
    }
    &:hover .todo-delete {
      @apply flex;
    }
    &.checked {
      .todo-text {
        @apply line-through text-slate-400;
      }
    }
    &.edit {
      .todo-checkbox {
        visibility: hidden;
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
    @apply flex-1 p-2;
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
  &-options {
    @apply relative;
    @apply p-2;
    @apply flex justify-between;
  }
  &-filters {
    @apply absolute left-0 right-0;
    @apply flex justify-center gap-2;
    @apply text-sm text-slate-400;

    button {
      @apply px-2;
      @apply capitalize;
      @apply border border-transparent rounded-sm;
      @apply hover:border hover:border-rose-100;
      &.active {
        @apply border-rose-200;
      }
    }
  }
  &-clear {
    @apply relative text-sm text-slate-400;
  }
  &-length {
    @apply text-sm text-slate-400;
  }
}
</style>
