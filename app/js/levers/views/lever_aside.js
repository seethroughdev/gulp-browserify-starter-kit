'use strict';

var React        = require('react/addons'),
    RP           = React.PropTypes,
    _            = require('lodash'),
    LeverActions = require('../lever_actions'),
    LeverFilter  = require('./lever_filter.js'),
    View;

View = React.createClass({

  propTypes: {
    params: RP.object.isRequired,
    query: RP.object.isRequired,
    columns: RP.array.isRequired,
    activeColumns: RP.array.isRequired
  },

  resetFilters: function() {
    LeverActions.resetFilters();
  },

  isActive: function(column) {
    return _.contains(this.props.activeColumns, column);
  },

  render: function() {
    return (
      <aside className="chart__aside">
        <div>
          <h3 onClick={this.resetFilters}>Summary</h3>
          <div className="scroll-wrapper">
            <ul className="filter__tags">
              {
                _.map(this.props.columns, function(column, i) {
                  return <LeverFilter
                    columns={this.props.columns}
                    column={column}
                    isActive={this.isActive(column)}
                    itemNumber={i}
                    key={i}
                    params={this.props.params}
                    query={this.props.query}
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
