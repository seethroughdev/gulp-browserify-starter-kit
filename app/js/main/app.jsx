'use strict';

var React         = require('react/addons'),
    Router        = require('react-router'),
    RouteHandler  = Router.RouteHandler,
    MainAside     = require('./views/aside.jsx'),
    App;

App = React.createClass({

  mixins: [
    Router.Navigation,
    Router.State
  ],

  render: function() {
    return (
      <div id="viewport">
        <MainAside params={this.props.params} query={this.props.query} />
        <RouteHandler params={this.props.params} query={this.props.query} />
      </div>
    );
  }
});

module.exports = App;
