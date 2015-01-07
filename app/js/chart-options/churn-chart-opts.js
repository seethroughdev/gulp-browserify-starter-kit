'use strict';

var colorScheme = require('../util/colors-util');

module.exports.summary = {
  options: {
    axis: {
      y: {
        tick: {
          format: function(d) {
            return d;
          }
        },
        label: {
          text: 'Customers'
        }
      },
      y2: {
        show: true,
        label: {
          text: 'Growth %'
        }
      }
    },
    color: {
      pattern: colorScheme.churn
    }
  },
  data: {
    x: 'x',
    type: 'spline',
    axes: {
      Growth: 'y2'
    },
    colors: {
      Growth: colorScheme.y2
    }
  }
};

module.exports.revenue = {
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
        },
        y2: {
          show: true,
          label: {
            text: 'Growth %'
          }
        }
      },
      color: {
        pattern: colorScheme.churn
      },
      tooltip: {
        format: {
          // title: function (d) { return 'Data ' + d; },
          value: function(d) {
            return d;
          }
        }
      }
    },
    data: {
      x: 'x',
      types: {
        Revenue: 'bar',
        Growth: 'spline'
      },
      axes: {
        Growth: 'y2'
      },
      colors: {
        Growth: colorScheme.y2
      },
      order: 'desc'
    }
  };

module.exports.monthly =  {
    options: {
      axis: {
        y: {
          tick: {
            format: function(d) {
              return d;
            }
          },
          label: {
            text: 'Customers'
          }
        },
        y2: {
          show: true,
          label: {
            text: 'Growth %'
          }
        }
      },
      color: {
        pattern: colorScheme.churn
      },
      tooltip: {
        format: {
          // title: function (d) { return 'Data ' + d; },
          value: function(d) {
            return d;
          }
        }
      }
    },
    data: {
      x: 'x',
      type: 'spline',
      axes: {
        Growth: 'y2'
      },
      colors: {
        Growth: colorScheme.y2
      },
      order: 'desc'
    }
  };

module.exports.annual =  {
    options: {
      axis: {
        y: {
          tick: {
            format: function(d) {
              return d;
            }
          },
          label: {
            text: 'Customers'
          }
        },
        y2: {
          show: true,
          label: {
            text: 'Growth %'
          }
        }
      },
      color: {
        pattern: colorScheme.churn
      },
      tooltip: {
        format: {
          // title: function (d) { return 'Data ' + d; },
          value: function(d) {
            return d;
          }
        }
      }
    },
    data: {
      x: 'x',
      type: 'spline',
      axes: {
        Growth: 'y2'
      },
      colors: {
        Growth: colorScheme.y2
      },
      order: 'desc'
    }
  };
