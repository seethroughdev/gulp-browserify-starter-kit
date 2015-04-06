'use strict';

var React         = require('react'),
    Router        = require('react-router'),
    RouteHandler  = Router.RouteHandler,
    Reflux        = require('reflux'),
    MainStore     = require('../main_store'),
    MainActions   = require('../main_actions'),
    MainAside     = require('./aside.js'),
    App;

require('../../../scss/main.scss');

App = React.createClass({

  mixins: [
    Reflux.listenTo(MainStore, 'onLoadComplete'),
    Router.Navigation
  ],

  getInitialState: function() {
    return {
      config: {}
    };
  },

  // Create complete lever object
  onLoadComplete: function(resp) {
    // console.log(resp);
    this.setState({
      config: resp
    });
  },

  // when page is loaded, call lever action
  componentWillMount: function() {
    MainActions.load();
  },

  render: function() {
    return (
      <div id="viewport">
        <MainAside
          params={this.props.params}
          query={this.props.query} />
        <RouteHandler
          config={this.state.config}
          params={this.props.params}
          query={this.props.query} />
      </div>
    );
  }
});

module.exports = App;
