'use strict';

/**
 * This is the lever store.  All lever related data is managed through here.
 */


var Reflux         = require('reflux'),
    _              = require('lodash'),
    LeverActions   = require('./lever_actions'),
    ChartProto     = require('../util/chart-options/_default-chart-opts'),
    ChartOpts      = require('../util/chart-options/_lever-chart-opts'),
    Store, _containerId;


// set ID of chart container
_containerId = 'chartOuter';


Store = Reflux.createStore({

  listenables: LeverActions,

  init: function() {
  },

  /**
   * Called whenever chart is created, merges default chart options,
   * with sub chart options to create custom chart.
   * @param  {String} lever Current lever.
   * @param  {String} sub   Current sub.
   * @param  {Object} data  Data object from service.
   * @return {Object}       Returns chart init object with all settings.
   */
  onChartInit: function onChartInit(lever, sub, data) {

    // combine chart defaults with sub defaults.
    var _chartInit = _.merge({},
                    _.extend({}, ChartProto),
                    ChartOpts[lever][sub]);

    // if data is valid, add it at init time.
    if (_.isArray(data[sub])) {
      _chartInit.data.columns = data[sub];
      _chartInit.size = this.getChartSize(_containerId);
    }

    // if type is bar, for now we will stack them by default.
    if (_chartInit.data.type === 'bar') {
      _chartInit.data.groups = [this.getColumns(data[sub])];
    }

    this.trigger(_chartInit);

    return _chartInit;

  },

  /**
   * Easy function to get parent containers size dimensions.
   * @param  {String} id ID of chart container
   * @return {Object} Height and width of parent container in px
   */
  getChartSize: function(id) {
    var outerEl = document.getElementById(id);
    return {
        height: outerEl.offsetHeight  * 0.9,
        width: outerEl.offsetWidth * 0.9
      };
  },

  /**
   * Take data object and return [0] of each array
   * @param  {Object} data Full data object including all subs.
   * @return {Array}       List of all current columns.
   */
  getColumns: function getColumns(data) {
    return _.chain(data)
            .map(function(d) {
              return d[0];
            })
            .filter(function(d) {
              return d !== 'x';
            })
            .value();
  }

});

module.exports = Store;
