import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './App';
import createRouter from './router';

Vue.config.productionTip = false;

Vue.use(VueRouter);

const router = createRouter();

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
