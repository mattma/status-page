import Ember from 'ember';
import time from 'incident/utils/time/constant';

function parsedDate(second, chartRange) {
  let parseDate;
  let formattedDate;

  switch (chartRange) {
    case 'pass_day':
      parseDate = d3.time.format('%H:%M').parse;
      formattedDate = time.format((second * 1000), "HH:mm");
      break;
    case 'pass_week':
      // parseDate = d3.time.format('%H:%M:%S').parse;
      // formattedDate = time.format((second * 1000), "HH:mm:ss");
      // break;
      break;
    case 'pass_month':
      // parseDate = d3.time.format('%H:%M:%S').parse;
      // formattedDate = time.format((second * 1000), "HH:mm:ss");
      // break;
      break;
    default:
      parseDate = d3.time.format('%Y-%m-%d').parse;
      formattedDate = time.format((second * 1000), "YYYY-MM-DD");
  }

  return parseDate(formattedDate);
}

function domain(data, chart) {
  // fixing the data is not loading yet problem
  if (Ember.isEmpty(data)) {
      return false;
  }

  // the name of the stats, can be used to display different type of line chart
  // const chartName = chart.info.name;
  const chartRange = chart.info.range;

  let min = d3.min(data, d => parsedDate(d[0], chartRange));
  let max = d3.max(data, d => parsedDate(d[0], chartRange));

  let _w = +(chart.base.attr('width'));
  // Setup xScale domain range
  chart.xScale.domain([min, max]).range([0, _w]);

  // figure out the lowest min/highest max value on both y-axis
  let dataMax = d3.max(data, d => +(d[1]));
  chart.yScale.domain([0, dataMax]);
}

d3.chart('Line').extend('StatusLine', {
  onDataBind: function (data) {
    const chart = chart || this;
    const chartRange = chart.info.range;

    chart.line.x(d => chart.xScale(parsedDate(d[0], chartRange)));

    domain(data, chart);

    chart.line.y(d => chart.yScale(+(d[1])));
  }
});

d3.chart('Axis').extend('MyAxis', {
  onDataBind: function(data){
    var chart = chart || this;

    chart.xAxis.tickPadding(10).tickFormat(d3.time.format('%H:%M'));
    chart.xAxis.ticks(5);
    chart.yAxis.ticks(2);

    domain(data, chart);
  }
});

d3.chart("FinalChart", {
  initialize: function(containerInfo) {
    var axis =  this.mixin("MyAxis",  this.base.append("g").classed('axisgroup', true), {
      info: containerInfo,
      x: 'time',
      guide: true,
      ticksOnResize: true
    });

    // axis.xLabel('ms', 0, 20);

    this.mixin("StatusLine", this.base.append('g').classed('lines', true), {
      info: containerInfo,
      x: 'time'
    });
  }
});

export default Ember.Component.extend({
  didInsertElement () {
    let container = d3.ma.container(`#vis-${this.get('index')}`);
    let dataset= this.get('dataset');
    let data = dataset.values;

    container.box(420, 160); // .resize();

    let canvas = container.canvas().chart("FinalChart", Ember.merge({
      name: dataset.name,
      range: this.get('range')
    }, container.info()));

    // render it with some data
    canvas.draw(data, data => data);
  }
});
