'use strict';

var React        = window.React,
    Reflux       = require('reflux'),
    Router        = window.ReactRouter,
    MainHeader    = require('../main/header.jsx'),
    LeverStore   = require('../../stores/lever_store'),
    LeverActions = require('../../actions/actions'),
    LeverAside   = require('./lever_aside.jsx'),
    LeverChart   = require('./lever_chart.jsx'),
    View;

View = React.createClass({

  mixins: [
    Reflux.ListenerMixin,
    Router.State
  ],

  getInitialState: function() {
    return {
      leverData: {},
      leverTitle: this.getParams().lever,
      leverSubs: []
    };
  },

  handleLoadItemsComplete: function(lever) {
    this.setState({
      leverData: LeverStore.getLeverData(this.getParams().lever),
      leverTitle: this.getParams().lever,
      leverSubs: LeverStore.getLeverSubs()
    });
  },

  // when page is loaded, call lever action
  componentWillMount: function() {
    this.listenTo(LeverStore, this.handleLoadItemsComplete);
    if (!LeverStore.isLoaded()) {
      LeverActions.load(this.getParams().lever);
    }
  },

  // when lever/subs change, update lever data
  componentWillReceiveProps: function(nextprops) {
    this.listenTo(LeverStore, this.handleLoadItemsComplete);
    LeverActions.load(this.getParams().lever);
  },

  render: function() {
    return (
      <div>
        <MainHeader
          leverTitle={this.state.leverTitle}
          leverSubs={this.state.leverSubs}
        />
        <section className="chart">
          <LeverChart leverTitle={this.state.leverTitle} />
          <LeverAside />
        </section>
      </div>
    )
  }
});

module.exports = View;
