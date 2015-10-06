import Ember from 'ember';
import ajax from 'incident/utils/ajax/ajax';

export default Ember.Route.extend({
  model () {
    const url = '/incidents/16714';
    const opts =  {
      type: "GET",
    };

    return ajax(url, opts)
      .then(resp => resp.incidents)
      .catch(err => console.log('err: ', err));
  }
});
