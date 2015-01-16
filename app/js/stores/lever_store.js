'use strict';

var Reflux         = require('reflux'),
    _              = require('lodash'),
    LeverActions   = require('../actions/actions'),
    LeverRowHelper = require('../util/lever-row-util'),
    leverStore, _lever, _leverData, _leverObj, _leverColumns;


leverStore = Reflux.createStore({

  listenables: LeverActions,

  init: function() {
    _leverData = {};
  },

  /**
   * Fired when async lever data is loaded
   * @param  {Object} leverObj Raw lever data
   * @return {Function} Emitter telling views data is ready.
   */

  onLoadCompleted: function(leverObj) {
    console.log('onLoadCompleted');
    _leverObj = leverObj;
    _lever = this.getLever();
    _leverData = this.getLeverData();
    _leverColumns = this.getLeverColumns(leverObj[_lever]);
    return this.trigger({
      subs: this.getLeverSubs(),
      row: this.getLeverRow(),
      data: this.getLeverData(),
      columns: _leverColumns
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

  getLeverColumns: function(obj) {
    var cols = {},
        key;
    for (key in obj) {
      cols[key] = _.chain(obj[key])
        .map(function(s) {
          return s[0];
        })
        .filter(function(s) {
          return s !== 'x';
        })
        .value();
    }
    return cols;
  },

  getColumns: function(leverData) {
    return _.chain(leverData)
            .map(function(s) {
              return s[0];
            })
            .filter(function(s) {
              return s !== 'x';
            })
            .value();
  },


  /**
   * Return array of filters from data object.
   * @param  {String} sub   Current sub selected
   * @return {Array}       Array of current filters
   */

  getLeverFilters: function(sub) {
    var leverFilters = [];

    leverFilters = _.chain(_leverData[sub])
            .map(function(s) {
              return s[0];
            })
            .filter(function(s) {
              return s !== 'x';
            })
            .value();

    LeverActions.setFilters(leverFilters);

    return leverFilters;
  }
});

module.exports = leverStore;
