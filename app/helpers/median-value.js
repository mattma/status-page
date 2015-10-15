import Ember from 'ember';

export function medianValue(params/*, hash*/) {
  let formattedVal;
  const valueArr = params[1].map(val => val[1]);
  const meanVal = d3.mean(valueArr);

  switch (params[0]) {
    case 'up':
      let v = meanVal === 1 ? "100.0" : parseFloat(meanVal * 100).toFixed(4);
      formattedVal = `${v}%`;
      break;
    case 'memory':
      formattedVal = `${meanVal}ms`;
      break;
    default:
      formattedVal = `${(meanVal * 100).toFixed(1)}%`;
  }

  return formattedVal;
}

export default Ember.Helper.helper(medianValue);
