import Ember from 'ember';
import ajax from 'incident/utils/ajax/ajax';
import Time from 'incident/utils/time/constant';

export default Ember.Route.extend({
  model (params) {
    console.log('params: ', params);
    let range;
    let previousRange;
    let nextRange;

    switch (params.range) {
      case 'current':
        const rangeArr = Time.CURRENT_WEEK();
        range = `since=${rangeArr[0]}&until=${rangeArr[1]}`;
        previousRange = `since=${rangeArr[2]}&until=${rangeArr[3]}`;
        break;
      default:
        range = params.range;
    }

    const url = `/incidents/?${range}`;
    const opts =  {
      type: "GET",
    };

    return ajax(url, opts)
      .then(resp => {
        resp.pagination = {
          previous: previousRange,
          next: null
        };
        return resp;
      })
      .catch(err => console.log('err: ', err));
  }
});
