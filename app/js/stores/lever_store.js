'use strict';

var Reflux     = window.Reflux,
    _          = window._,
    actions    = require('../actions/actions'),
    LeverRowHelper = require('../util/lever-row-util'),
    ChartProto = require('../chart-options/_default-chart-opts'),
    ChartOpts  = require('../chart-options/_lever-chart-opts'),
    leverStore, _lever, _leverData, _leverObj, _leverRow;

leverStore = Reflux.createStore({

  listenables: actions,

  init: function() {
    _leverData = {};
  },

  getInitialState: function() {
    return _leverData;
  },

  onLoadCompleted: function(leverObj) {
    console.log(leverObj);
    _leverObj = leverObj;
    _lever = this.getLever();
    _leverData = this.getLeverData();
    _leverRow = this.getLeverRow();
    return this.trigger({
      data: _leverData,
      subs: this.getLeverSubs(),
      row: _leverRow
    });
  },

  getLeverData: function() {
    // console.log('getLeverData');
    return _leverObj[_lever];
  },

  getLever: function() {
    return _.keys(_leverObj)[0];
  },

  getLeverSubs: function() {
    return _.keys(_leverObj[_lever]);
  },

  getLeverRow: function() {
    _leverRow = LeverRowHelper;

    return LeverRowHelper;
  },

  /**
   * Return default chart object to create chart
   * @param  {String} lever Current Lever
   * @param  {String} sub   Current Sub
   * @return {Object}       New prototype obj of chart options
   */
  getChartInfo: function(lever, sub) {
    return _.merge({}, ChartOpts[lever][sub], ChartProto);
  },

  /**
   * Get Object of chart data and chart options merged
   * @param  {String} lever Current Lever
   * @param  {String} sub   Current Sub
   * @return {Object}       New prototype obj of chart opts/data
   */
  getChartUpdate: function(lever, sub) {
    var o = {
      columns: _leverData[sub],
      unload: true
    };
    return _.merge({}, o, ChartOpts[lever][sub].data);
  },

  /**
   * Return array of filters from data object.
   * @param  {String} sub   Current sub selected
   * @return {Array}       Array of current filters
   */
  getLeverFilters: function(sub) {
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
