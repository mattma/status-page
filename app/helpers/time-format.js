import Ember from 'ember';
import time from 'incident/utils/time/constant';

/**
 * Format the value into Date or Time
 * @param 0: timestamp value.
 *     1. Unix Date in Number. Normally in 5 digit
 *     2. UnixNano Seconds. Generate in Go, Time.UnixNano()
 * @param 1: format rule. Pass to Moment library
 * @return Date/Time
 *
 * ex: {{timeFormat 1444267273965725200 'HH:mm:ss'}}
 */
export function timeFormat(params/*, hash*/) {
  if (Ember.isEmpty(params)) {
    return ;
  }

  return params[0] && params[0].toString().length < 6 ?
    time.getDateByUnixNumber((params[0]), params[1]) :
    time.getDateByNanoSeconds(params[0], params[1]);
}

export default Ember.Helper.helper(timeFormat);
