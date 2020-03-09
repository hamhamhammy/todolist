const { TodoDatabaseManager } = require('./manager');

const manager = new TodoDatabaseManager();

const BASE_TODO_FIRST = {
  author: 'Bobby',
  content: 'Clean up my room',
  due_date: (new Date()).toISOString(),
};

const BASE_TODO_SECOND = {
  author: 'Alice',
  content: 'Go and buy some groceries',
  due_date: (new Date()).toISOString(),
};

let todos = new Array(10).fill(BASE_TODO_SECOND);

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
