'use strict';

/**
 * This is the lever store.  All lever related data is managed through here.
 */


var Reflux         = require('reflux'),
    _              = require('lodash'),
    LeverActions   = require('../actions/actions'),
    ChartProto     = require('../chart-options/_default-chart-opts'),
    ChartOpts      = require('../chart-options/_lever-chart-opts'),
    Store;


Store = Reflux.createStore({

  listenables: LeverActions,

  init: function() {
  }

});

module.exports = Store;
