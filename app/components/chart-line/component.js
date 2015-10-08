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

d3.chart('Circle').extend('MyCircle', {
  onDataBind: function(data){
    var chart = chart || this;
    domain(data, chart);
  },

  onDataMouseenter: function(d, i, chart) {
    var chart = chart || this;
    var obj = {
      'value': d.x,
      'pointIndex': i,
      'd': d,
      'event': d3.event,
      'pos': [
        chart.xScale(d.x),
        chart.yScale(d.y)
      ]
    };
    return obj;
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

    var line = this.mixin("Line", this.base.append('g').classed('lines', true), {
      info: containerInfo
    });

    var area = this.mixin("Area", this.base.append('g').classed('area', true), {
      info: containerInfo
    });

    var circles = this.mixin("MyCircle", this.base.append('g').classed('circles', true), {
      info: containerInfo,
      showOnHover: true
    });

    circles.layer('circle').on('enter', function(chart){
      var chart = this.chart();

      this.attr({
        'class': 'dot',
        'cx': function(d, i){ return area.xScale(d.x) },
        'cy': function(d, i){ return area.yScale(d.y) },
        'r': 2.5
      })
    });

    circles.dispatch.on('d3maSingleWindowResize', function(chart, single){
      var chart = chart || this;

      single.attr({
        'cx': function(d, i){ return area.xScale(d.x) },
        'cy': function(d, i){ return area.yScale(d.y) }
      });
    });

    // Handle resize in utils.js
    // convininent methods to recall onResize()
    d3.ma.resize(axis, line, area, circles);

    //Tooltip section
    var tooltip = d3.ma.tooltip(this.base);
    circles.dispatch.on('d3maMouseenter', function(e){
      e.pos = [ e.pos[0] + 20, e.pos[1] + 100 ];
      var html = "<div class='tips'>" + e.d.x + "<br><strong>" + e.d.y + "</strong>" + "</div>"
      tooltip.show([e.pos[0], e.pos[1]], html);
    });

    circles.dispatch.on('d3maMouseout', function(e){
      tooltip.close();
    });

    //d3.ma.reloadResize(axis, line, area, circles);
  }
});

export default Ember.Component.extend({
  didInsertElement () {
    var container = d3.ma.container('#vis');
    let data= this.get('data');

    container.box(500, 300); // .resize();

    var canvas = container.canvas().chart("FinalChart", container.info() );

    //render it with some data
    canvas.draw(data, function(data) { return data } );

    // In plain d3, this works too
    // d3.select('.canvas').chart("FinalChart", container.info() ).draw(data);

    // var data1 = d3.range(60).map(function(i) {
    //   return {x: i / 60, y: (Math.sin(i / 3) + 2) / 20};
    // });

    // d3.selectAll("button").on("click", function() {
    //   canvas.draw(data1);
    // });
  },
});
