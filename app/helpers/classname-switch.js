import Ember from 'ember';

export function classnameSwitch(params/*, hash*/) {
  console.log('params: ', params);
  let ret;
  switch (params[0]) {
    case params[1]:
      ret = params[1];
      break;
    case params[2]:
      ret = params[2];
      break;
    case params[3]:
      ret = params[3];
      break;
    default:
      ret = "";
  }

  return ret;
}

export default Ember.Helper.helper(classnameSwitch);
