<template lang="pug">
    g(:class="[classList]" ref="axis" :style="style")
</template>

<script>
import * as d3 from 'd3';

export default {
  props: ['axis', 'layout', 'scale'],
  data() {
    return {
      classList: ['axis'].concat(this.getAxisClasses()),
    };
  },
  mounted() {
    this.drawAxis();
  },
  computed: {
    style() {
      return {
        transform: this.getAxisTransform(),
      };
    },
  },
  methods: {
    // Return a class list containing the appropriate labels for axes
    getAxisClasses() {
      const axis = {
        top: 'x',
        bottom: 'x',
        left: 'y',
        right: 'y',
      };
      return [this.axis, axis[this.axis]];
    },
    // Draw axis
    drawAxis() {
      const $axis = d3.select(this.$refs.axis);
      const scale = this.scale;
      const axisGenerator = {
        top: d3.axisTop(scale.x).tickFormat(d3.timeFormat('%b %d')),
        right: d3.axisRight(scale.y),
        bottom: d3.axisBottom(scale.x).tickFormat(d3.timeFormat('%b %d')),
        left: d3.axisLeft(scale.y),
      };

      $axis.call(axisGenerator[this.axis]);
    },

    // Return necessary axis transformation for proper positioning
    getAxisTransform() {
      const axisOffset = {
        top: { x: 0, y: 0 },
        right: { x: this.layout.width, y: 0 },
        bottom: { x: 0, y: this.layout.height },
        left: { x: 0, y: 0 },
      };

      return `translate(${axisOffset[this.axis].x}px, ${axisOffset[this.axis].y}px)`;
    },
  },
  watch: {
    // Changes to scale means we have to redraw the line!
    scale: {
      deep: true,
      handler() {
        this.drawAxis();
      },
    },
  },
};
</script>

<style lang="scss">

</style>
