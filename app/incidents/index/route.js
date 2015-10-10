import Ember from 'ember';
import ajax from 'incident/utils/ajax/ajax';
import Time from 'incident/utils/time/constant';

export default Ember.Route.extend({
  model (params) {
    let today = Time.CURRENT_WEEK();
    console.log('today: ', today);
    const url = `/incidents/?${params.range}`;
    const opts =  {
      type: "GET",
    };

    return ajax(url, opts)
      .then(resp => resp.incidents)
      .catch(err => console.log('err: ', err));
  }
});
