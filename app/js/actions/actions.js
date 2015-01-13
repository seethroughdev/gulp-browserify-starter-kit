'use strict';

var Reflux       = require('reflux'),
    leverService = require('../services/levers_service'),
    Actions, getLever;

/**
 * access to get lever from service
 * @param  {String} lever  [lever to get]
 * @param  {Function} cb   [Call success action]
 * @param  {Function} errCb [Call failure action]
 * @return {Function}     [Returns service function]
 */
getLever = function getLever(lever, cb, errCb) {
  lever = lever || 'revenue';
  return leverService.getLever(lever, cb, errCb);
};

Actions = Reflux.createActions([
    'load',
    'loadCompleted',
    'loadFailed',
    'loadSub',
    'setFilters',
    'toggleFilters',
    'resetFilters',
    'chartInit',
    'setLeverData',
    'datePicker'
  ]);

Actions.load.listen(function(lever) {
  getLever(lever, Actions.loadCompleted, Actions.loadFailed);
});

// Actions.toggleFilters.listen(function(filters) {
//   console.log('ffffilters', filters);
// });

module.exports = Actions;
