'use strict';


var Reflux  = require('reflux'),
    actions = require('./lever_actions'),
    _       = require('lodash'),
    store;


store = Reflux.createStore({

  listenables: actions,

  init: function() {
  },


  /**
   * Get new columns object containing, columns, inactive and active
   * @param  {Array} columns  A list of current columns
   * @param  {Array} inactive Current inactivce columns
   * @param  {String} current  Column to add/remove
   * @return {Object}          Complete list of columns
   */
  onSetColumns: function onSetColumns(columns, inactive, current) {
    // console.log(columns, inactive, current);
    var _inactiveColumns, columnsObj;

    // create empty array if no inactive elements are included
    inactive = inactive || [];

    // create inactive columns array based off of comparison function
    _inactiveColumns = this.getInactiveColumns(columns, inactive, current);

    // create new columns object
    columnsObj = {
      columns: columns,
      inactive: _inactiveColumns,
      active: this.getActiveColumns(columns, _inactiveColumns)
    };

    // Trigger change to all listeners.
    this.trigger(columnsObj);

    return columnsObj;
  },

  /**
   * Calculate active columns from comparing to inactive
   * @param  {Array} columns  List of total columns
   * @param  {Array} inactive Compiled list of current inactive columns
   * @return {Array}          List of columns not inactive.
   */
  getActiveColumns: function getActiveColumns(columns, inactive) {
    return _.difference(columns, inactive);
  },

  /**
   * Calculate current inactive columns.  We need to check if the inactive
   * column exists.  If it does, toggle it.  If they are all inactive, toggle
   * all to active.  Otherwise, add the column.
   *
   * @param  {Array} columns  Array of current columns
   * @param  {Array} inactive Array of current inactive columns before change
   * @param  {String} current Value of current column to change
   * @return {Array}          Updated list of inactive columns
   */
  getInactiveColumns: function getInactiveColumns(columns, inactive, current) {

    // make sure the value is an array
    if (_.isString(inactive)) {
      inactive = [].concat(inactive);
    }

    // if current is included, toggle the value
    if (_.isString(current)) {
      if (inactive.indexOf(current) > -1) {
        inactive = _.filter(inactive, function(val) {
          return val !== current;
        });
      } else {
        inactive.push(current);
      }
    }

    // if inactive === columns, then toggle all off
    if (inactive.length === columns.length) {
      inactive = [];
    }

    return inactive;
  }

});

module.exports = store;
