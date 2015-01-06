'use strict';

var React         = window.React,
    Router        = window.ReactRouter,
    _             = window._,
    RouteHandler  = Router.RouteHandler,
    MainAside     = require('./main/aside.jsx'),
    App;

App = React.createClass({

  mixins: [
    Router.Navigation
  ],

  render: function() {
    return (
      <div id="viewport">
        <MainAside />
        <main className="main__content">
          <RouteHandler />
        </main>
      </div>
    )
  }
});

module.exports = App;
