'use strict';

var Reflux = require('reflux'),
    reqwest = require('reqwest'),
    leverService = require('../services/levers_service'),
    Actions, getLever;

/**
 * access to get lever from service
 * @param  {Function} cb  [Call success action]
 * @param  {Function} err [Call failure action]
 * @return {Function}     [Returns service function]
 */
getLever = function getLever(cb, errCb) {
  return leverService.getLever(cb, errCb);
};

Actions = Reflux.createActions([
  'onStoreUpdate',
  'load',
  'loadCompleted',
  'loadFailed'
]);

Actions.load.listen(function() {
  getLever(Actions.loadCompleted, Actions.loadFailed);
});

module.exports = Actions;
