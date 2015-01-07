'use strict';

var colorScheme = require('../util/colors-util');

module.exports = {
  data: {
    x: 'x',
    columns: [
      [
        'x',
        '2014-10-05',
        '2014-10-04',
        '2014-10-03'
      ]
    ]
  },
  size: {
    height: 400
  },
  bindto: '#chartContainer',
  color: {
    pattern: colorScheme.main
  },
  padding: {
    top: 0,
    right: 20,
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
