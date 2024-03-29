import Ember from 'ember';
import ajax from 'incident/utils/ajax/ajax';

export default Ember.Route.extend({
  model(params) {
    if (!params.range) {
      return ;
    }

    const queryRange = params.range;
    const url = `/stats/`;
    const opts =  {
      type: "GET",
    };
    let range;

    switch (queryRange) {
      case 'pass_day':
        range = 'start=2015-10-13T20:10:30.781Z&end=2015-10-14T20:11:00.781Z&step=300s';
        break;
      case 'pass_week':
        range = 'start=2015-10-07T20:10:30.781Z&end=2015-10-14T20:11:00.781Z&step=300s';
        break;
      case 'pass_month':
        range = 'start=2015-09-15T20:10:30.781Z&end=2015-10-14T20:11:00.781Z&step=300s';
        break;
      default:
        range = 'start=2015-10-13T20:10:30.781Z&end=2015-10-14T20:11:00.781Z&step=300s';
        break;
    }

    return ajax(url, opts)
      .then(resp => {
        const stats = resp.stats;
        const urls = stats.map(item => `/stats/${item}?${range}`);
        return Ember.RSVP.Promise.all(urls.map(u => ajax(u, opts)))
          .then(data => {
            // merge the data stats name into the return Promise array
            let dataset = data.map((datum, index) => {
              datum.name = stats[index];
              return datum;
            });

            return {
              dataset: dataset,
              range: queryRange
            };
          });
      })
      .catch(err => console.log('err: ', err));
  },

  actions: {
    loading(/*transition, originRoute*/) {
      Ember.$('.loading-container').removeClass('hide');
      this.router.one('didTransition', () => Ember.$('.loading-container').addClass('hide'));
      return true;
    }
  }
});
