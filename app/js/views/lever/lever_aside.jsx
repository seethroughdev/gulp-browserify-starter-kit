'use strict';

var React        = window.React,
    _            = window._,
    $            = window.$,
    LeverFilter  = require('./lever_filter.jsx'),
    View;

View = React.createClass({

  propTypes: {
    leverFilters: React.PropTypes.array.isRequired,
    leverTitle: React.PropTypes.string.isRequired,
    leverSub: React.PropTypes.string.isRequired,
    query: React.PropTypes.object.isRequired
  },

  resetFilters: function() {
    // this should look for params in the url first
    var $filters = $('.filter__filter');
    $filters.addClass('is-active');
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
