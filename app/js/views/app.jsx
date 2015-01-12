'use strict';

var React         = require('react/addons'),
    Router        = require('react-router'),
    _             = require('lodash'),
    RouteHandler  = Router.RouteHandler,
    MainAside     = require('./main/aside.jsx'),
    App;

App = React.createClass({

  mixins: [
    Router.Navigation,
    Router.State
  ],

  render: function() {
    return (
      <div id="viewport">
        <MainAside />
        <RouteHandler />
      </div>
    )
  }
});

module.exports = App;
