import Vue from 'vue';
import Router from 'vue-router';
import Chart from '@/components/chart';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Chart',
      component: Chart,
    },
  ],
});
