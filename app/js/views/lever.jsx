'use strict';

var React = window.React,
    LeverAside = require('./lever_aside.jsx'),
    LeverChart = require('./lever_chart.jsx'),
    View;

View = React.createClass({
  render: function() {
    return (
      <section className="chart">
        <LeverChart />
        <LeverAside />
      </section>
    )
  }
});

module.exports = View;
