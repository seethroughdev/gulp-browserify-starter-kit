'use strict';

var colorScheme = require('../util/colors-util');

module.exports.summary = {
  axis: {
    y: {
      tick: {
        format: function(d) {
          return d;
        }
      },
      label: {
        text: 'Revenue (USD)'
      }
    },
    y2: {
      show: true,
      label: {
        text: 'Growth %'
      }
    }
  },
  tooltip: {
    format: {
      // title: function (d) { return 'Data ' + d; },
      value: function(d) {
        return d;
      }
    }
  },
  color: {
    pattern: colorScheme.revenue
  },
  data: {
    x: 'x',
    types: {
      Current: 'spline',
      Growth: 'spline'
    },
    axes: {
      Growth: 'y2'
    },
    colors: {
      Growth: colorScheme.y2
    }
  }
};

module.exports.plans = {
    options: {
      axis: {
        y: {
          tick: {
            format: function(d) {
              return d;
            }
          },
          label: {
            text: 'Revenue (USD)'
          }
        }
      },
      tooltip: {
        format: {
          // title: function (d) { return 'Data ' + d; },
          value: function(d) {
            return d;
          }
        }
      },
      color: {
        pattern: colorScheme.revenue
      }
    },
    data: {
      x: 'x',
      type: 'bar',
      order: 'desc'
    }
  };

module.exports.mix = {
    options: {
      axis: {
        y: {
          tick: {
            format: function(d) {
              return d;
            }
          },
          label: {
            text: 'Revenue (USD)'
          }
        }
      },
      tooltip: {
        format: {
          // title: function (d) { return 'Data ' + d; },
          value: function(d) {
            return d;
          }
        }
      },
      color: {
        pattern: colorScheme.revenue
      }
    },
    data: {
      x: 'x',
      type: 'bar',
      order: 'desc'
    }
  };

module.exports.location = {
    options: {
      axis: {
        y: {
          tick: {
            format: function(d) {
              return d;
            }
          },
          label: {
            text: 'Revenue (USD)'
          }
        }
      },
      tooltip: {
        format: {
          // title: function (d) { return 'Data ' + d; },
          value: function(d) {
            return d;
          }
        }
      },
      color: {
        pattern: colorScheme.revenue
      }
    },
    data: {
      x: 'x',
      type: 'bar',
      order: null
    }
  };
