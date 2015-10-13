import Ember from 'ember';
import ajax from 'incident/utils/ajax/ajax';
import Time from 'incident/utils/time/constant';

export default Ember.Route.extend({
  model (params) {
    let currentRange, previousRange, nextRange;

    switch (params.range) {
      case 'current_week':
        let current = Time.CURRENT_WEEK();
        currentRange = `since=${current[0]}&until=${current[1]}`;
        break;
      case 'previous_week':
        let previous = Time.PREVIOUS_WEEK();
        console.log('previous: ', previous);
        currentRange = `since=${previous[0]}&until=${previous[1]}`;
        console.log('currentRange: ', currentRange);
        break;
      default:
        currentRange = 'since=16703&until=16718';
    }

    const url = `/incidents/?${currentRange}`;
    const opts =  {
      type: "GET",
    };

    return ajax(url, opts)
      .then(resp => {
        resp.pagination = {
          previous: 'previous',
          next: 'next'
        };
        return resp;
      })
      .catch(err => console.log('err: ', err));
  }
});
