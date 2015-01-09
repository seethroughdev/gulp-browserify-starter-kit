'use strict';

var React = window.React,
    View;

View = React.createClass({

  propTypes: {
    Title: React.PropTypes.string,
    Total: React.PropTypes.string,
    Today: React.PropTypes.string
  },

  render: function() {
    return (
      <div className="data-row__obj">
        <div className="data-row__obj__container">
          <div className="data-row__obj__total">
            {this.props.Total}
          </div>
        </div>
        <div className="data-row__row">
          <div className="data-row__obj__label">
            <span>{this.props.Title}</span>
            <div className="data-row__obj__today">
              {this.props.Today}
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = View;
