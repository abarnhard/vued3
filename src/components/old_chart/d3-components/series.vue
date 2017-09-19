<template lang="pug">
    g(class="d3__series")
        d3__area(
            :layout="layout"
            :series-data="this.seriesData"
            :scale="this.scale")
        d3__line(
            :layout="layout"
            :series-data="this.seriesData"
            :scale="this.scale")
        d3__scatter(
            :layout="layout"
            :series-data="this.seriesData"
            :scale="this.scale")
</template>

<script>
export default {
  template: '#d3__series',
  props: ['layout', 'series-data', 'scale'],
};
</script>

<style lang="scss">

</style>
