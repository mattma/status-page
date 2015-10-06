import DS from 'ember-data';

// http://emberjs.com/guides/models/defining-models/
let attr = DS.attr;

export default DS.Model.extend({
  level: attr('string'),
  message: attr('string'),
  time: attr('date')
});
