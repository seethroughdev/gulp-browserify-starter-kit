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
    Reflux.listenTo(LeverStore, 'onStoreUpdate'),
    Router.State
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
      leverData: LeverStore.getLeverData(this.getParams().lever),
      leverTitle: LeverStore.getLever(),
      leverSubs: LeverStore.getLeverSubs()
    });
  },

  componentWillMount: function() {
    LeverActions.load();
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
