const express = require('express');

const { TodoDatabaseManager } = require('./database/manager');

const router = express.Router();

const { log } = console;

router.post('/todo/create', async (req, res) => {
  log('api todo/create');
  const {
    author,
    content,
    due_date,
  } = req.body;

  const manager = new TodoDatabaseManager();
  const result = await manager.createTodo({
    author,
    content,
    due_date,
  });
  manager.close();

  // TODO - add validation of things coming into this api

  if (result) {
    res.sendStatus(204);
  } else {
    res.sendStatus(400);
  }
});

router.put('/todo/modify/:rowid', async (req, res) => {
  const { rowid } = req.params;
  const {
    author,
    content,
    due_date,
  } = req.body;
  log('api todo/modify', rowid);

  // TODO - add validation of things coming into this api

  const manager = new TodoDatabaseManager();

  try {
    await manager.updateTodo({
      rowid,
      author,
      content,
      due_date,
    });

    manager.close();
    res.sendStatus(204);
  } catch (e) {
    manager.close();
    res.sendStatus(400);
  }
});

router.delete('/todo/delete/:rowid', async (req, res) => {
  const { rowid } = req.params;
  log('api todo/delete', rowid);

  const manager = new TodoDatabaseManager();
  const id = await manager.deleteTodo(rowid);
  manager.close();

  if (id) {
    res.json({ id });
  } else {
    res.sendStatus(400);
  }
});

router.get('/todo/fetch', async (req, res) => {
  log('api todo/fetch');

  const manager = new TodoDatabaseManager();
  const results = await manager.fetchTodos(req.query);
  manager.close();

  // TODO - add validation of things coming into this api

  if (results) {
    res.json({ results });
  } else {
    res.sendStatus(400);
  }
});

router.get('/todo/fetch-month', async (req, res) => {
  log('api todo/fetch-month');

  const manager = new TodoDatabaseManager();
  const results = await manager.fetchTodosByMonth(req.query);
  manager.close();

  // TODO - add validation of things coming into this api

  if (results) {
    res.json({ results });
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
