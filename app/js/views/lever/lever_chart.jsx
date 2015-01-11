'use strict';

var React      = window.React,
    Reflux     = window.Reflux,
    c3         = window.c3,
    _          = window._,
    RP         = React.PropTypes,
    LeverStore = require('../../stores/lever_store'),
    LeverFilterStore = require('../../stores/lever_filter_store'),
    View, chart;

View = React.createClass({

  mixins: [
    Reflux.listenTo(LeverStore, 'onLeverUpdate'),
    Reflux.listenTo(LeverFilterStore, 'onFilterUpdate')
  ],

  propTypes: {
    leverTitle: RP.string.isRequired,
    leverData: RP.object.isRequired,
    leverSub: RP.string.isRequired,
    leverFilters: RP.array.isRequired
  },

  componentDidMount: function() {

    /**
     * Generate initial chart instance.  We will replace the
     * data contents after the async load is finished below.
     */

    chart = c3.generate(LeverStore.getChartInfo(this.props.leverTitle, this.props.leverSub));

    /**
     * Add event listener to add/remove chart during resize
     */

    window.addEventListener('resize', this.handleResize);
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },


  /**
   * Resize chart based on container size
   * @param  {Object} chart Lever chart instance.
   */

  resizeChart: function(chart) {
    chart.resize({
      height: this.getDOMNode().offsetHeight,
      width: this.getDOMNode().offsetWidth
    });
  },

  /**
   * Handle on resize function in a performant way.
   * @param  {Object} chart Lever chart instance.
   * @return {Function}     Calls chart resize method.
   */

  handleResize: function(chart) {
    return _.debounce(function() {
      return this.resizeChart(chart);
    }, 450);
  },

  /**
   * Callback after chart data is reloaded
   */

  handleChartCallback: function() {

    /**
    * stack the appropriate groups
    * this will only apply to stackable charts
    * although at some point we might want to consider making
    * this a flag instead of applying to all
    * but because its based off a dynamic list, we can't
    * add them before...
    *
    * so will there be a time where we want to stack
    * some and not others?
    */

    chart.groups([this.props.leverFilters]);

    /**
     * resize the chart automatically, if necessary
     */
    this.handleResize(chart);
  },


  onLeverUpdate: function(lever) {
    var obj = LeverStore.getChartUpdate(this.props.leverTitle, this.props.leverSub),
        _this = this;

    /**
     * each time the store is updated, the chart data is updated
     * you will only see a change if the lever/subs change
     * but this also allows us to only instantiate one chart and
     * just change the contents
     */

    setTimeout(function() {
      return chart.load(obj, function(config) {
        _this.handleChartCallback();
      });
    }, 200);

    window.chart = chart;

  },

  /**
   * Call chart hide/show depending on filter state
   * @param  {Array} activeFilters   List of filters with .is-active class
   * @param  {Array} inactiveFilters List of filters without .is-active class
   */

  onFilterUpdate: function(obj) {
    chart.hide(obj.inactiveFilters);
    chart.show(obj.activeFilters);
  },

  render: function() {
    return (
      <div
          id="chartContainer"
          className="chart__content"
      />
    )
  }
});

module.exports = View;
