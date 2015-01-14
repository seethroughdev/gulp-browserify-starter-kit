'use strict';

var colorScheme = require('../util/colors-util'),
    numeral     = require('numeral'),
    tt          = require('../util/tt-util');


module.exports.summary = {
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
