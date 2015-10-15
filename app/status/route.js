import Ember from 'ember';
import ajax from 'incident/utils/ajax/ajax';

export default Ember.Route.extend({
  model(params) {
    if (!params.range) {
      return ;
    }

    // const url = `/stats/up?${params.range}`;
    const url = `/stats/`;
    const opts =  {
      type: "GET",
    };

    return ajax(url, opts)
      .then(resp => {
        const stats = resp.stats;
        const urls = stats.map(item => `/stats/${item}?${params.range}`);
        return Ember.RSVP.Promise.all(urls.map(u => ajax(u, opts)))
      })
      .then(data => data)
      .catch(err => console.log('err: ', err));
  }
});
