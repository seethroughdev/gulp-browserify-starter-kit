'use strict';

/**
 * This is the lever store.  All lever related data is managed through here.
 */


var Reflux         = require('reflux'),
    _              = require('lodash'),
    LeverActions   = require('../actions/actions'),
    ChartProto     = require('../chart-options/_default-chart-opts'),
    ChartOpts      = require('../chart-options/_lever-chart-opts'),
    Store, _chartInit, _leverData;


Store = Reflux.createStore({

  listenables: LeverActions,

  init: function() {
    // console.log('chart store init: ', _chartInit);
  },

  onChartInit: function setChartInit(lever, sub, data) {
    _chartInit = _.merge({},
                    _.extend({}, ChartProto),
                    ChartOpts[lever][sub]);
    _chartInit.data.columns = data[sub];
    this.trigger(_chartInit);
  },

  onSetLeverData: function onSetLeverData(data) {
    _leverData = data;
  }

});

module.exports = Store;
