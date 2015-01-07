'use strict';

var React      = window.React,
    Reflux     = require('reflux'),
    c3         = window.c3,
    LeverStore = require('../../stores/lever_store'),
    View;

View = React.createClass({

  mixins: [
    Reflux.listenTo(LeverStore, 'onStoreUpdate')
  ],

  propTypes: {
    leverTitle: React.PropTypes.string.isRequired
  },

  onStoreUpdate: function() {
  },

  componentDidMount: function() {
    console.log(LeverStore.getChartData());
    // var chart = c3.generate();
  },

  render: function() {
    return (
      <div id="chartContainer"
           className="chart__content summary-chart"
           ref="chartContainer"
           >
        <p>{this.props.leverTitle + ' Container'}</p>
      </div>
    )
  }
});

module.exports = View;
