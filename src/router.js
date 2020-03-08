import VueRouter from 'vue-router';

import Home from '@/views/Home';
import CalendarTodo from '@/views/CalendarTodo';
import CreateTodo from '@/views/CreateTodo';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/calendar/:month/:year',
    name: 'calendar',
    component: CalendarTodo,
    props: true,
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
