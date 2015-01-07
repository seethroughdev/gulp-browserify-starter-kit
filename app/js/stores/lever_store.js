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
    return _lever[lever];
  },

  getLever: function() {
    return _.keys(_lever)[0];
  },

  getLeverSubs: function() {
    return _.keys(_lever[this.getLever()]);
  },

  /**
   * return default chart object to create chart
   * @param  {String} lever Current selected lever
   * @return {Object}       New prototype object of chart options
   */
  getChartData: function(lever) {
    return _.merge(Object.create(ChartProto), ChartOpts[lever]);
  },

  /**
   * Return array of filters from data object.
   * @param  {String} lever Current selected lever
   * @param  {String} sub   Current sub selected
   * @return {Array}       Array of current filters
   */
  getLeverFilters: function(lever, sub) {
    return _.chain(_lever[lever][sub])
            .map(function(s) {
              return s[0];
            })
            .filter(function(s) {
              return s !== 'x';
            })
            .value();
  }

});

module.exports = leverStore;
