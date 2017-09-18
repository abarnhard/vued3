import * as d3 from 'd3';

// Component: SVG parent and stage
Vue.component('d3__chart', {
  template: '#d3__chart',
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
        .domain(d3.extent(chartData, function(d) {
          return d3.utcParse('%Y-%m-%dT%H:%M:%S')(d[0]).setHours(0, 0, 0, 0);
        }));
    },
    // Get y-axis scale
    getScaleY() {
      return d3.scaleLinear()
        .range([this.layout.height, 0])
        .domain([
          0,
          d3.max(this.chartData, function(d) {
            return d3.max(d.values, function(e) {
              return e.value;
            });
          }),
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
});

// Component: Chart axes
Vue.component('d3__axis', {
  template: '#d3__axis',
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
});

// Component: Data series
Vue.component('d3__series', {
  template: '#d3__series',
  props: ['layout', 'series-data', 'scale'],
});

// Component: D3 line
Vue.component('d3__line', {
  template: '#d3__line',
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
        .x(function(d) {
          return scale.x(d.timestamp);
        })
        .y(function(d) {
          return scale.y(d.value);
        });

      // DOM node for line
      const $line = d3.select(this.$refs.line);
      $line.data([this.seriesData.values.filter(function(d) {
        return typeof d.value !== typeof null;
      })])
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
});

// Component: D3 point/scatter
Vue.component('d3__scatter', {
  template: '#d3__scatter',
  props: ['layout', 'series-data', 'scale'],
  watch: {
    scale: {
      deep: true,
      handler() {},  // Has to be included for nested components watch to fire properly
    },
  },
});

// D3 component: points
Vue.component('d3__point', {
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
        .attr('cx', function(d) {
          return scale.x(d.timestamp);
        })
        .attr('cy', function(d) {
          return scale.y(d.value);
        })
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
});

// Component: D3 area
Vue.component('d3__area', {
  template: '#d3__area',
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
        .x(function(d) {
          return scale.x(d.timestamp);
        })
        .y0(scale.y(0))
        .y1(function(d) {
          return scale.y(d.value);
        });

      // DOM node for area
      const $area = d3.select(this.$refs.area);

      $area.datum(this.seriesData.values.filter(function(d) {
        return typeof d.value !== typeof null;
      }))
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
});
