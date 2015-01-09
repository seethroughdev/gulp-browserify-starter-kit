'use strict';

var React = window.React,
    View;

View = React.createClass({

  render: function() {
    return (
      <div className="date-picker filter__date">
        <div className="date-picker__wrapper">
          <div className="date-picker__current">
            Last 14 Days
          </div>
          <ul className="date-picker__dropdown">
            <li data-value="7c">This Week</li>
            <li data-value="30c">This Month</li>
            <li data-value="365c">This Year</li>
            <li className="ul__separator" />
            <li data-value="7l">Last 7 Days</li>
            <li data-value="14l">Last 14 Days</li>
            <li data-value="30l">Last 30 Days</li>
          </ul>
        </div>
      </div>
    )
  }
});

module.exports = View;
