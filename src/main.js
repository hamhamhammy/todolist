import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

import App from './App';
import createStore from './store';
import createRouter from './router';

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(VueRouter);

const store = createStore();
const router = createRouter();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
