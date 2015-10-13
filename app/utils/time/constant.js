// Polyfill to handle `Date.now` is not a method
(function () {
  if (!Date.now) {
    Date.now = function now() {
      return new Date().getTime();
    };
  }
})();

function _today (date) {
  return date ? new Date(date) : new Date();
}

function setRange(range) {
  return range.map(time => parseInt(time / 1000 / 60 / 60 / 24));
}

export default {
  // return current time in millisecond
  NOW () {
    return _today();
  },

  // return 2 digit of current date
  TODAY () {
    let D = _today().getDate();
    D = D < 10 ? ('0'+D) : D;
    return D;
  },

  // return 2 digit of current month
  CURRENT_MONTH () {
    let M = _today().getMonth() +1;
    M = M < 10 ? ('0'+M) : M;
    return M;
  },

  // return 4 digit year format
  CURRENT_YEAR () {
    return _today().getFullYear();
  },

  /**
   * Those constants return range value
   * Unicode range with start and end date
   */

  /**
   * Find out the current week
   * @param {Number} start [description]
   */
  CURRENT_WEEK (start=0) {
    // Calcing the starting point
    let today_start_timestamp = new Date(_today().setHours(0, 0, 0, 0));
    let week_start_timestamp = today_start_timestamp.setDate(
      today_start_timestamp.getDate() - (today_start_timestamp.getDay() - start));
    let week_end_timestamp = _today().getTime();

    return setRange([week_start_timestamp, week_end_timestamp]);
  },

  PREVIOUS_WEEK () {
    console.log('hello');
    // let today_start_timestamp = new Date(_today().setHours(0, 0, 0, 0));
    // let week_start_timestamp = today_start_timestamp.setDate(
    //   today_start_timestamp.getDate() - (today_start_timestamp.getDay() - start));
    // let week_end_timestamp = _today().getTime();

    // return setRange([week_start_timestamp, week_end_timestamp]);
  },

  PASS_MONTH () {

  },

  PASS_YEAR () {

  },
};
