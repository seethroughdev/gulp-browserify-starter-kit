'use strict';

var reqwest = require('reqwest'),
    LeverService;

LeverService = {
  getLever: function getLever(lever, cb, errCb) {
    console.log('calling service');
    reqwest({
      url: '/data/example-' + lever + '-min.json',
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

module.exports = LeverService;
