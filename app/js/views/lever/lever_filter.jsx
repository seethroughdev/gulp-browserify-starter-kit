'use strict';

var React        = window.React,
    Router       = window.ReactRouter,
    _            = window._,
    LeverStore = require('../../stores/lever_store'),
    LeverActions = require('../../actions/actions'),
    colorScheme  = require('../../util/colors-util'),
    $            = window.$,
    View;

View = React.createClass({

  propTypes: {
    filter: React.PropTypes.string.isRequired,
    leverTitle: React.PropTypes.string.isRequired,
    leverFilters: React.PropTypes.array.isRequired,
    itemNumber: React.PropTypes.number.isRequired
  },

  mixins: [
    Router.State,
    Router.Navigation,
    Reflux.listenTo(LeverStore, 'onLeverUpdate')
  ],

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

    // console.log(this.getQuery());
    // this.replaceWith('leverSub', {lever: this.props.leverTitle, sub: this.props.leverSub}, {show: activeFilters});
    // console.log(this.props.query);

    // call action with active filters
    return LeverActions.toggleFilters(activeFilters, inactiveFilters);
  },

  resetFilters: function() {
    // this should look for params in the url first
    var $filters = $('.filter__filter');
    $filters.addClass('is-active');
  },

  onLeverUpdate: function(lever) {
    this.resetFilters();
  },

  addFilterSpanStyle: function() {
    return {
      background: colorScheme[this.props.leverTitle][this.props.itemNumber],
      border: '1px solid ' + colorScheme[this.props.leverTitle][this.props.itemNumber]
    };
  },

  render: function() {
    return (
      <li className="is-active filter__filter" itemNumber={this.props.itemNumber} onClick={this.handleClick}>
        <span
          className="filter__span"
          style={this.addFilterSpanStyle()}></span>
        <div>{this.props.filter}</div>
      </li>
    )
  }
});

module.exports = View;
