<template>
  <div id='app'>
    <router-view></router-view>
  </div>
</template>

<script>
import * as d3 from 'd3';

const response = {
  data: {
    flipbooks: {
      rawData: [
        ['2017-03-01T01:00:00', 1, 3],
        ['2017-03-02T01:00:00', 2, 6],
        ['2017-03-03T01:00:00', 2, 6],
        ['2017-03-04T01:00:00', 2, 6],
        ['2017-03-05T01:00:00', 2, 6],
        ['2017-03-06T01:00:00', 4, 6],
        ['2017-03-07T01:00:00', 9, 7],
        ['2017-03-08T01:00:00', 18, 14],
        ['2017-03-09T01:00:00', 23, 16],
        ['2017-03-10T01:00:00', 24, 16],
        ['2017-03-11T01:00:00', 24, 16],
        ['2017-03-12T01:00:00', 24, 16],
        ['2017-03-13T01:00:00', 25, 18],
        ['2017-03-14T01:00:00', 26, 19],
        ['2017-03-15T01:00:00', 30, 21],
        ['2017-03-16T01:00:00', 32, 23],
        ['2017-03-17T01:00:00', 32, 23],
        ['2017-03-18T01:00:00', 32, 23],
        ['2017-03-19T01:00:00', 32, 23],
        ['2017-03-20T01:00:00', 32, 23],
        ['2017-03-21T01:00:00', 32, 25],
        ['2017-03-22T01:00:00', 32, 26],
        ['2017-03-23T01:00:00', 32, 28],
        ['2017-03-24T01:00:00', 32, 29],
        ['2017-03-25T01:00:00', 32, 29],
        ['2017-03-26T01:00:00', 32, 29],
        ['2017-03-27T01:00:00', 32, 29],
        ['2017-03-28T01:00:00', 35, 29],
        ['2017-03-29T01:00:00', 35, 29],
        ['2017-03-30T01:00:00', 35, null],
        ['2017-03-31T01:00:00', 35, null]
      ]
    }
  }
};
const chartData = response.data.flipbooks.rawData;

// Parse the data and split it into series
const columns = ['Timestamp', 'Previous', 'Current'];
const offset = 1;

var c = columns.slice(offset).map(function(id, index) {
  return {
    id: id,
    values: chartData.map(function(d) {
      return {
        timestamp: d3.utcParse('%Y-%m-%dT%H:%M:%S')(d[0]).setHours(0,0,0,0),
        value: d[index + offset]
      }
    })
  }
});

export default {
  name: 'app',
};
</script>

<style>
body {
    line-height: 1.75;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
