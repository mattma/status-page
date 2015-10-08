import Ember from 'ember';

export function ifEqual(params/*, hash*/) {
  let ret;
  // ifEqual helper need to have at least 3 arguments
  if (params.length < 2) {
    return false;
  }

  // if two values are equal, third argument would be truey
  // otherwise, if present fourth arugment would be falsey
  if (params[0] === params[1]) {
    ret = params[2];
  } else {
    if (params[3]) {
      ret = params[3];
    }
  }

  return ret;
}

export default Ember.Helper.helper(ifEqual);
