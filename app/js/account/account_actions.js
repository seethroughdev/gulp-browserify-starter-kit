'use strict';

var Reflux         = require('reflux'),
    accountService = require('./account_service'),
    Actions, getAccount;


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
getAccount = function getAccount(cb, errCb) {
  return accountService.getAccount(cb, errCb);
};


/**
 * Listen to the load action to call success/fail async
 * @param  {String} lever [Current lever to get data for]
 * @return {Action}       [Call function to wrap cb]
 */
Actions.load.listen(function() {
  getAccount(Actions.loadCompleted, Actions.loadFailed);
});


module.exports = Actions;
