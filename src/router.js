import VueRouter from 'vue-router';

import Home from '@/views/Home';
import CreateTodo from '@/views/CreateTodo';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/create',
    name: 'create',
    component: CreateTodo,
  },
];

export default function createRouter () {
  const router = new VueRouter({
    routes,
    mode: 'history',
  });

  return router;
}
