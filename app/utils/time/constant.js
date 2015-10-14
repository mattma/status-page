import moment from 'moment';

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
  return range.map(time => parseInt(time / 60 / 60 / 24));
}

export default {
  nanoUnix (date) {
    let nanoUnix = moment(date).unix()  / 60 / 60 / 24;
    return parseInt(nanoUnix);
  },

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
   */
  CURRENT_WEEK (timezone='America/Los_Angeles') {
    // current week range
    const start = moment().utcOffset(timezone).startOf('week').unix();
    const end = moment().utcOffset(timezone).unix();

    // previous week range
    const previous_start = moment().utcOffset(timezone).startOf('week').subtract(1, 'weeks').unix();
    const previous_end = moment().utcOffset(timezone).startOf('week').subtract(1, 'day').unix();

    return setRange([start, end, previous_start, previous_end]);
  }
};
