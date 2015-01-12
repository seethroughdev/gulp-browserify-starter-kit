'use strict';

/**
 * This is the lever store.  All lever related data is managed through here.
 */


var Reflux         = require('reflux'),
    _              = require('lodash'),
    LeverActions   = require('../actions/actions'),
    ChartProto     = require('../chart-options/_default-chart-opts'),
    ChartOpts      = require('../chart-options/_lever-chart-opts'),
    Store, _chartInit;


Store = Reflux.createStore({

  listenables: LeverActions,

  init: function() {
    _chartInit = Object.create(ChartProto);
    // console.log('chart store init: ', _chartInit);
  },

  onChartInit: function setChartInit(lever, sub) {
    var d = _.create(_chartInit);
    console.log('chartInit: ', d, _chartInit);
    return;
  }

});

module.exports = Store;
