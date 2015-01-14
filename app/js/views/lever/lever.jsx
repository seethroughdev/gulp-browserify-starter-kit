'use strict';

var React            = require('react/addons'),
    Reflux           = require('reflux'),
    Router           = require('react-router'),
    RP               = React.PropTypes,
    LeverHeader      = require('./lever_header.jsx'),
    LeverStore       = require('../../stores/lever_store'),
    LeverFilterStore = require('../../stores/lever_filter_store'),
    LeverActions     = require('../../actions/actions'),
    LeverAside       = require('./lever_aside.jsx'),
    LeverChart       = require('./lever_chart.jsx'),
    LeverRow         = require('./lever_row.jsx'),
    View;

View = React.createClass({

  propTypes: {
    params: RP.object.isRequired,
    query: RP.object.isRequired
  },

  mixins: [
    Reflux.listenTo(LeverStore, 'onLoadLeverComplete'),
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

  onLoadLeverComplete: function(lever) {
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
    var thisTitle = this.props.params.lever,
        nextTitle = nextprops.params.lever,
        thisSub   = this.props.params.sub,
        nextSub   = nextprops.params.sub;

    // Lever changed ->
    if (thisTitle !== nextTitle) {

      LeverActions.load(nextprops.params.lever);

    // If sub changed, but not lever ->
    } else if (thisTitle === nextTitle &&
                thisSub !== nextSub) {

      this.setState({
        leverSub: nextprops.params.sub,
        leverFilters: LeverStore.getLeverFilters(this.getParams().sub)
      });
    }
  },

  render: function() {
    return (
      <main className="main__content">
        <LeverHeader
          params={this.props.params}
          leverSubs={this.state.leverSubs}
        />
        <section className="chart">
          <LeverChart
            params={this.props.params}
            leverData={this.state.leverData}
          />
          <LeverAside
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
