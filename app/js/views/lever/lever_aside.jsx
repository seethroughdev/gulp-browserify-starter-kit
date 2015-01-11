'use strict';

var React        = window.React,
    RP         = React.PropTypes,
    _            = window._,
    $            = window.$,
    LeverActions = require('../../actions/actions'),
    LeverFilter  = require('./lever_filter.jsx'),
    View;

View = React.createClass({

  propTypes: {
    leverFilters: RP.array.isRequired,
    leverTitle: RP.string.isRequired,
    activeFilters: RP.array.isRequired
  },

  resetFilters: function() {
    // this should look for params in the url first
    LeverActions.resetFilters(this.props.leverFilters);
  },

  isActive: function(filter) {
    if (this.props.activeFilters.indexOf(filter) !== -1) {
      return true;
    }
    return false;
  },

  render: function() {
    var _this = this;

    return (
      <aside className="chart__aside">
        <div>
          <h3 onClick={this.resetFilters}>Summary</h3>
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
                    active={_this.isActive(filter)}
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
