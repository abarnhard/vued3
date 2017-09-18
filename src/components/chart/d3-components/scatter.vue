<template lang="pug">
    g(class="points")
        d3__point(
            v-for="pointData in seriesData.values"
            v-if="typeof pointData.value !== typeof null"
            :series-id="seriesData.id"
            :point-data="pointData"
            :layout="layout"
            :scale="scale")
</template>

<script>
export default {
  template: '#d3__scatter',
  props: ['layout', 'series-data', 'scale'],
  watch: {
    scale: {
      deep: true,
      handler() {},  // Has to be included for nested components watch to fire properly
    },
  },
};
</script>

<style lang="scss">

</style>
