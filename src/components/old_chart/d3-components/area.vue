<template lang="pug">
    path(class="area" ref="area" :style="style")
</template>

<script>
import * as d3 from 'd3';

export default {
  props: ['layout', 'series-data', 'scale'],
  mounted() {
    this.drawArea();
  },
  methods: {
    drawArea() {
      // Get scale
      const scale = this.scale;

      // Area object
      const area = d3.area()
        .x(d => scale.x(d.timestamp))
        .y0(scale.y(0))
        .y1(d => scale.y(d.value));

      // DOM node for area
      const $area = d3.select(this.$refs.area);

      $area.datum(this.seriesData.values.filter(d => typeof d.value !== typeof null))
      .attr('d', area);
    },
  },
  computed: {
    style() {
      return {
        fill: this.scale.color(this.seriesData.id),
        fillOpacity: 0.25,
      };
    },
  },
  watch: {
    // Changes to scale means we have to redraw the line!
    scale: {
      deep: true,
      handler() {
        this.drawArea();
      },
    },
  },
};
</script>

<style lang="scss">

</style>
