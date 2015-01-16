'use strict';

var React            = require('react/addons'),
    Reflux           = require('reflux'),
    Router           = require('react-router'),
    RP               = React.PropTypes,
    _                = require('lodash'),
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
    Router.State,
    Router.Navigation
  ],

  getInitialState: function() {
    return {
      leverTitle: this.props.params.lever,
      leverData: {},
      leverSubs: [],
      leverRow: [],
      leverColumns: [],
      activeColumns: [],
      columns: []
    };
  },

  onLoadLeverComplete: function(lever) {
    this.setState({
      leverData: lever.data,
      leverRow: lever.row,
      leverSubs: lever.subs,
      leverColumns: lever.columns
    });
    this.setColumns();
  },

  /**
   * Send off columns to be processed by columns_store
   * @param {string} sub Custom or current sub
   * @return {Action} Returns a call to setColumns action
   */
  setColumns: function(sub) {
    sub = sub || this.props.params.sub;
    return LeverActions.setColumns(this.state.leverColumns[sub], this.props.query.hideColumns);
  },

  handleFilterChange: function(columns) {
    console.log('filter changed');

    // we need to disable this for sub changes!  The sub query.hideColumns
    // should always reset to [] on title or sub changes!
    // -AL

    // this.transitionTo('leverSub', {
    //   lever: this.props.params.lever,
    //   sub: this.props.params.sub
    // }, _.extend(this.props.query, {hideColumns: columns.inactive}));

    this.setState({
      columns: columns.columns,
      activeColumns: columns.active,
      inactiveColumns: columns.inactive
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

      this.setColumns(nextprops.params.sub, true);
    }
  },

  render: function() {
    return (
      <main className="main__content">
        <LeverHeader
          params={this.props.params}
          query={this.props.query}
          leverSubs={this.state.leverSubs}
        />
        <section className="chart">
          <LeverChart
            params={this.props.params}
            leverData={this.state.leverData}
          />
          <LeverAside
            columns={this.state.columns}
            activeColumns={this.state.activeColumns}
            query={this.props.query}
          />
        </section>
        <LeverRow leverRow={this.state.leverRow} />
      </main>
    )
  }
});

module.exports = View;
