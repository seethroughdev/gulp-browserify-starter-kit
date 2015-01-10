'use strict';

var React         = window.React,
    Router        = window.ReactRouter,
    _             = window._,
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
        <RouteHandler query={this.props.query} />
      </div>
    )
  }
});

module.exports = App;
