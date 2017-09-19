import Vue from 'vue';
import Router from 'vue-router';
import BarChart from '@/components/bar-chart';
import ScatterPlot from '@/components/scatter-plot';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ScatterPlot',
      component: ScatterPlot,
    },
    {
      path: '/bar-chart',
      name: 'BarChart',
      component: BarChart,
    },
  ],
});
