'use strict';

var colorScheme = require('../colors-util'),
    numeral     = require('numeral'),
    tt          = require('../tt-util');


module.exports.summary = {
  description: 'This is the churn summary chart.  You should like it.',
  axis: {
    y: {
      label: {
        text: 'Customers'
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
        return tt.num(value, ratio, id);
      }
    }
  },
  color: {
    pattern: colorScheme.churn
  },
  data: {
    x: 'x',
    type: 'spline',
    axes: {
      growth: 'y2'
    },
    colors: {
      growth: colorScheme.y2
    }
  }
};

module.exports.revenue = {
  description: 'This is the churn revenue chart.  You should like it.',
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
  color: {
    pattern: colorScheme.churn
  },
  tooltip: {
    format: {
      value: function(value, ratio, id) {
        return tt.currency(value, ratio, id);
      }
    }
  },
  data: {
    x: 'x',
    types: {
      revenue: 'bar',
      growth: 'spline'
    },
    axes: {
      growth: 'y2'
    },
    colors: {
      growth: colorScheme.y2
    },
    order: 'desc'
  }
};

module.exports.monthly = {
  description: 'This is the churn monthly chart.  You should like it.',
  axis: {
    y: {
      label: {
        text: 'Customers'
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
  color: {
    pattern: colorScheme.churn
  },
  tooltip: {
    format: {
      value: function(value, ratio, id) {
        return tt.num(value, ratio, id);
      }
    }
  },
  data: {
    x: 'x',
    type: 'spline',
    axes: {
      growth: 'y2'
    },
    colors: {
      growth: colorScheme.y2
    },
    order: 'desc'
  }
};

module.exports.annual = {
  description: 'This is the churn annual chart.  You should like it.',
  axis: {
    y: {
      label: {
        text: 'Customers'
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
  color: {
    pattern: colorScheme.churn
  },
  tooltip: {
    format: {
      value: function(value, ratio, id) {
        return tt.num(value, ratio, id);
      }
    }
  },
  data: {
    x: 'x',
    type: 'spline',
    axes: {
      growth: 'y2'
    },
    colors: {
      growth: colorScheme.y2
    },
    order: 'desc'
  }
};
