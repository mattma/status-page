import Ember from 'ember';
import time from 'incident/utils/time/constant';
import d3 from 'd3';
import d3ma from 'd3.ma';

function parsedDate(second, chartRange) {
  let parseDate;
  let formattedDate;

  switch (chartRange) {
    case 'pass_day':
      parseDate = d3.time.format('%H:%M').parse;
      formattedDate = time.format((second * 1000), "HH:mm");
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

  let timeMin = d3.min(data, d => parsedDate(d[0], chartRange));
  let timeMax = d3.max(data, d => parsedDate(d[0], chartRange));

  let _w = +(chart.base.attr('width'));
  // Setup xScale domain range
  chart.xScale.domain([timeMin, timeMax]).range([0, _w]);

  // figure out the lowest min/highest max value on both y-axis
  let dataMin = d3.min(data, d => +(d[1]));
  let dataMax = d3.max(data, d => +(d[1]));

  switch (chart.info.yAxisUnit) {
    case 'percent':
      if (dataMin === dataMax) {
        dataMax = dataMax;
        dataMin = dataMax - 0.01;
      }
      break;
    default:
      if (dataMin === dataMax) {
        dataMax += dataMax / 2;
        dataMin -= dataMax / 2;
      }
  }

  chart.yScale.domain([dataMin, dataMax]);
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
    const chart = chart || this;
    let xFormatter;
    let yFormatter;

    switch (chart.info.range) {
      case 'pass_day':
        xFormatter = '%H:%M';
        break;
      default:
        xFormatter = '%m/%d';
    }

    switch (chart.info.yAxisUnit) {
      case 'percent':
        yFormatter = ".0%";
        break;
      default:
        yFormatter = "s";
    }

    chart.xAxis.tickPadding(10).tickFormat(d3.time.format(xFormatter));
    chart.xAxis.ticks(5);
    chart.yAxis.ticks(2).tickFormat(d3.format(yFormatter));

    domain(data, chart);
  }
});

d3.chart("FinalChart", {
  initialize: function(containerInfo) {
    this.mixin("MyAxis",  this.base.append("g").classed('axisgroup', true), {
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
    let container = d3ma.container(`#vis-${this.get('index')}`);
    let dataset= this.get('dataset');
    let data = dataset.values;
    const chartName= dataset.name;
    let yAxisUnit;

    switch (chartName) {
      case 'up':
        yAxisUnit = 'percent';
        break;
      default:
        yAxisUnit = 'ms';
    }

    container.box(420, 160); // .resize();

    let canvas = container.canvas().chart("FinalChart", Ember.merge({
      name: chartName,
      yAxisUnit: yAxisUnit,
      range: this.get('range')
    }, container.info()));

    // render it with some data
    canvas.draw(data, data => data);
  }
});
