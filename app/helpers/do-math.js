import Ember from 'ember';

export function doMath(params/*, hash*/) {
  let result;

  switch (params[1]) {
    case '+':
      result = params[0] + params[2];
      break;
    case '-':
      result = params[0] - params[2];
      break;
    case '*':
      result = params[0] * params[2];
      break;
    case '/':
      result = params[0] / params[2];
      break;
  }

  return result;
}

export default Ember.Helper.helper(doMath);
