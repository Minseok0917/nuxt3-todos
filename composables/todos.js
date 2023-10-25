export class createTodo {
  static init({ id, name, completed = false }) {
    return new createTodo({ id, name, completed });
  }
  constructor({ id, name, completed = false }) {
    this.id = id;
    this.name = name;
    this.completed = completed;
  }
  updateTodo(changes) {
    return createTodo.init({ ...this, ...changes });
  }
  setCompletedStatus(status) {
    return this.updateTodo({ completed: status });
  }
}

export class Todos {
  static init() {
    return new Todos();
  }
  constructor(todos = []) {
    this.todos = todos;
  }

  initTodos(changeTodos) {
    this.todos = changeTodos;
    return this;
  }
  addTodo({ id, name }) {
    return this.initTodos([...this.todos, createTodo.init({ id, name })]);
  }
  removeTodo({ id }) {
    return this.initTodos(this.todos.filter((todo) => todo.id !== id));
  }
  removeCompletedTodos() {
    return this.initTodos(this.todos.filter((todo) => !todo.completed));
  }

  getAllCompletedStatus(status) {
    return this.todos.filter((todo) => todo.completed === status);
  }
  getActiveTodosCount() {
    return this.getAllCompletedStatus(false).length;
  }

  setAllCompletedStatus(status) {
    return this.initTodos(this.todos.map((todo) => todo.setCompletedStatus(status)));
  }
  setChangeName(index, todo, name) {
    return this.initTodos(this.todos.with(index, todo.updateTodo({ name })));
  }
  setChangeCompletedStatus(index, todo, status) {
    return this.initTodos(this.todos.with(index, todo.setCompletedStatus(status)));
  }

  isAllCompletedStatus(status) {
    return this.todos.every((todo) => todo.completed === status);
  }
  existTodos() {
    return this.todos.length > 0;
  }
  existCompletedTodos() {
    return this.todos.some((todo) => todo.completed);
  }
}
