'use strict';

var React = window.React,
    View;

View = React.createClass({

  propTypes: {
    leverTitle: React.PropTypes.string.isRequired
  },

  render: function() {
    return (
      <div id="chartContainer" className="chart__content summary-chart">
        <p>{this.props.leverTitle + ' Container'}</p>
      </div>
    )
  }
});

module.exports = View;
