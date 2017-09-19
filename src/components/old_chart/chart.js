import * as d3 from 'd3';

import Area from './d3-components/area';
import Axis from './d3-components/axis';
import Chart from './d3-components/chart';
import Line from './d3-components/line';
import PointComp from './d3-components/point';
import Scatter from './d3-components/scatter';
import Series from './d3-components/series';

export default {
  data() {
    return {
      layout: {
        width: 800,
        height: 250,
        marginTop: 45,
        marginRight: 35,
        marginBottom: 50,
        marginLeft: 50,
      },
      chartData: createChartData(),
      axes: ['left', 'bottom'],
    };
  },
  components: {
    d3__area: Area,
    d3__axis: Axis,
    d3__chart: Chart,
    d3__line: Line,
    d3__point: PointComp,
    d3__scatter: Scatter,
    d3__series: Series,
  },
};

function createChartData() {
  const response = {
    data: {
      flipbooks: {
        rawData: [],
      },
    },
  };
  const chartData = response.data.flipbooks.rawData;

  // Parse the data and split it into series
  const columns = ['Timestamp', 'Previous', 'Current'];
  const offset = 1;

  return columns.slice(offset).map((id, index) => ({
    id,
    values: chartData.map(d => ({
      timestamp: d3.utcParse('%Y-%m-%dT%H:%M:%S')(d[0]).setHours(0, 0, 0, 0),
      value: d[index + offset],
    })),
  }));
}
