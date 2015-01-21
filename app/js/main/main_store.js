'use strict';

var Reflux         = require('reflux'),
    Immutable      = require('immutable'),
    IMap           = Immutable.Map,
    Seq            = Immutable.Seq,
    MainActions    = require('./main_actions'),
    mainStore, _configData;


mainStore = Reflux.createStore({

  listenables: MainActions,

  init: function() {
    _configData = {};
  },

  /**
   * Fired when async account data is loaded
   * @param  {Object} resp Raw account data
   * @return {Object} All account data
   */

  onLoadCompleted: function(resp) {
    this.trigger(resp);

    return IMap(resp);
  }
});

module.exports = mainStore;
