'use strict';

var React            = require('react/addons'),
    Reflux           = require('reflux'),
    Router           = require('react-router'),
    c3               = require('c3'),
    _                = require('lodash'),
    RP               = React.PropTypes,
    LeverStore       = require('../../stores/lever_store'),
    LeverFilterStore = require('../../stores/lever_filter_store'),
    LeverChartStore  = require('../../stores/lever_chart_store'),
    LeverDateStore  = require('../../stores/lever_date_store'),
    LeverActions     = require('../../actions/actions'),
    View, chart;

View = React.createClass({

  mixins: [
    Reflux.listenTo(LeverStore, 'onLoadLeverComplete'),
    Reflux.listenTo(LeverFilterStore, 'onColumnUpdate'),
    Reflux.listenTo(LeverChartStore, 'onChartUpdate'),
    Reflux.listenTo(LeverDateStore, 'onDatePicker'),
    Router.State
  ],

  propTypes: {
    leverData: RP.object.isRequired,
    params: RP.object.isRequired
  },

  getInitialState: function() {
    return {
      chartInit: {}
    };
  },

  componentWillReceiveProps: function(nextprops) {
    var thisTitle = this.props.params.lever,
        nextTitle = nextprops.params.lever,
        thisSub   = this.props.params.sub,
        nextSub   = nextprops.params.sub,
        thisData  = this.props.leverData,
        nextData  = nextprops.leverData;

    // Lever or Sub changed ->
    if (thisTitle !== nextTitle ||
      thisSub !== nextSub) {
      this.handleChartInit(nextTitle, nextSub, nextprops.leverData);
    }
  },

  chartInit: function chartInit(title, sub, data) {
    LeverActions.chartInit(title, sub, data);
  },

  // Prevent chart from double loading with debounce after.
  lazyChartLoad: _.debounce(function(title, sub, data) {
    return this.chartInit(title, sub, data);
  }, 200, {
    leading: true,
    trailing: false
  }),

  handleChartInit: function(title, sub, data) {
    this.lazyChartLoad(title, sub, data);
  },


  // Any time the chart is updated, we will destroy it, then create a new one.
  // This would be more efficient to populate only the changes, but the current
  // api doesn't support very many attributes.  And react will solve a lot of
  // this problem for us.  So for now, we will destory and create on sub change.

  onChartUpdate: function(chartObj) {
    if (_.isObject(chart)) {
      chart.destroy();
    }

    chart = c3.generate(chartObj);
  },

  onDatePicker: function onDatePicker(data) {
    console.log(data);
  },

  // Load chart when lever is complete for the first time
  onLoadLeverComplete: function onLoadLeverComplete(obj) {
    this.chartInit(this.props.params.lever, this.props.params.sub, obj.data);
  },

  componentDidMount: function() {
    // Add event listener to add/remove chart during resize
    window.addEventListener('resize', this.handleResize);
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },


  // Resize chart based on container size
  resizeChart: function() {
    var outerEl = document.getElementById('chartOuter');

    if (_.isUndefined(chart)) {
      return;
    }

    chart.resize({
      height: outerEl.offsetHeight  * 0.9,
      width: outerEl.offsetWidth * 0.95
    });
  },

  /**
   * Handle on resize function in a performant way.
   * @return {Function}     Calls chart resize method.
   */

  lazyResize: _.debounce(function() {
    return this.resizeChart();
  }, 100),

  handleResize: function() {
    this.lazyResize();
  },

  /**
   * Call chart hide/show depending on filter state
   * @param  {Array} activeFilters   List of filters with .is-active class
   * @param  {Array} inactiveFilters List of filters without .is-active class
   */

  onColumnUpdate: function(obj) {
    if (!_.isUndefined(chart)) {
      chart.hide(obj.inactive);
      chart.show(obj.active);
    }
  },

  render: function() {
    return (
      <div className="chart__content" id="chartOuter">
        <div id="chartContainer" />
      </div>
    )
  }
});

module.exports = View;
