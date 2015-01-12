'use strict';

/**
 * This is the lever store.  All lever related data is managed through here.
 */


var Reflux         = require('reflux'),
    _              = require('lodash'),
    actions        = require('../actions/actions'),
    LeverRowHelper = require('../util/lever-row-util'),
    ChartProto     = require('../chart-options/_default-chart-opts'),
    ChartOpts      = require('../chart-options/_lever-chart-opts'),
    leverStore, _lever, _leverData, _leverObj;


leverStore = Reflux.createStore({

  listenables: actions,

  init: function() {
    _leverData = {};
  },

  /**
   * Fired when async lever data is loaded
   * @param  {Object} leverObj Raw lever data
   * @return {Function} Emitter telling views data is ready.
   */

  onLoadCompleted: function(leverObj) {
    _leverObj = leverObj;
    _lever = this.getLever();
    _leverData = this.getLeverData();
    return this.trigger({
      data: _leverData,
      subs: this.getLeverSubs(),
      row: this.getLeverRow()
    });
  },

  /**
   * Return all the raw data from the current lever
   * @return {Array} Array of data objects of each sub belonging to lever.
   */

  getLeverData: function() {
    return _leverObj[_lever];
  },

  /**
   * Get the current lever title from the object
   * @return {String} Slugified version of the current lever.
   */

  getLever: function() {
    return _.keys(_leverObj)[0];
  },

  /**
   * Get the subs of the given lever
   * @return {Array} Slugified array of each sub.
   */

  getLeverSubs: function() {
    return _.chain(_leverObj[_lever])
              .keys()
              .value();
  },

  /**
   * Get the lever row data which is static for all levers
   * @return {Array} Array of objects for each row item
   */

  getLeverRow: function() {
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

  onLoadSub: function(lever, sub) {

  },

  getChartUpdate: function(lever, sub) {
    var o = {
      unload: true,
      columns: _leverData[sub]
    }, d;
    d = _.merge({}, o, ChartOpts[lever][sub].data);
    console.log(d);
    return d;
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
