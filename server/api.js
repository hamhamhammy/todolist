const express = require('express');

const { BumperDatabaseManager } = require('./database/manager');

const router = express.Router();

const { log } = console;

router.post('/todo/create', async (req, res) => {
  log('api todo/create');
  const {
    author,
    content,
    due_date,
  } = req.body;

  const manager = new BumperDatabaseManager();
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

router.put('/todo/edit', async () => { // req, res
  log('api todo/edit');
  // TODO - build this api
});

router.get('/todo/fetch', async (req, res) => {
  const { offset } = req.query;
  log('api todo/fetch offset', offset);

  const manager = new BumperDatabaseManager();
  const results = await manager.fetchTodos(req.query);
  manager.close();

  // TODO - add validation of things coming into this api

  if (results) {
    res.json({ results });
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
