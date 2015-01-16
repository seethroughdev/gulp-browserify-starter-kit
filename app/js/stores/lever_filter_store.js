'use strict';

/**
 * This is the lever filters store.  It handles all
 * changes related to current filters
 */


var Reflux  = require('reflux'),
    actions = require('../actions/actions'),
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

  /*==========  OLD STUFF  ==========*/

  // getActiveFilters: function() {
  //   return _activeFilters;
  // },

  // getInactiveFilters: function() {
  //   return _.difference(_filters, _activeFilters);
  // },

  // addActiveFilter: function(filter) {
  //   _activeFilters.push(filter);
  //   return _activeFilters;
  // },

  // removeActiveFilter: function(filter) {
  //   _activeFilters = _.pull(_activeFilters, filter);

  //   if (_activeFilters.length === 0) {
  //     _activeFilters = this.getInactiveFilters();
  //   }

  //   return _activeFilters;
  // },

  // getFilterObject: function() {
  //   return {
  //     filters: _filters,
  //     activeFilters: _activeFilters,
  //     inactiveFilters: this.getInactiveFilters()
  //   };
  // },

  // onSetFilters: function(filters) {
  //   _filters = filters.slice(0);
  //   _activeFilters = filters.slice(0);

  //   this.trigger(this.getFilterObject());
  // },

  // onToggleFilters: function(filter) {
  //   if (_.contains(_activeFilters, filter)) {
  //     this.removeActiveFilter(filter);
  //   } else {
  //     this.addActiveFilter(filter);
  //   }

  //   this.trigger(this.getFilterObject());
  // },

  // onResetFilters: function() {
  //   _activeFilters = _filters.slice(0);
  //   this.trigger(this.getFilterObject());
  // }

});

module.exports = store;
