'use strict';

/**
 * This is the lever filters store.  It handles all
 * changes related to current filters
 */


var Reflux       = require('reflux'),
    LeverActions = require('./lever_actions'),
    _            = require('lodash'),
    moment       = require('moment'),
    constant     = require('../util/constant-util'),
    store, stringDateFormat;


// set date format from constants
stringDateFormat = constant.DEFAULT_DATE_FORMAT;

store = Reflux.createStore({

  listenables: LeverActions,

  init: function() {
  },

  /**
   * Getter for filtered data
   * @param  {String} filter Filter-type ie. 7c, 365c, 14l etc...
   * @param  {Object} data   Full immutable data
   * @return {Function}      Returns return value of filterData
   */
  getFilterData: function getFilterData(filter, data) {
    var dateArr, startDateIndex;

    dateArr        = this.getDateArray(data);
    startDateIndex = _.indexOf(dateArr, this.getStartDate(filter, dateArr));

    // if the data is less than the range, just show the whole data
    if (startDateIndex === -1) {
      startDateIndex = dateArr.length;
    }

    return this.filterData(data, startDateIndex);

  },

  /**
   * The main data filtering function
   * @param  {Object} data  Full immutable data
   * @param  {Number} start Index of first date
   * @return {Object}       Filtered data structure
   */
  filterData: function filterData(data, start) {
    var _newData = _.merge({}, data);

    start += 2; // adding 1 to compensate for 'x' value and today.

    _.each(_newData, function(val, key, obj) {
      _.each(val, function(v, i, a) {
        _newData[key][i] = v.slice(0, start);
      });
    });

    return _newData;
  },

  /**
   * Get actual dates from date object.
   * In order to do this, we grab the first key of the dataObj
   * Then we filter each array of data for [0] === 'x' to find the timeline.
   * Then we basically remove the first element of the array.
   * @param  {Object} data Full current data object
   * @return {Array}      A simple array of dates in the 'x column'.
   */
  getDateArray: function getDateArray(data) {
    var dateArr;
    dateArr = data[_.keys(data)[0]];
    dateArr = _.find(dateArr, function(arr) {
                return arr[0] === 'x';
              });
    dateArr = dateArr.slice(1);
    return dateArr;
  },

  /**
   * This is here in anticipation of custom end dates in the future.
   * Currently all data is filtered from 'today'.
   * @param  {Array} dateArr Simple array of dates in 'x' column.
   * @return {String}        Latest date of the array (which since its
   * a time-series, makes it the first item)
   */
  getEndDate: function getEndDate(dateArr) {
    return dateArr[0];
  },


  /**
   * Parse the data array to calculate starting date
   * @param  {String} filter  Filter-type ie. 7c, 365c, 14l etc...
   * @param  {Array} dateArr  Simple array of dates in 'x' column.
   * @return {String}         Returns date string of start.
   */
  getStartDate: function getStartDate(filter, dateArr) {
    var length, type, endDate;

    // parse filter string
    length  = parseInt(this.getFilterLength(filter), 10);
    type    = this.getFilterType(filter);


    // Get end date ** For now, we are only using the lastest day as end
    // date.  In the future this should be improved to be dynamic.
    endDate = moment(dateArr[0], stringDateFormat);

    if (type === 'l') {
      endDate =  moment(endDate).subtract(length - 1, 'days').format(stringDateFormat);
    } else {
      if (length === 7) {
        endDate =  moment(endDate).startOf('isoWeek').format(stringDateFormat);
      } else if (length === 30) {
        endDate =  moment(endDate).startOf('month').format(stringDateFormat);
      } else if (length === 365) {
        endDate =  moment(endDate).startOf('year').format(stringDateFormat);
      }
    }

    return endDate;
  },

  /*==========  PARSE FILTER  ==========*/

  getFilterLength: function getFilterLength(type) {
    return type.replace(/\D+/gi, '');
  },

  getFilterType: function getFilterType(type) {
    return type.replace(/\d+/i, '');
  },

  /**
   * The action method for filtering data.  It sends the data back
   * to anyone listening
   * @param  {String} filter type, ie. 7c, 30c, 14l
   * @param  {Object} data   Full data object, which we try to keep immutable.
   * @return {Action}        Triggers the filter data to all listeners.
   */
  onFilterDate: function onFilterDate(filter, data) {
    this.trigger(this.getFilterData(filter, data));
  }

});

module.exports = store;
