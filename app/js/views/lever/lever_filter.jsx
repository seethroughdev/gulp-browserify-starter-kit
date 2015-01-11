'use strict';

var React        = window.React,
    Router       = window.ReactRouter,
    _            = window._,
    LeverFilterStore = require('../../stores/lever_filter_store'),
    LeverActions = require('../../actions/actions'),
    colorScheme  = require('../../util/colors-util'),
    $            = window.$,
    View;

View = React.createClass({

  propTypes: {
    filter: React.PropTypes.string.isRequired,
    leverTitle: React.PropTypes.string.isRequired,
    leverFilters: React.PropTypes.array.isRequired,
    itemNumber: React.PropTypes.number.isRequired,
    active: React.PropTypes.bool.isRequired
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
