'use strict';

var Reflux         = require('reflux'),
    mainService = require('./main_service'),
    Actions, getConfig;


/*==========  ACTIONS  ==========*/

Actions = Reflux.createActions([
    'load',
    'loadCompleted',
    'loadFailed'
  ]);


/**
 * Access to get lever from service
 * @param  {String} lever  [lever to get]
 * @param  {Function} cb   [Call success action]
 * @param  {Function} errCb [Call failure action]
 * @return {Function}     [Returns service function]
 */
getConfig = function getConfig(cb, errCb) {
  return mainService.getConfig(cb, errCb);
};


/**
 * Listen to the load action to call success/fail async
 * @param  {String} lever [Current lever to get data for]
 * @return {Action}       [Call function to wrap cb]
 */
Actions.load.listen(function() {
  getConfig(Actions.loadCompleted, Actions.loadFailed);
});


module.exports = Actions;
