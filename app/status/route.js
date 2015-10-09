import Ember from 'ember';
import ajax from 'incident/utils/ajax/ajax';

export default Ember.Route.extend({
  model(params) {
    if (!params.range) {
      return ;
    }

    const url = `/stats/up?${params.range}`;
    const opts =  {
      type: "GET",
    };

    return ajax(url, opts)
      .then(resp => resp)
      .catch(err => console.log('err: ', err));
  }
});
