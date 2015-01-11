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
    this.listenTo(actions.resetFilters, this.resetFilters);
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

  /**
   * Reset all filters
   * @param  {Array} filters List of current filters.
   *
   * Note: this is currently dom dependent.  We should change this
   * as soon as possible.
   */
  resetFilters: function(filters) {
    $('.filter__filter').addClass('is-active');
    this.onToggleFilters(filters);
  },

  /**
   * Handle all filters
   * @param  {Array} filters List of current filters.
   * @return {Function}         Trigger change to filters.
   */
  onToggleFilters: function(filters) {
    var obj;

    _filters = filters;
    _activeFilters = this.getActiveFilters();

    obj = {
      activeFilters: this.getActiveFilters(),
      inactiveFilters: this.getInactiveFilters(filters, this.activeFilters)
    };

    // Don't allow all inactive.  Instead, toggle to all active.
    if (obj.activeFilters.length === 0) {
      obj.activeFilters = obj.inactiveFilters;
      obj.inactiveFilters = [];
    }

    return this.trigger(obj);
  }

});

module.exports = store;
