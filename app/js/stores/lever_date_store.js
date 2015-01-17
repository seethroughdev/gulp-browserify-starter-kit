'use strict';

/**
 * This is the lever filters store.  It handles all
 * changes related to current filters
 */


var Reflux       = require('reflux'),
    LeverActions = require('../actions/actions'),
    _            = require('lodash'),
    moment       = require('moment'),
    constant     = require('../util/constant-util'),
    store, stringDateFormat, _originalData;


// set date format from constants
stringDateFormat = constant.DEFAULT_DATE_FORMAT;

store = Reflux.createStore({

  listenables: LeverActions,

  init: function() {
  },

  onFilterDate: function onFilterDate(filter, data) {
    var length, type, endDate, startDate, dateArr, endDateIndex, startDateIndex, filteredData;

    length = this.getFilterLength(filter);
    type = this.getFilterType(filter);



    // console.log('onFilterDate', length, type, data);

    dateArr = this.getDateArray(data);
    endDate = this.getEndDate(dateArr);
    startDate = this.getStartDate(length, type, endDate);

    endDateIndex = _.indexOf(dateArr, endDate);
    startDateIndex = _.indexOf(dateArr, startDate);

    if (startDateIndex === -1) {
      startDateIndex = dateArr.length;
    }

    // console.log(endDateIndex, startDateIndex, dateArr.length, data);
    filteredData = this.filterData(data, startDateIndex, endDateIndex);

    this.trigger(filteredData);
  },

  filterData: function filterData(data, start, end) {

    var _newData = _.merge({}, data);

    _.each(_newData, function(val, key, obj) {
      _.each(val, function(v, i, a) {
        _newData[key][i] = v.slice(end, start);
      });
    });

    return _newData;
  },

  getDateArray: function getDateArray(data) {
    var dateArr;
    dateArr = data[_.keys(data)[0]];
    dateArr = _.find(dateArr, function(arr) {
                return arr[0] === 'x';
              });
    dateArr = dateArr.slice(1);
    return dateArr;
  },

  // This crazy function will parse the first sub of the lever data,
  // grab the array that has 'x' as the first, and grab the first
  // date in the array.
  getEndDate: function getEndDate(dateArr) {
    var endDate, isValid;

    endDate = dateArr[0];

    try {
      isValid = moment(endDate, stringDateFormat, true).isValid();
      if (!isValid) {
        throw new Error('Date column does not appear to be valid.');
      }
    }
    catch (e) {
      console.log(e);
    }

    return endDate;
  },

  getStartDate: function getStartDate(length, type, endDate) {

    length = +length || 30;
    type = type || 'l';
    endDate = endDate || moment().format(stringDateFormat);

    endDate = moment(endDate, stringDateFormat);

    // wrapping in moment object a second time because
    // add/subtract method modifies current moment obj
    if (type === 'l') {
      return moment(endDate).subtract(length, 'days').format(stringDateFormat);
    } else {
      if (length === 7) {
        return moment(endDate).startOf('isoWeek').format(stringDateFormat);
      } else if (length === 30) {
        return moment(endDate).startOf('month').format(stringDateFormat);
      } else if (length === 365) {
        return moment(endDate).startOf('year').format(stringDateFormat);
      }
    }
  },

  /*==========  PARSE FILTER  ==========*/

  getFilterLength: function getFilterLength(type) {
    return type.replace(/\D+/gi, '');
  },

  getFilterType: function getFilterType(type) {
    return type.replace(/\d+/i, '');
  }

});

module.exports = store;
