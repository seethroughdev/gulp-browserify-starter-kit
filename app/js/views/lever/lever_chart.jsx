'use strict';

var React      = window.React,
    Reflux     = window.Reflux,
    c3         = window.c3,
    LeverStore = require('../../stores/lever_store'),
    View, chart;

View = React.createClass({

  mixins: [
    Reflux.listenTo(LeverStore, 'onStoreUpdate')
  ],

  propTypes: {
    leverTitle: React.PropTypes.string.isRequired,
    leverData: React.PropTypes.object.isRequired,
    leverSub: React.PropTypes.string.isRequired
  },

  onStoreUpdate: function(lever) {
    chart.load(LeverStore.getChartUpdate(this.props.leverSub));
  },

  componentDidMount: function() {
    chart = c3.generate(LeverStore.getChartInfo(this.props.leverSub));
  },

  render: function() {
    return (
      <div id="chartContainer"
           className="chart__content summary-chart"
           ref="chartContainer"
       />
    )
  }
});

module.exports = View;
