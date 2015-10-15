import moment from 'moment';

function _format (timestamp, format) {
  return moment(timestamp).format(format);
}

export default {
  format (timestamp, format) {
    return _format(timestamp, format);
  },

  /**
   * return unix number representation of the passing Date
   * @param  {[type]} date an Date
   * @return Number. an Unix Number representation of the date
   */
  getUnixNumberByDate (date) {
    let nanoUnix = moment(date).unix() / 60 / 60 / 24;
    return parseInt(nanoUnix);
  },

  /**
   * Get the date/time info by nanoseconds number
   * @param  {[type]} nanoSeconds ex: 1444785673961426306
   * @param  {[type]} formatter http://momentjs.com/docs/#/parsing/string-format/
   * @return {[type]} a perfect formatted Date/Time
   */
  getDateByNanoSeconds (nanoSeconds, formatter) {
    return _format((nanoSeconds / 1000 / 1000), formatter);
  },

  /**
   * Get the date/time info by unix number
   * @param  {[type]} unixNumber ex: 16709
   * @param  {[type]} formatter http://momentjs.com/docs/#/parsing/string-format/
   * @return {[type]} a perfect formatted Date/Time
   */
  getDateByUnixNumber (unixNumber, formatter) {
    return _format((unixNumber * 1000 * 24 * 60 * 60), formatter);
  }
};
