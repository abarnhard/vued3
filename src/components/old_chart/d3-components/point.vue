<template lang="pug">
    circle(class="point" ref="point" :style="style")
</template>

<script>
import * as d3 from 'd3';

export default {
  template: '#d3__point',
  props: ['layout', 'point-data', 'scale', 'series-id'],
  mounted() {
    this.drawPoint();
  },
  methods: {
    drawPoint() {
      // Get scales
      const scale = this.scale;

      // DOM node for points
      const $point = d3.select(this.$refs.point);
      $point.datum(this.pointData)
        .attr('cx', d => scale.x(d.timestamp))
        .attr('cy', d => scale.y(d.value))
        .attr('r', 5);
    },
  },
  computed: {
    style() {
      return {
        fill: '#fff',
        stroke: this.scale.color(this.seriesId),
        strokeWidth: 2,
      };
    },
  },
  watch: {
    scale: {
      deep: true,
      handler() {
        this.drawPoint();
      },
    },
  },
};
</script>

<style lang="scss">

</style>
