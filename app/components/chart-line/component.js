import Ember from 'ember';

function domain(data, context) {
  // Setup xScale domain range
  context.xScale.domain( [ 0, d3.max(data, function(d, i){ return d.x }) ]);
  context.yScale.domain([ 0, d3.max(data, function(d, i){ return d.y }) ]);
}

d3.chart('Axis').extend('MyAxis', {
  onDataBind: function(data){
    var chart = chart || this;
    domain(data, chart);
  }
});

d3.chart("FinalChart", {
  initialize: function(containerInfo) {
    // Used for the clipPath object
    // var clip =  this.mixin("Clip",  this.base);
    // clip.box(300, 600).xy(0, 50);

    var axis =  this.mixin("MyAxis",  this.base.append("g").classed('axisgroup', true), {
      info: containerInfo,
      guide: true,
      ticksOnResize: true
    });

    axis
      .xLabel('Line Chart X', 0, 20 )
      .yLabel('Y Labels', 15, 20);

    this.mixin("Line", this.base.append('g').classed('lines12', true), {
      info: containerInfo
    });
  }
});

export default Ember.Component.extend({
  didInsertElement () {
    let container = d3.ma.container('#vis');
    let data= this.get('data');

    container.box(500, 300); // .resize();

    let canvas = container.canvas().chart("FinalChart", container.info());

    // render it with some data
    canvas.draw(data, function(data) { return data });

    // In plain d3, this works too
    // d3.select('.canvas').chart("FinalChart", container.info() ).draw(data);
  }
});
