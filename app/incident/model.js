import DS from 'ember-data';

// http://emberjs.com/guides/models/defining-models/
let attr = DS.attr;

export default DS.Model.extend({
  incidents: attr()
  // level: attr(),
  // message: attr(),
  // time: attr()
});
