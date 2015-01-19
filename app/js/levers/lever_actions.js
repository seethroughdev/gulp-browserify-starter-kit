'use strict';

var Reflux       = require('reflux'),
    leverService = require('./lever_service'),
    Actions, getLever;


/*==========  ACTIONS  ==========*/

Actions = Reflux.createActions([
    'load',
    'loadCompleted',
    'loadFailed',
    'loadSub',
    'setColumns',
    'chartInit',
    'setLeverData',
    'datePicker',
    'filterDate'
  ]);


/**
 * Access to get lever from service
 * @param  {String} lever  [lever to get]
 * @param  {Function} cb   [Call success action]
 * @param  {Function} errCb [Call failure action]
 * @return {Function}     [Returns service function]
 */
getLever = function getLever(lever, cb, errCb) {
  lever = lever || 'revenue';
  return leverService.getLever(lever, cb, errCb);
};


/**
 * Listen to the load action to call success/fail async
 * @param  {String} lever [Current lever to get data for]
 * @return {Action}       [Call function to wrap cb]
 */
Actions.load.listen(function(lever) {
  getLever(lever, Actions.loadCompleted, Actions.loadFailed);
});


module.exports = Actions;
