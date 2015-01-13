'use strict';

/**
 * This is the lever filters store.  It handles all
 * changes related to current filters
 */


var Reflux       = require('reflux'),
    LeverActions = require('../actions/actions'),
    // _            = require('lodash'),
    // $            = require('domtastic'),
    store;


store = Reflux.createStore({

  listenables: LeverActions,

  init: function() {
  },

  onDatePicker: function(data, range) {
    console.log('onDateFilter');
  }

});

module.exports = store;
