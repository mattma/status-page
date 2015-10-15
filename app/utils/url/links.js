import Ember from 'ember';
import time from 'incident/utils/time/constant';

export default {
  getWeekLinks (date) {
    let today;
    const TODAY = time.getUnixNumberByDate(new Date());

    // Current week query. since it sends back as Date
    switch (Ember.typeOf(date)) {
      case 'date':
        today = time.getUnixNumberByDate(date);
        break;
      case 'string':
        today = parseInt(date);
        break;
      default:
        today = date;
    }

    const ago7days = today - 7;
    const ago8days = today - 8;
    const ago14days = today - 14;
    const tomorrow = today + 1;
    const next8days = today + 8;

    return {
      current: `since=${ago7days}&until=${today}`,
      previous: `since=${ago14days}&until=${ago8days}`,
      next: TODAY === today ? null : `since=${tomorrow}&until=${next8days}`
    };
  }
};
