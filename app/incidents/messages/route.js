import Ember from 'ember';
import ajax from 'incident/utils/ajax/ajax';
import links from 'incident/utils/url/links';
import time from 'incident/utils/time/constant';

export default Ember.Route.extend({
  model (params) {
    let range = params.range;
    let endDay;
    if (range === 'current') {
      endDay = time.nanoUnix(new Date());
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
        resp.incidents = resp.incidents.reverse();
        resp.endDate = endDay;
        return resp;
      })
      .catch(err => {
        console.log('err: ', err);
        this.transitionTo('incidents.messages', 'current');
      });
  }
});
