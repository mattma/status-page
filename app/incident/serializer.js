import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  primaryKey: "incidents",

  // extractSingle (store, type, payload, id, requestType) {
  //   payload.id = id;
  //   console.log('payload: ', payload);
  //   return this._super(store, type, { billing: payload }, id, requestType);
  // }
});
