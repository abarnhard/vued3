<template lang="pug">
    svg(:view-box.camel="viewBox" preserveAspectRatio="xMidYMid meet")
        g(class="d3__stage" :style="stageStyle")
            d3__axis(
                v-for="axis in _.uniq(axes)"
                :axis="axis"
                :layout="layout"
                :scale="scale")

            d3__series(
                v-for="seriesData in chartData"
                :series-data="seriesData"
                :layout="layout"
                :scale="scale")
</template>

<script>
import * as d3 from 'd3';

export default {
  props: [
    'axes',       // Chart axes
    'layout',     // Dimensions for the chart and margins
    'chart-data',  // Data for plotting
  ],
  computed: {
    // SVG viewBox
    viewBox() {
      const outerWidth = this.layout.width + this.layout.marginLeft + this.layout.marginRight;
      const outerHeight = this.layout.height + this.layout.marginTop + this.layout.marginBottom;
      return `0 0 ${outerWidth} ${outerHeight}`;
    },
    // Stage
    stageStyle() {
      return {
        transform: `translate(${this.layout.marginLeft}px, ${this.layout.marginTop}px)`,
      };
    },
  },
  data() {
    return {
      scale: {
        x: this.getScaleX(),
        y: this.getScaleY(),
        color: d3.scaleOrdinal().range(['#159078', '#999999']).domain(['Current', 'Previous']),
      },
    };
  },
  methods: {
    // Get x-axis scale
    getScaleX() {
      return d3.scaleTime()
        .range([0, this.layout.width])
        .domain(d3.extent(this.chartData, d => d3.utcParse('%Y-%m-%dT%H:%M:%S')(d[0]).setHours(0, 0, 0, 0)));
    },
    // Get y-axis scale
    getScaleY() {
      return d3.scaleLinear()
        .range([this.layout.height, 0])
        .domain([
          0,
          d3.max(this.chartData, d => d3.max(d.values, e => e.value)),
        ]);
    },
  },
  watch: {
    // Watch for layout changes
    layout: {
      deep: true,
      handler() {
        this.scale.x = this.getScaleX();
        this.scale.y = this.getScaleY();
      },
    },
  },
};
</script>

<style lang="scss">

</style>
