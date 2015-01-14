'use strict';

/**
 * This is the lever filters store.  It handles all
 * changes related to current filters
 */


var Reflux       = require('reflux'),
    LeverActions = require('../actions/actions'),
    _            = require('lodash'),
    store, _storedData;


store = Reflux.createStore({

  listenables: LeverActions,

  init: function() {
  },

  onSetLeverData: function(data) {
    _storedData = _.extend({}, data);
  },

  onDatePicker: function(data, range) {
    console.log('onDateFilter');
  }

});

module.exports = store;
