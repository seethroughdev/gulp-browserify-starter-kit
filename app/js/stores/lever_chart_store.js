'use strict';

/**
 * This is the lever store.  All lever related data is managed through here.
 */


var Reflux         = require('reflux'),
    _              = require('lodash'),
    LeverActions   = require('../actions/actions'),
    ChartProto     = require('../chart-options/_default-chart-opts'),
    ChartOpts      = require('../chart-options/_lever-chart-opts'),
    $              = require('domtastic'),
    Store, _chartInit, _leverData;


Store = Reflux.createStore({

  listenables: LeverActions,

  init: function() {
  },

  // called when lever/sub is changed
  onChartInit: function setChartInit(lever, sub, data) {

    // combine chart defaults with sub defaults.
    _chartInit = _.merge({},
                    _.extend({}, ChartProto),
                    ChartOpts[lever][sub]);

    // if data is valid, add it at init time.
    if (_.isArray(data[sub])) {
      _chartInit.data.columns = data[sub];
      _chartInit.size = {
        height: document.getElementById('chartOuter').offsetHeight  * 0.9,
        width: document.getElementById('chartOuter').offsetWidth * 0.9
      };
    }

    // if type is bar, for now we will stack them by default.
    if (_chartInit.data.type === 'bar') {
      _chartInit.data.groups = [this.getFilters(data[sub])];
    }

    this.trigger(_chartInit);

  },

  getFilters: function getFilters(data) {
    return _.chain(data)
            .map(function(d) {
              return d[0];
            })
            .filter(function(d) {
              return d !== 'x';
            })
            .value();
  },

  onSetLeverData: function onSetLeverData(data) {
    _leverData = data;
  }

});

module.exports = Store;