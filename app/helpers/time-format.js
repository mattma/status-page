import Ember from 'ember';
import time from 'incident/utils/time/constant';

export function timeFormat(params/*, hash*/) {
  if (Ember.isEmpty(params)) {
    return ;
  }
  let date;

  if (params[2] || params[2] === 0) {
    date = time.getDateByUnixNumber((params[0] - params[2]), 'MMM DD, YYYY');
  } else {
    date = time.getDateByNanoseconds(params[0], 'HH:mm:ss');
  }

  return date;
}

export default Ember.Helper.helper(timeFormat);
