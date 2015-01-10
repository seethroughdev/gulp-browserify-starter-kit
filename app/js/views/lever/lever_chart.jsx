'use strict';

var React      = window.React,
    Reflux     = window.Reflux,
    c3         = window.c3,
    _          = window._,
    LeverStore = require('../../stores/lever_store'),
    LeverFilterStore = require('../../stores/lever_filter_store'),
    View, chart;

View = React.createClass({

  mixins: [
    Reflux.listenTo(LeverStore, 'onLeverUpdate'),
    Reflux.listenTo(LeverFilterStore, 'onFilterUpdate')
  ],

  propTypes: {
    leverTitle: React.PropTypes.string.isRequired,
    leverData: React.PropTypes.object.isRequired,
    leverSub: React.PropTypes.string.isRequired
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

  resizeChart: function(chart) {
    chart.resize({
      height: this.getDOMNode().offsetHeight,
      width: this.getDOMNode().offsetWidth
    });
  },

  handleResize: function(chart) {
    return _.debounce(function() {
      return this.resizeChart(chart);
    }, 450);
  },

  onLeverUpdate: function(lever) {

    /**
     * each time the store is updated, the chart data is updated
     * you will only see a change if the lever/subs change
     * but this also allows us to only instantiate one chart and
     * just change the contents
     */

    chart.load(LeverStore.getChartUpdate(this.props.leverTitle, this.props.leverSub));

    /**
    * stack the appropriate groups
    * this will only apply to stackable charts
    * although at some point we might want to consider making
    * this a flag instead of applying to all
    * but because its based off a dynamic list, we can't
    * add them before...
    */

    chart.groups([this.props.leverFilters]);

    /**
     * resize the chart automatically, if necessary
     */
    this.handleResize(chart);

    window.chart = chart;

  },

  onFilterUpdate: function(activeFilters, inactiveFilters) {
    console.log(activeFilters, inactiveFilters);
    chart.hide(inactiveFilters);
    chart.show(activeFilters);
  },

  render: function() {
    return (
      <div id="chartContainer" className="chart__content" />
    )
  }
});

module.exports = View;
