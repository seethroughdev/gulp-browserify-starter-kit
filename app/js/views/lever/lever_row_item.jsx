'use strict';

var React = window.React,
    View;

View = React.createClass({
  render: function() {
    return (
      <div className="data-row__obj">
        <div className="data-row__obj__container">
          <div className="data-row__obj__total">
            12.6%
          </div>
        </div>
        <div className="data-row__row">
          <div className="data-row__obj__label">
            <span>Total Revenue</span>
            <div className="data-row__obj__today">
              $423
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = View;
