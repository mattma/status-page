import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return d3.range(40).map(function(i) {
      return {x: i / 39, y: (Math.sin(i / 3) + 2) / 4};
    });
  }
});
