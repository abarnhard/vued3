import Vue from 'vue';

import App from './App';
import router from './router';

Vue.config.productionTip = false;

/* eslint-disable no-new */
window.d3Vis = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
