'use strict';

var React        = window.React,
    _            = window._,
    LeverActions = require('../../actions/actions'),
    colorScheme  = require('../../util/colors-util'),
    View;

View = React.createClass({

  propTypes: {
    leverFilters: React.PropTypes.array.isRequired
  },

  handleClick: function(e) {
    e.preventDefault();
    var container     = e.target.parentNode,
        activeFilters = [],
        inactiveFilters = [],
        filters;

    // toggle styling class
    container.classList.toggle('is-active');

    // get array of all active filters
    filters = window.document.querySelectorAll('.filter__filter');

    activeFilters = _.chain(filters)
                        .filter(function(filter) {
                          return filter.classList.contains('is-active');
                        })
                        .map(function(filter) {
                          return filter.innerText.trim();
                        })
                        .value();

    inactiveFilters = _.chain(filters)
                        .filter(function(filter) {
                          return !filter.classList.contains('is-active');
                        })
                        .map(function(filter) {
                          return filter.innerText.trim();
                        })
                        .value();

    // call action with active filters
    LeverActions.toggleFilters(activeFilters, inactiveFilters);
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
                  return (
                    <li className="is-active filter__filter" key={i} onClick={_this.handleClick}>
                      <span
                        className="filter__span"
                        style={
                {
                  background: colorScheme[_this.props.leverTitle][i],
                  border: '1px solid ' + colorScheme[_this.props.leverTitle][i]
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
