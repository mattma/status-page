import Ember from 'ember';
import ajax from 'incident/utils/ajax/ajax';
import Time from 'incident/utils/time/constant';

export default Ember.Route.extend({
  model (params) {
    let range;

    switch (params.range) {
      case 'current_week':
        let current = Time.CURRENT_WEEK();
        range = `since=${current[0]}&until=${current[1]}`;
        break;
      default:
        range = 'since=16703&until=16718';
    }

    const url = `/incidents/?${range}`;
    const opts =  {
      type: "GET",
    };

    return ajax(url, opts)
      .then(resp => resp.incidents)
      .catch(err => console.log('err: ', err));
  }
});
