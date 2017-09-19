<template lang="pug">
  svg(:view-box.camel="viewBox" preserveAspectRatio="xMidYMid meet")
    g(class="vued3_stage" :style="stageStyle")
</template>

<script>
export default {
  props: [
    /*
     * layout is dimensions for the chart and margins
     * { width, height, marginTop, marginRight, marginBottom, marginLeft }
     * assumes int values that represent pixels
     */
    'layout',
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
  watch: {
    layout: {
      deep: true,
      handler() {},
    }
  }
}
</script>
