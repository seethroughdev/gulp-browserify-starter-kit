'use strict';

/**
 * These are the default chart options.  They are
 * inherited into all chart objects, and used
 * to be instantiate the new Chart on load.
 */

var colorScheme = require('../util/colors-util');

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
  size: {
    height: 600
  },
  bindto: '#chartContainer',
  color: {
    pattern: colorScheme.main
  },
  padding: {
    top: 0,
    right: 120,
    left: 70,
    bottom: 10
  },
  grid: {
    y: {
      show: true
    }
  },
  axis: {
    y: {
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
