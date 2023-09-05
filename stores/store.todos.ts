export const useStoreTodos = defineStore("todos", {
  state: () => ({
    todos: [],
    todoInput: "",
    selectedFilter: "all",
    key: 0,
  }),
  persist: true,
});
