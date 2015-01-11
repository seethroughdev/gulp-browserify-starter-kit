'use strict';

/**
 * This is the lever filters store.  It handles all
 * changes related to current filters
 */


var Reflux     = window.Reflux,
    actions    = require('../actions/actions'),
    _            = window._,
    $            = window.$,
    store, _filters, _activeFilters, _inactiveFilters;



store = Reflux.createStore({

  listenables: actions,

  init: function() {
    this.listenTo(actions.toggleFilters, this.onToggleFilters);
  },

  setFilters: function(filters) {
    _filters = filters;
  },

  setActiveFilters: function(filters) {
    _activeFilters = filters;
  },

   /**
   * Return text list of active filters
   * @param  {Array} filters Array of jquery objects of filter <li>
   * @return {Array}         List of strings matching active filters
   */

  getActiveFilters: function() {
    return $('.filter__filter')
      .filter(function(el) {
        return $(el).hasClass('is-active');
      })
      .map(function(el) {
        return el.innerText.trim();
      });
  },

  /**
   * Return array of filters that are not active
   * @param  {Array} activeFilters Array of strings of active filters
   * @return {Array}               List of not-active filters.
   */

  getInactiveFilters: function(filters, activeFilters) {
    return _.difference(filters, activeFilters);
  },

  onToggleFilters: function(filters) {
    var obj;

    _filters = filters;
    _activeFilters = this.getActiveFilters();

    obj = {
      activeFilters: this.getActiveFilters(),
      inactiveFilters: this.getInactiveFilters(filters, this.activeFilters)
    };

    // make all active if none of them are
    if (obj.activeFilters.length === 0) {
      obj.activeFilters = obj.inactiveFilters;
      obj.inactiveFilters = [];
    }

    console.log(obj);

    this.trigger(obj);
  }

});

module.exports = store;
