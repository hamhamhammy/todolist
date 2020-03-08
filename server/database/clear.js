const { TodoDatabaseManager } = require('./manager');

const manager = new TodoDatabaseManager();

async function trigger () {
  await manager.run('DELETE FROM todos;');
  manager.close();
}

trigger();
