'use strict';

var Reflux     = window.Reflux,
    _          = window._,
    actions    = require('../actions/actions'),
    ChartProto = require('../chart-options/_default-chart-opts'),
    ChartOpts  = require('../chart-options/revenue-chart-opts'),
    leverStore, _lever, _leverData, _leverObj, _isLoaded;

_isLoaded = false;

leverStore = Reflux.createStore({

  listenables: actions,

  init: function() {
    _leverData = {};
  },

  getInitialState: function() {
    return _leverData;
  },

  onLoadCompleted: function(leverObj) {
    // console.log('onLoadCompleted');
    _leverObj = leverObj;
    _lever = this.getLever();
    _leverData = this.getLeverData();
    return this.trigger(_leverObj);
  },

  getLeverData: function() {
    // console.log('getLeverData');
    return _leverObj[_lever];
  },

  getLever: function() {
    // console.log('getLever');
    return _.keys(_leverObj)[0];
  },

  getLeverSubs: function() {
    // console.log('getLeverSubs');
    return _.keys(_leverObj[_lever]);
  },

  /**
   * Return default chart object to create chart
   * @return {Object}       New prototype object of chart options
   */
  getChartData: function() {
    // console.log('getChartData');
    return _.merge(Object.create(ChartProto), ChartOpts[_lever]);
  },

  /**
   * Return array of filters from data object.
   * @param  {String} sub   Current sub selected
   * @return {Array}       Array of current filters
   */
  getLeverFilters: function(sub) {
    // console.log('getLeverFilters');
    return _.chain(_leverData[sub])
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
