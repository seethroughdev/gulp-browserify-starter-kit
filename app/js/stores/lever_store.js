'use strict';

var Reflux = require('reflux'),
    actions = require('../actions/actions'),
    _       = window._,
    leverStore,
    _lever;

leverStore = Reflux.createStore({

  listenables: actions,

  init: function() {
    _lever = {};
  },

  onLoadCompleted: function(lever) {
    this.updateLever(lever);
  },

  updateLever: function(lever) {
    _lever = lever;
    return this.trigger(lever);
  },

  getLeverData: function() {
    return _lever;
  },

  getLever: function() {
    return _.keys(_lever)[0];
  },

  getLeverSubs: function() {
    return _.keys(_lever[this.getLever()]);
  }

})

module.exports = leverStore;
