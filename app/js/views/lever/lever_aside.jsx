'use strict';

var React        = window.React,
    _            = window._,
    LeverActions = require('../../actions/actions'),
    colorScheme  = require('../../util/colors-util'),
    $            = window.$,
    View;

View = React.createClass({

  propTypes: {
    leverFilters: React.PropTypes.array.isRequired
  },


  /**
   * Return text list of active filters
   * @param  {Array} filters Array of jquery objects of filter <li>
   * @return {Array}         List of strings matching active filters
   */

  getActiveFilters: function(filters) {
    return filters
              .filter(function(el) {
                return $(el).hasClass('is-active');
              })
              .map(function(el) {
                return el.innerText.trim();
              });
  },


  /**
   * Return array of filters that are not active
   * @param  {Array} activeFilters Array of strings of active filters
   * @return {Array}               List of not-active filters.
   */

  getInactiveFilters: function(activeFilters) {
    return _.difference(this.props.leverFilters, activeFilters);
  },


  handleClick: function(e) {
    e.preventDefault();
    var container     = e.target.parentNode,
        activeFilters = [],
        inactiveFilters = [],
        $filters = $('.filter__filter');

    // toggle styling class
    $(container).toggleClass('is-active');

    // get array of all active filters
    activeFilters = this.getActiveFilters($filters);

    // if the filter is not active, then collect is at inactive
    inactiveFilters = this.getInactiveFilters(activeFilters);

    // Reset if there are no active filters
    if (activeFilters.length === 0) {
      activeFilters = inactiveFilters;
      inactiveFilters = [];
      $filters.addClass('is-active');
    }

    // call action with active filters
    return LeverActions.toggleFilters(activeFilters, inactiveFilters);
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
