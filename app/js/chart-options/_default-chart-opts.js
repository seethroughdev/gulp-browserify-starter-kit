'use strict';

/**
 * These are the default chart options.  They are
 * inherited into all chart objects, and used
 * to be instantiate the new Chart on load.
 */

var d3          = require('d3'),
    nocase      = require('to-no-case'),
    numeral     = require('numeral'),
    colorScheme = require('../util/colors-util'),
    tt          = require('../util/tt-util'),
    formatNumber;

formatNumber = function formatNumber(val) {
  var format = val === Math.floor(val) ? '(0a)' : '(0.0a)';
  return numeral(val).format(format);
};

module.exports = {
  data: {
    x: 'x',
    columns: [
      [
        'x',
        '2014-10-03'
      ]
    ],
    order: 'desc'
  },
  bindto: '#chartContainer',
  color: {
    pattern: colorScheme.main
  },
  padding: {
    top: 50,
    right: 100,
    left: 100,
    bottom: 50
  },
  grid: {
    y: {
      show: true
    }
  },
  tooltip: {
    format: {
      title: function(d) {
        var format = d3.time.format('%b %d, %Y');
        return format(d);
      },
      value: function(value, ratio, id) {
        return tt.num(value, ratio, id);
      },
      name: function(name, ratio, id, index) {
        return nocase(name);
      }
    }
  },
  axis: {
    y: {
      tick: {
        format: function(d) {
          return formatNumber(d);
        }
      },
      label: {
        position: 'outer-middle'
      }
    },
    y2: {
      show: false,
      label: {
        position: 'outer-middle'
      },
      min: -1,
      max: 1,
      tick: {
        format: function(d) {
          return d;
        }
      }
    },
    x: {
      type: 'timeseries',
      tick: {
        format: '%m/%d'
      }
    },
    zoom: {
      enabled: false
    }
  }
};
