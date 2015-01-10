'use strict';

var React        = window.React,
    _            = window._,
    LeverFilter  = require('./lever_filter.jsx'),
    View;

View = React.createClass({

  propTypes: {
    leverFilters: React.PropTypes.array.isRequired,
    leverTitle: React.PropTypes.string.isRequired,
    leverSub: React.PropTypes.string.isRequired,
    query: React.PropTypes.object.isRequired
  },

  render: function() {
    var _this = this;

    return (
      <aside className="chart__aside">
        <div>
          <h3>Summary</h3>
          <div className="scroll-wrapper">
            <ul className="filter__tags">
              {
                _.map(this.props.leverFilters, function(filter, i) {
                  return <LeverFilter
                    leverTitle={_this.props.leverTitle}
                    filter={filter}
                    leverFilters={_this.props.leverFilters}
                    key={i}
                    itemNumber={i}
                   />
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
