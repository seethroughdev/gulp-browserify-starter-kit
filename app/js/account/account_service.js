'use strict';


var reqwest = require('reqwest'),
    AccountService;


AccountService = {
  getAccount: function getAccount(cb, errCb) {
    console.log('calling account service');
    reqwest({
      url: '/data/example-account.json',
      type: 'json',
      success: function(resp) {
        cb(resp);
      },
      error: function(err) {
        console.log('ERROR: ' + err);
        errCb(err);
      }
    });
  }
};

module.exports = AccountService;
