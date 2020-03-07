const { BumperDatabaseManager } = require('./manager');

const manager = new BumperDatabaseManager();

async function trigger () {
  await manager.run('DELETE FROM todos;');
  manager.close();
}

trigger();
