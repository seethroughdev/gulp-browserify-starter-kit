var reqwest = require('reqwest'),
    LeverService;

LeverService = {
  getLever: function getLever(cb, errCb) {
    reqwest({
      url: '/data/example-revenue-min.json',
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
