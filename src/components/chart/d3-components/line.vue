<template lang="pug">
    path(class="line" ref="line" :style="style")
</template>

<script>
import * as d3 from 'd3';

export default {
  props: ['layout', 'series-data', 'scale'],
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // Get scale
      const scale = this.scale;

      // Line object
      const line = d3.line()
        .x(d => scale.x(d.timestamp))
        .y(d => scale.y(d.value));

      // DOM node for line
      const $line = d3.select(this.$refs.line);
      $line.data([
        this.seriesData.values.filter(d => typeof d.value !== typeof null),
      ])
      .attr('d', line);
    },
  },
  computed: {
    style() {
      return {
        fill: 'none',
        stroke: this.scale.color(this.seriesData.id),
        strokeWidth: 2,
      };
    },
  },
  watch: {
    // Changes to scale means we have to redraw the line!
    scale: {
      deep: true,
      handler() {
        this.drawLine();
      },
    },
  },
};
</script>

<style lang="scss">

</style>
