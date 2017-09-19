import Vue from 'vue';

import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

/* eslint-disable no-new */
window.d3Vis = new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
});
