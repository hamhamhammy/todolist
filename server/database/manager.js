
const sqlite3 = require('sqlite3').verbose(); // https://github.com/mapbox/node-sqlite3/wiki/API

const { log } = console;

class DatabaseManager {
  constructor (filepath, mode = sqlite3.OPEN_READWRITE) {
    this.db = new sqlite3.Database(filepath, mode);
  }

  // whereFilter: used to create database filter string and array of values
  // Array of key value pairs, key is database column name, value is database column value
  // Ex. [{ column: 'license', value: 777777 }, { column: 'state', value: 'California' }]
  static whereFilter (filters) {
    const filtersArray = filters.filter(filter => Boolean(filter.value));
    const query = filtersArray.reduce((acc, { column }, index) => {
      if (index === 0) {
        acc += ' WHERE'; // eslint-disable-line no-param-reassign
      }

      if (acc !== '' && index !== 0) {
        acc += ' AND'; // eslint-disable-line no-param-reassign
      }

      acc += ` ${column} = ?`; // eslint-disable-line no-param-reassign
      return acc;
    }, '').trim();

    const values = filtersArray.map(filter => filter.value);

    return {
      query,
      values,
    };
  }

  // run: used to create or alter tables and to insert or update table data
  run (sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function run (err) {
        if (err) {
          log(`Error running sql (run) ${sql}`);
          log(err);
          reject(err);
        } else {
          log('DatabaseManager run success');
          resolve({
            id: this.lastID,
            changes: this.changes,
          });
        }
      });
    });
  }

  // get: used to select a single row of data from one or more tables
  get (sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, result) => {
        if (err) {
          log(`Error running sql (get) ${sql}`);
          log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  // all: select multiple rows of data from one or more tables
  all (sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, results) => {
        if (err) {
          log(`Error running sql (all) ${sql}`);
          log(err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  close () {
    log('close db');
    this.db.close();
  }
}

class BumperDatabaseManager extends DatabaseManager {
  constructor () {
    super('./server/database/todolist.db'); // call the super class constructor and pass in the name parameter
  }

  async createTodo ({ author, content, due_date }) {
    const result = await this.run(
      'INSERT INTO todos (author, content, due_date) VALUES(?,?,?)',
      [author, content, due_date],
    );
    return result;
  }

  async fetchTodos ({ limit, offset, author = '', content = '', due_date = '' }) {
    const { query, values } = BumperDatabaseManager.whereFilter([
      { column: 'author', value: author },
      { column: 'content', value: content },
      { column: 'due_date', value: due_date },
    ]);
    log('whereFilter=', query, values);

    const results = await this.all(
      `SELECT rowid, * FROM todos ${query} ORDER BY rowid DESC LIMIT ? OFFSET ?`,
      [...values, limit, offset],
    );

    log('fetchTodos count = ', results.length);

    return results;
  }

  async fetchTodosByMonth ({ month, year }) {
    const results = await this.all(
      `SELECT rowid, * FROM todos WHERE due_date LIKE '${year}-${month}%' ORDER BY due_date ASC`,
    );

    log('fetchTodos count = ', results.length);

    return results;
  }
}

module.exports = {
  BumperDatabaseManager,
};
