'use strict';

var React            = require('react/addons'),
    Reflux           = require('reflux'),
    Router           = require('react-router'),
    LeverHeader      = require('./lever_header.jsx'),
    LeverStore       = require('../../stores/lever_store'),
    LeverFilterStore = require('../../stores/lever_filter_store'),
    LeverActions     = require('../../actions/actions'),
    LeverAside       = require('./lever_aside.jsx'),
    LeverChart       = require('./lever_chart.jsx'),
    LeverRow         = require('./lever_row.jsx'),
    View;

View = React.createClass({

  mixins: [
    Reflux.listenTo(LeverStore, 'handleLoadItemsComplete'),
    Reflux.listenTo(LeverFilterStore, 'handleFilterChange'),
    Router.State
  ],

  getInitialState: function() {
    return {
      leverData: {},
      leverTitle: this.getParams().lever,
      leverSubs: [],
      leverSub: '',
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
      leverSub: this.getParams().sub,
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
    LeverActions.load(this.getParams().lever);
  },

  // when lever/subs change, update lever data
  componentWillReceiveProps: function(nextprops) {
    LeverActions.load(this.getParams().lever);
  },

  render: function() {
    return (
      <main className="main__content">
        <LeverHeader
          leverTitle={this.state.leverTitle}
          leverSubs={this.state.leverSubs}
          leverData={this.state.leverData}
        />
        <section className="chart">
          <LeverChart
            leverTitle={this.state.leverTitle}
            leverSub={this.state.leverSub}
            leverData={this.state.leverData}
          />
          <LeverAside
            leverTitle={this.state.leverTitle}
            leverFilters={this.state.leverFilters}
            activeFilters={this.state.activeFilters}
          />
        </section>
        <LeverRow leverRow={this.state.leverRow} />
      </main>
    )
  }
});

module.exports = View;
