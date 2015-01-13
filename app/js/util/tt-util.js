'use strict';

var numeral = require('numeral'),
    tt, _formatTT;

/**
 * Partial to check for growth before formatting
 * @param  {string} id     Name of data column
 * @param  {string} format Format representation
 * @return {Function}      Function as callback
 */

_formatTT = function _formatTT(id, format) {
  format = id === 'growth' ? '(0%)' : format;
  return function(value, ratio) {
    return numeral(value).format(format);
  };
};

tt = {
  currency: function currency(value, ratio, id) {
    return _formatTT(id, '$0,0.00')(value, ratio);
  },
  percent: function percent(value, ratio, id) {
    return _formatTT(id, '(0%)')(value, ratio);
  },
  num: function num(value, ratio, id) {
    var f = value === Math.floor(value) ? '(0a)' : '(0.0a)';
    return _formatTT(id, f)(value, ratio);
  }
};

module.exports = tt;
