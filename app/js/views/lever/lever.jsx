'use strict';

var React            = require('react/addons'),
    Reflux           = require('reflux'),
    Router           = require('react-router'),
    MainHeader       = require('../main/header.jsx'),
    LeverStore       = require('../../stores/lever_store'),
    LeverFilterStore = require('../../stores/lever_filter_store'),
    LeverActions     = require('../../actions/actions'),
    LeverAside       = require('./lever_aside.jsx'),
    LeverChart       = require('./lever_chart.jsx'),
    LeverRow         = require('./lever_row.jsx'),
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
      leverRow: [],
      activeFilters: []
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

  handleFilterChange: function(filters) {
    this.setState({
      activeFilters: filters.activeFilters,
      inactiveFilters: filters.inactiveFilters
    });
  },

  // when page is loaded, call lever action
  componentWillMount: function() {
    this.listenTo(LeverStore, this.handleLoadItemsComplete);
    this.listenTo(LeverFilterStore, this.handleFilterChange);

    // start async load of lever data
    LeverActions.load(this.getParams().lever);
  },

  // when lever/subs change, update lever data
  componentWillReceiveProps: function(nextprops) {
    // console.log('componentWillMount');
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
            activeFilters={this.state.activeFilters}
          />
        </section>
        <LeverRow leverRow={this.state.leverRow} />
      </main>
    )
  }
});

module.exports = View;
