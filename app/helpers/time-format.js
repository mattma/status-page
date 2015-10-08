import Ember from 'ember';
import format from 'incident/utils/time/format';

export function timeFormat(params/*, hash*/) {
  if (!params[0]) {
    return ;
  }
  const date = new Date(params[0] / 1000 / 1000);
  const formatString = params[1] || "#MMM# #DD#, #YYYY#";
  return format.custom(date, formatString);
}

export default Ember.Helper.helper(timeFormat);
