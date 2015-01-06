'use strict';

var React = window.React,
    View;

View = React.createClass({
  render: function() {
    return (
      <div id="chartContainer" className="chart__content summary-chart">
        <p>Chart Container</p>
      </div>
    )
  }
});

module.exports = View;
