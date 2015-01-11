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
