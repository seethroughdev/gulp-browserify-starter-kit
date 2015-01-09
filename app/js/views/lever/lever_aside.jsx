'use strict';

var React = window.React,
    _ = window._,
    colorScheme = require('../../util/colors-util'),
    View;

View = React.createClass({

  propTypes: {
    leverFilters: React.PropTypes.array.isRequired
  },

  render: function() {
    var self = this;

    return (
      <aside className="chart__aside">
        <div>
          <h3>Summary</h3>
          <div className="scroll-wrapper">
            <ul className="filter__tags">
              {
                _.map(this.props.leverFilters, function(filter, i) {
                  return (
                    <li className="is-active" key={i}>
                      <span
                        className="filter__span"
                        style={
                {
                  background: colorScheme[self.props.leverTitle][i],
                  border: '1px solid ' + colorScheme[self.props.leverTitle][i]
                }
                        }></span>
                      <div>{filter}</div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </aside>
    )
  }
});

module.exports = View;
