import Ember from 'ember';
import time from 'incident/utils/time/constant';

function parsedDate(second) {
  let parseDate = d3.time.format('%Y-%m-%d').parse;
  let formattedDate = time.format((second * 1000), "YYYY-MM-DD");
  return parseDate(formattedDate);
}

function domain(data, chart) {
  // fixing the data is not loading yet problem
  if (Ember.isEmpty(data)) {
      return false;
  }

  let minDate = d3.min(data, d => parsedDate(d[0]));
  let maxDate = d3.max(data, d => parsedDate(d[0]));

  let _w = +(chart.base.attr('width'));
  // Setup xScale domain range
  chart.xScale.domain([minDate, maxDate]).range([0, _w]);

  // figure out the lowest min/highest max value on both y-axis
  let dataMax = d3.max(data, d => +(d[1]));
  chart.yScale.domain([0, dataMax]);
}

d3.chart('Line').extend('StatusLine', {
  onDataBind: function (data) {
    var chart = chart || this;

    chart.line.x(d => chart.xScale(parsedDate(d[0])));

    domain(data, chart);

    chart.line.y(d => chart.yScale(+(d[1])));
  }
});

d3.chart('Axis').extend('MyAxis', {
  onDataBind: function(data){
    var chart = chart || this;

    chart.xAxis.tickPadding(10); //.tickFormat(customTimeFormat);
    chart.xAxis.ticks(5);
    chart.yAxis.ticks(2);

    domain(data, chart);
  }
});

d3.chart("FinalChart", {
  initialize: function(containerInfo) {
    var axis =  this.mixin("MyAxis",  this.base.append("g").classed('axisgroup', true), {
      info: containerInfo,
      guide: true,
      ticksOnResize: true
    });

    axis.xLabel('ms', 0, 20);

    this.mixin("StatusLine", this.base.append('g').classed('lines', true), {
      info: containerInfo,
      x: 'time'
    });
  }
});

export default Ember.Component.extend({
  didInsertElement () {
    let container = d3.ma.container(`#vis-${this.get('index')}`);
    let dataset= this.get('data');
    let data = dataset.values;

    container.box(420, 160); // .resize();

    let canvas = container.canvas().chart("FinalChart", container.info());

    // render it with some data
    canvas.draw(data, data => data);
  }
});
