'use strict';


var reqwest = require('reqwest'),
    MainService;


MainService = {
  getConfig: function getConfig(cb, errCb) {
    console.log('calling config service');
    reqwest({
      url: '/data/example-config.json',
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

module.exports = MainService;
