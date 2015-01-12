'use strict';

var React        = require('react/addons'),
    RP           = React.PropTypes,
    _            = require('lodash'),
    $            = require('domtastic'),
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
    LeverActions.resetFilters();
  },

  isActive: function(filter) {
    return _.contains(this.props.activeFilters, filter);
  },

  render: function() {
    return (
      <aside className="chart__aside">
        <div>
          <h3 onClick={this.resetFilters}>Summary</h3>
          <div className="scroll-wrapper">
            <ul className="filter__tags">
              {
                _.map(this.props.leverFilters, function(filter, i) {
                  return <LeverFilter
                    filter={filter}
                    leverTitle={this.props.leverTitle}
                    isActive={this.isActive(filter)}
                    itemNumber={i}
                    key={i}
                   />
                }, this)
              }
            </ul>
          </div>
        </div>
      </aside>
    )
  }
});

module.exports = View;
