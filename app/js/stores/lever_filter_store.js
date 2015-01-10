'use strict';

/**
 * This is the lever filters store.  It handles all
 * changes related to current filters
 */


var Reflux     = window.Reflux,
    actions    = require('../actions/actions'),
    store;


store = Reflux.createStore({

  listenables: actions,

  init: function() {
    this.listenTo(actions.toggleFilters, this.onToggleFilters);
  },

  onToggleFilters: function(activeFilters, inactiveFilters) {
    this.trigger(activeFilters, inactiveFilters);
  }

});

module.exports = store;
