'use strict';

var Reflux         = require('reflux'),
    _              = require('lodash'),
    Immutable      = require('immutable'),
    IMap           = Immutable.Map,
    Seq            = Immutable.Seq,
    AccountActions   = require('./account_actions'),
    accountStore, _accountData;


accountStore = Reflux.createStore({

  listenables: AccountActions,

  init: function() {
    _accountData = {};
  },

  /**
   * Fired when async account data is loaded
   * @param  {Object} resp Raw account data
   * @return {Object} All account data
   */

  onLoadCompleted: function(resp) {
    var accountObj;

    accountObj = {
      subMenu: _.map(resp, function(obj) {
        return obj.title;
      })
    };

    this.trigger(accountObj);

    return IMap(accountObj);
  }
});

module.exports = accountStore;
