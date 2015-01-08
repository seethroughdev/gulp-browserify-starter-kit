'use strict';

var React        = window.React,
    Reflux       = window.Reflux,
    Router       = window.ReactRouter,
    MainHeader   = require('../main/header.jsx'),
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
      leverSubs: [],
      leverFilters: []
    };
  },

  handleLoadItemsComplete: function(lever) {
    // console.log('handleLoadItemsComplete');
    this.setState({
      leverData: lever.data,
      leverTitle: this.getParams().lever,
      leverSubs: lever.subs,
      leverFilters: LeverStore.getLeverFilters(this.getParams().sub)
    });
  },

  // when page is loaded, call lever action
  componentWillMount: function() {
    // console.log('componentWillMount');
    this.listenTo(LeverStore, this.handleLoadItemsComplete);
    LeverActions.load(this.getParams().lever);
  },

  // when lever/subs change, update lever data
  componentWillReceiveProps: function(nextprops) {
    // console.log('componentWillReceiveProps');
    // this.listenTo(LeverStore, this.handleLoadItemsComplete);
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
          <LeverChart
            leverTitle={this.state.leverTitle}
            leverData={this.state.leverData}
            leverSub={this.getParams().sub}
            leverFilters={this.state.leverFilters}
          />
          <LeverAside
            leverFilters={this.state.leverFilters}
          />
        </section>
      </div>
    )
  }
});

module.exports = View;
