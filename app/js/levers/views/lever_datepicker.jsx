'use strict';

var React        = require('react/addons'),
    RP           = React.PropTypes,
    Router       = require('react-router'),
    $            = require('domtastic'),
    _            = require('lodash'),
    LeverActions = require('../lever_actions'),
    View;

View = React.createClass({

  propTypes: {
    params: RP.object.isRequired,
    query: RP.object.isRequired
  },

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

    this.transitionTo('leverSub', {
      lever: this.getParams().lever,
      sub: this.getParams().sub
    }, _.extend(this.props.query, {filter: elVal}));

    e.preventDefault();
  },

  handleMouseLeave: function(e) {
    this.deactivateSelector();
  },

  componentDidMount: function() {
    var $el;
    if (this.props.query.filter) {
      $el = $('.date-picker__dropdown')
        .find('[data-value="' + this.props.query.filter + '"]');
      this.activateSelector($el.text());
    }
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
            <li data-value="7l">Last 7 Days</li>
            <li data-value="14l">Last 14 Days</li>
            <li data-value="30l">Last 30 Days</li>
            <li className="ul__separator" />
            <li data-value="7c">This Week</li>
            <li data-value="30c">This Month</li>
            <li data-value="365c">This Year</li>
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = View;
