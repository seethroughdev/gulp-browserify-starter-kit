'use strict';

var React        = require('react/addons'),
    Router       = require('react-router'),
    $            = require('domtastic'),
    LeverActions = require('../../actions/actions'),
    View;

View = React.createClass({

  mixins: [
    Router.State,
    Router.Navigation
  ],

  getInitialState: function() {
    return {
      isActive: false,
      activeText: 'Last 30 Days'
    };
  },

  toggleSelector: function() {
    this.setState({
      isActive: !this.state.isActive
    });
  },

  deactivateSelector: function() {
    this.setState({
      isActive: false
    });
  },

  activateSelector: function(text, val) {
    this.setState({
      activeText: text
    });
    this.deactivateSelector();
  },

  handleClick: function(e) {
    e.preventDefault();
    this.toggleSelector();
  },

  handleSelect: function(e) {
    var $el    = $(e.target),
        elText = $el.text(),
        elVal  = $el.attr('data-value');

    this.activateSelector(elText, elVal);
    LeverActions.datePicker(elVal);

    this.transitionTo('leverSub', {lever: this.getParams().lever, sub: this.getParams().sub}, {show: Math.floor(Math.random() * 100)});

    e.preventDefault();
  },

  handleMouseLeave: function(e) {
    this.deactivateSelector();
  },

  render: function() {

    var cx = React.addons.classSet,
        classes = cx({
          'date-picker': true,
          'filter__date': true,
          'is-active': this.state.isActive
        });

    return (
      <div className={classes} onMouseLeave={this.handleMouseLeave}>
        <div className="date-picker__wrapper">
          <div className="date-picker__current"
            onClick={this.handleClick}>
            {this.state.activeText}
          </div>
          <ul className="date-picker__dropdown" onClick={this.handleSelect}>
            <li data-value="7c">This Week</li>
            <li data-value="30c">This Month</li>
            <li data-value="365c">This Year</li>
            <li className="ul__separator" />
            <li data-value="7l">Last 7 Days</li>
            <li data-value="14l">Last 14 Days</li>
            <li data-value="30l">Last 30 Days</li>
          </ul>
        </div>
      </div>
    )
  }
});

module.exports = View;
