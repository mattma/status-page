import Ember from 'ember';
import ajax from 'incident/utils/ajax/ajax';
import links from 'incident/utils/url/links';

export default Ember.Route.extend({
  model (params) {
    let range = params.range;
    let endDay;
    if (range === 'current') {
      endDay = new Date();
    } else {
      if (range.includes('&until=')) {
        endDay = range.split('=')[2];
      }
    }

    const weekLinks = links.getWeekLinks(endDay);
    const url = `/incidents/?${weekLinks.current}`;
    const opts =  {
      type: "GET",
    };

    return ajax(url, opts)
      .then(resp => {
        resp.pagination = {
          previous: weekLinks.previous,
          next: weekLinks.next
        };
        return resp;
      })
      .catch(err => {
        console.log('err: ', err);
        this.transitionTo('incidents.index', 'current');
      });
  }
});
