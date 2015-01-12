'use strict';

/**
 * This is the lever filters store.  It handles all
 * changes related to current filters
 */


var Reflux  = require('reflux'),
    actions = require('../actions/actions'),
    _       = require('lodash'),
    $       = require('domtastic'),
    store, _filters, _activeFilters;


store = Reflux.createStore({

  listenables: actions,

  init: function() {
  },

  getActiveFilters: function() {
    return _activeFilters;
  },

  getInactiveFilters: function() {
    return _.difference(_filters, _activeFilters);
  },

  addActiveFilter: function(filter) {
    _activeFilters.push(filter);
    return _activeFilters;
  },

  removeActiveFilter: function(filter) {
    _activeFilters = _.pull(_activeFilters, filter);

    if (_activeFilters.length === 0) {
      _activeFilters = this.getInactiveFilters();
    }

    return _activeFilters;
  },

  getFilterObject: function() {
    return {
      filters: _filters,
      activeFilters: _activeFilters,
      inactiveFilters: this.getInactiveFilters()
    };
  },

  onSetFilters: function(filters) {
    _filters = filters.slice(0);
    _activeFilters = filters.slice(0);

    this.trigger(this.getFilterObject());
  },

  onToggleFilters: function(filter) {
    if (_.contains(_activeFilters, filter)) {
      this.removeActiveFilter(filter);
    } else {
      this.addActiveFilter(filter);
    }

    this.trigger(this.getFilterObject());
  },

  onResetFilters: function() {
    _activeFilters = _filters.slice(0);
    this.trigger(this.getFilterObject());
  }

});

module.exports = store;
