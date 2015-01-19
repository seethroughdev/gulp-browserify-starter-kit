'use strict';

var numeral     = require('numeral'),
    colorScheme = require('../colors-util'),
    tt          = require('../tt-util');



module.exports.summary = {
  axis: {
    y: {
      label: {
        text: 'Revenue (USD)'
      }
    },
    y2: {
      show: true,
      label: {
        text: 'Growth (%)'
      },
      tick: {
        format: function(d) {
          return numeral(d).format('(0%)');
        }
      }
    }
  },
  tooltip: {
    format: {
      value: function(value, ratio, id) {
        return tt.currency(value, ratio, id);
      }
    }
  },
  color: {
    pattern: colorScheme.revenue
  },
  data: {
    x: 'x',
    types: {
      current: 'spline',
      growth: 'spline'
    },
    axes: {
      growth: 'y2'
    },
    colors: {
      growth: colorScheme.y2
    }
  }
};

module.exports.plans = {
  axis: {
    y: {
      label: {
        text: 'Revenue (USD)'
      }
    }
  },
  tooltip: {
    format: {
      value: function(value, ratio, id) {
        return tt.currency(value, ratio, id);
      }
    }
  },
  color: {
    pattern: colorScheme.revenue
  },
  data: {
    x: 'x',
    type: 'bar',
    order: 'desc'
  }
};

module.exports.mix = {
  axis: {
    y: {
      label: {
        text: 'Revenue (USD)'
      }
    }
  },
  tooltip: {
    format: {
      value: function(value, ratio, id) {
        return tt.currency(value, ratio, id);
      }
    }
  },
  color: {
    pattern: colorScheme.revenue
  },
  data: {
    x: 'x',
    type: 'bar',
    order: 'desc'
  }
};

module.exports.location = {
  axis: {
    y: {
      label: {
        text: 'Revenue (USD)'
      }
    }
  },
  tooltip: {
    format: {
      value: function(value, ratio, id) {
        return tt.currency(value, ratio, id);
      }
    }
  },
  color: {
    pattern: colorScheme.revenue
  },
  data: {
    x: 'x',
    type: 'bar',
    order: null
  }
};
