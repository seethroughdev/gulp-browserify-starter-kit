'use strict';

var Reflux = require('reflux'),
    actions = require('../actions/actions'),
    _       = window._,
    ChartProto = require('../chart-options/_default-chart-opts'),
    ChartOpts = require('../chart-options/revenue-chart-opts'),
    leverStore, _lever, _isLoaded;

_isLoaded = false;

leverStore = Reflux.createStore({

  listenables: actions,

  init: function() {
    _lever = {};
  },

  getInitialState: function() {
    return _lever;
  },

  onLoadCompleted: function(lever) {
    _lever = lever;
    _isLoaded = true;
    this.trigger(lever);
    console.log('load completed', lever);
    return lever;
  },

  isLoaded: function() {
    return _isLoaded;
  },

  getLeverData: function(lever) {
    return _lever;
  },

  getLever: function() {
    return _.keys(_lever)[0];
  },

  getLeverSubs: function() {
    return _.keys(_lever[this.getLever()]);
  },

  getChartData: function(lever) {
    return _.merge(Object.create(ChartProto), ChartOpts[lever]);
  }

});

module.exports = leverStore;
