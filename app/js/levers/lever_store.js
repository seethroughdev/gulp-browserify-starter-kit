'use strict';

var Reflux         = require('reflux'),
    Immutable      = require('immutable'),
    IMap           = Immutable.Map,
    Seq            = Immutable.Seq,
    LeverActions   = require('./lever_actions'),
    LeverRowHelper = require('../util/lever-row-util'),
    leverStore, _leverData;


leverStore = Reflux.createStore({

  listenables: LeverActions,

  init: function() {
    _leverData = {};
  },

  /**
   * Fired when async lever data is loaded
   * @param  {Object} leverObj Raw lever data
   * @return {Object} All lever data
   */

  onLoadCompleted: function(resp) {
    var leverObj;

    _leverData = IMap(resp).first();

    leverObj = {
      subs: this.getLeverSubs(_leverData),
      row: this.getLeverRow(),
      data: _leverData,
      columns: this.getLeverColumns(_leverData)
    };

    this.trigger(leverObj);

    return IMap(leverObj);
  },


  /**
   * Get the subs of the given lever
   * @param  {Object} leverData Raw lever data.
   * @return {Array} Slugified array of each sub.
   */

  getLeverSubs: function(leverData) {
    return Seq(leverData).map(function(k, v) {
      return v;
    }).toArray();
  },


  /**
   * Get the lever row data which is static for all levers
   * @return {Array} Array of objects for each row item
   */

  getLeverRow: function() {
    return LeverRowHelper;
  },


  /**
   * Get columns from each array in the object.
   * @param  {Object} leverData Raw lever data.
   * @return {Object}           Object of subs and arrays of each column
   */
  getLeverColumns: function(obj) {
    return Seq(obj).map(function(k) {
      var o = {};
      return o[k] = Seq(k).map(function(n) {
        return n[0];
      }).filter(function(n) {
        return n !== 'x';
      }).toArray();
    }).toObject();
  },

  /**
   * Action to call filterDate
   * @param  {String} val Filter-type ie. 7c, 365c, 14l etc...
   * @return {Action}     Call filterDate action
   */
  onDatePicker: function onDatePicker(val) {
    LeverActions.filterDate(val, _leverData);
  }
});

module.exports = leverStore;
