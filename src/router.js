import VueRouter from 'vue-router';

import Home from '@/views/Home';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
];

export default function createRouter () {
  const router = new VueRouter({
    routes,
    mode: 'history',
  });

  return router;
}
