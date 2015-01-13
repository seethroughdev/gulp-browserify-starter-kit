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
    Reflux.listenTo(LeverStore, 'onLeverUpdate'),
    Reflux.listenTo(LeverFilterStore, 'onFilterUpdate'),
    Reflux.listenTo(LeverChartStore, 'onChartUpdate'),
    Reflux.listenTo(LeverDateStore, 'onDatePicker'),
    Router.State
  ],

  propTypes: {
    leverTitle: RP.string.isRequired,
    leverSub: RP.string.isRequired,
    leverData: RP.object.isRequired
  },

  getInitialState: function() {
    return {
      chartInit: {}
    };
  },

  componentWillReceiveProps: function(nextprops) {
    var thisTitle = this.props.leverTitle,
        nextTitle = nextprops.leverTitle,
        thisSub   = this.props.leverSub,
        nextSub   = nextprops.leverSub;

    // Lever changed ->
    if (thisTitle !== nextTitle) {
      console.log('lever changed!', thisTitle, nextTitle);
      LeverActions.chartInit(nextTitle, nextprops.leverSub, nextprops.leverData);

    // Sub changed ->
    } else if (thisTitle === nextTitle &&
      thisSub !== nextSub) {
      console.log('sub changed!', thisSub, nextSub);
      LeverActions.chartInit(nextTitle, nextSub, nextprops.leverData);

    // Lever or Sub changed ->
    } else if (thisTitle !== nextTitle ||
      thisSub !== nextSub) {
      console.log('lever and sub changed!', nextprops.leverTitle, nextSub);
    }

  },

  /*==========  Create and update chart.  ==========*/

  onChartUpdate: function(chartObj) {
    if (_.isObject(chart)) {
      chart.destroy();
    }

    chart = c3.generate(chartObj);
  },

  onLeverUpdate: function onLeverUpdate(lever) {
    // console.log('onLeverUpdate', lever);
  },

  onDatePicker: function onDatePicker(data) {
    console.log(data);
  },

  componentDidMount: function() {
    // Add event listener to add/remove chart during resize
    window.addEventListener('resize', this.handleResize);
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },


  /**
   * Resize chart based on container size
   * @param  {Object} chart Lever chart instance.
   */

  resizeChart: function() {
    var outerEl = document.getElementById('chartOuter');
    chart.resize({
      height: outerEl.offsetHeight  * 0.9,
      width: outerEl.offsetWidth * 0.9
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

  // onLeverUpdate: function(lever) {
    // var obj = LeverStore.getChartUpdate(this.props.leverTitle, this.props.leverSub),
        // _this = this;

    // console.log('onLeverUpdate');

    /**
     * each time the store is updated, the chart data is updated
     * you will only see a change if the lever/subs change
     * but this also allows us to only instantiate one chart and
     * just change the contents
     */

    // setTimeout(function() {
    //   chart.load(obj);
    //   _this.handleChartCallback();
    // }, 200);


    // window.chart = chart;

  // },

  /**
   * Call chart hide/show depending on filter state
   * @param  {Array} activeFilters   List of filters with .is-active class
   * @param  {Array} inactiveFilters List of filters without .is-active class
   */

  onFilterUpdate: function(obj) {
    if (!_.isUndefined(chart)) {
      chart.hide(obj.inactiveFilters);
      chart.show(obj.activeFilters);
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
