'use strict';

var React        = window.React,
    Reflux       = window.Reflux,
    Router       = window.ReactRouter,
    MainHeader   = require('../main/header.jsx'),
    LeverStore   = require('../../stores/lever_store'),
    LeverActions = require('../../actions/actions'),
    LeverAside   = require('./lever_aside.jsx'),
    LeverChart   = require('./lever_chart.jsx'),
    LeverRow   = require('./lever_row.jsx'),
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
      leverFilters: [],
      leverRow: []
    };
  },

  handleLoadItemsComplete: function(lever) {
    this.setState({
      leverData: lever.data,
      leverRow: lever.row,
      leverTitle: this.getParams().lever,
      leverSubs: lever.subs,
      leverFilters: LeverStore.getLeverFilters(this.getParams().sub)
    });
  },

  // when page is loaded, call lever action
  componentWillMount: function() {
    this.listenTo(LeverStore, this.handleLoadItemsComplete);
    LeverActions.load(this.getParams().lever);
  },

  // when lever/subs change, update lever data
  componentWillReceiveProps: function(nextprops) {
    LeverActions.load(this.getParams().lever);
  },

  render: function() {
    return (
      <main className="main__content">
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
            leverTitle={this.state.leverTitle}
          />
        </section>
        <LeverRow leverRow={this.state.leverRow} />
      </main>
    )
  }
});

module.exports = View;
