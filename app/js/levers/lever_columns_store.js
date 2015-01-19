'use strict';

/**
 * This is the lever filters store.  It handles all
 * changes related to current filters
 */


var Reflux  = require('reflux'),
    actions = require('./lever_actions'),
    _       = require('lodash'),
    store;


store = Reflux.createStore({

  listenables: actions,

  init: function() {
  },

  onSetColumns: function onSetColumns(columns, inactive, current) {
    inactive = inactive || [];

    // make sure the value is an array
    if (!_.isArray(inactive)) {
      inactive = [inactive];
    }

    // if current is included, toggle the value
    if (_.isString(current)) {
      if (inactive.indexOf(current) > -1) {
        inactive = _.filter(inactive, function(val) {
          return val !== current;
        });
      } else {
        inactive.push(current);
        if (inactive.length === columns.length) {
          inactive = [];
        }
      }
    }

    var columnsObj = {
      columns: columns,
      active: this.getActiveColumns(columns, inactive),
      inactive: this.getInactiveColumns(columns, inactive)
    };

    this.trigger(columnsObj);

    return columnsObj;
  },

  getActiveColumns: function getActiveColumns(columns, inactive) {
    return _.difference(columns, inactive);
  },

  getInactiveColumns: function getInactiveColumns(columns, inactive) {
    if (inactive.length === columns.length) {
      inactive = [];
    }
    return inactive;
  }

});

module.exports = store;
