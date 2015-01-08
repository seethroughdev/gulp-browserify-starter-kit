'use strict';

var React      = window.React,
    _          = window._,
    Reflux     = window.Reflux,
    c3         = window.c3,
    LeverStore = require('../../stores/lever_store'),
    View, chart;

View = React.createClass({

  mixins: [
    Reflux.listenTo(LeverStore, 'onStoreUpdate')
  ],

  getDefaultProps: function() {
    return {
      chartInfo: LeverStore.getChartInfo()
    };
  },

  propTypes: {
    leverTitle: React.PropTypes.string.isRequired,
    leverData: React.PropTypes.object.isRequired,
    leverSub: React.PropTypes.string.isRequired
  },

  onStoreUpdate: function(lever) {
    chart.unload();
    chart.load({
      columns: this.props.leverData[this.props.leverSub]
    });
  },

  componentDidMount: function() {
    chart = c3.generate(this.props.chartInfo);
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
