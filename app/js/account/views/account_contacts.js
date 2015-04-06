'use strict';

var React            = require('react'),
    Reflux           = require('reflux'),
    Router           = require('react-router'),
    RP               = React.PropTypes,
    AccountActions   = require('../account_actions'),
    AccountStore     = require('../account_store'),
    View;

View = React.createClass({

  render: function() {
    return (
      <h1>Contacts</h1>
    );
  }
});

module.exports = View;
