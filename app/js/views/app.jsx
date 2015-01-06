'use strict';

var Router        = window.ReactRouter,
    _             = window._,
    Reflux        = require('reflux'),
    RouteHandler  = Router.RouteHandler,

    LeverStore    = require('../stores/lever_store'),
    Actions       = require('../actions/actions'),

    MainAside     = require('./main/aside.jsx'),
    MainHeader    = require('./main/header.jsx'),

    App;

App = React.createClass({

  mixins: [
    Router.Navigation,
    Reflux.listenTo(LeverStore, 'onStoreUpdate')
  ],

  getInitialState: function() {
    return {
      leverData: {},
      leverTitle: '',
      leverSubs: []
    };
  },

  onStoreUpdate: function(lever) {
    this.setState({
      leverData: LeverStore.getLeverData(),
      leverTitle: LeverStore.getLever(),
      leverSubs: LeverStore.getLeverSubs()
    });
  },

  componentWillMount: function() {
    Actions.load();
  },

  render: function() {
    return (
      <div id="viewport">
        <MainAside />
        <main className="main__content">
          <MainHeader
            leverTitle={this.state.leverTitle}
            leverSubs={this.state.leverSubs}
            />
          <RouteHandler
            leverTitle={this.state.leverTitle}
            leverSubs={this.state.leverSubs}
            leverData={this.state.leverData}
          />
        </main>
      </div>
    )
  }
});

module.exports = App;
