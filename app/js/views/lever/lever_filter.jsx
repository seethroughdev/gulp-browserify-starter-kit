'use strict';

var React            = require('react/addons'),
    RP               = React.PropTypes,
    Reflux           = require('reflux'),
    Router           = require('react-router'),
    _                = require('lodash'),
    $                = require('domtastic'),
    LeverFilterStore = require('../../stores/lever_filter_store'),
    LeverActions     = require('../../actions/actions'),
    colorScheme      = require('../../util/colors-util'),
    View;

View = React.createClass({

  propTypes: {
    filter: RP.string.isRequired,
    leverTitle: RP.string.isRequired,
    leverFilters: RP.array.isRequired,
    itemNumber: RP.number.isRequired,
    active: RP.bool.isRequired
  },

  mixins: [
    Reflux.listenTo(LeverFilterStore, 'onLeverUpdate')
  ],

  getInitialState: function() {
    return {
      isActive: this.props.active
    };
  },

  onLeverUpdate: function(obj) {
    this.setState({
      isActive: obj.activeFilters.indexOf(this.props.filter) !== -1 ? true : false
    });
  },

  handleClick: function(e) {
    e.preventDefault();

    // toggle active state
    this.setState({
      isActive: !this.state.isActive
    });

    LeverActions.toggleFilters(this.props.leverFilters);
  },

  addFilterSpanStyle: function() {
    return {
      background: colorScheme[this.props.leverTitle][this.props.itemNumber],
      border: '1px solid ' + colorScheme[this.props.leverTitle][this.props.itemNumber]
    };
  },

  render: function() {

    var cx = React.addons.classSet,
        classes = cx({
          'filter__filter': true,
          'is-active': this.state.isActive
        });

    return (
      <li className={classes} itemNumber={this.props.itemNumber} onClick={this.handleClick}>
        <span
          className="filter__span"
          style={this.addFilterSpanStyle()}></span>
        <div>{this.props.filter}</div>
      </li>
    )
  }
});

module.exports = View;
