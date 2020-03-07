const { BumperDatabaseManager } = require('./manager');

const manager = new BumperDatabaseManager();

const BASE_TODO_FIRST = {
  author: 'User7',
  content: 'This is my todo',
  due_date: (new Date()).toISOString(),
};

const BASE_TODO_SECOND = {
  author: 'Anonymous',
  content: 'Foobar message index',
  due_date: (new Date()).toISOString(),
};

let todos = new Array(30).fill(BASE_TODO_SECOND);

todos = [BASE_TODO_FIRST, BASE_TODO_FIRST, ...todos];

async function insertTodos (todosArray) {
  for (const [index, todo] of todosArray.entries()) {
    await manager.createTodo({
      ...todo,
      content: `${todo.content} ${index + 1}`,
    });
  }
}

async function trigger () {
  await insertTodos(todos);
  manager.close();
}

trigger();
