'use strict';

var React            = require('react/addons'),
    Reflux           = require('reflux'),
    Router           = require('react-router'),
    RP               = React.PropTypes,
    _                = require('lodash'),
    LeverHeader      = require('../../main/views/header.jsx'),
    LeverStore       = require('../lever_store'),
    LeverFilterStore = require('../lever_columns_store'),
    LeverActions     = require('../lever_actions'),
    LeverAside       = require('./lever_aside.jsx'),
    LeverChart       = require('./lever_chart.jsx'),
    LeverDescription = require('./lever_description.jsx'),
    LeverRow         = require('./lever_row.jsx'),
    MainStore        = require('../../main/main_store'),
    View;

View = React.createClass({

  propTypes: {
    params: RP.object.isRequired,
    query: RP.object.isRequired
  },

  mixins: [
    Reflux.listenTo(LeverStore, 'onLoadLeverComplete'),
    Reflux.listenTo(MainStore, 'onLoadMainComplete'),
    Reflux.listenTo(LeverFilterStore, 'handleFilterChange'),
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
      columns: [],
      showDescription: false
    };
  },

  // Create complete lever object
  onLoadLeverComplete: function(lever) {
    this.setState({
      leverData: lever.data,
      leverRow: lever.row,
      leverSubs: lever.subs,
      leverColumns: lever.columns
    });
    this.setColumns();
  },

  onLoadMainComplete: function onLoadMainComplete(resp) {
    this.setState({
      showDescription: resp.lever.showDescription
    });
  },

  /**
   * Send off columns to be processed by columns_store
   * @param {string} sub Custom or current sub
   * @return {Action} Returns a call to setColumns action
   */
  setColumns: function(sub) {

    // if its a sub or lever change, reset hideColumns
    var cols = sub || _.isUndefined(this.props.query.hideColumns) ? [] : this.props.query.hideColumns;

    // allow to pass sub in if its in a transition instead of load

    sub = sub || this.props.params.sub;

    // call action to update columns
    return LeverActions.setColumns(this.state.leverColumns[sub], cols);
  },

  handleFilterChange: function(columns) {

    // long-winded way to add the inactive columns to the existing query props
    this.replaceWith('leverSub', {
      lever: this.props.params.lever,
      sub: this.props.params.sub
    }, _.extend(this.props.query, {hideColumns: columns.inactive}));

    // update all children with the new column states
    this.setState({
      columns: columns.columns,
      activeColumns: columns.active,
      inactiveColumns: columns.inactive
    });

  },

  // when page is loaded, call lever action
  componentWillMount: function() {
    LeverActions.load(this.props.params.lever);
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

      this.setColumns(nextprops.params.sub);
    }
  },

  render: function() {

    return (
      <main className="main__content">
        <LeverHeader
          params={this.props.params}
          query={this.props.query}
          title={this.props.params.lever}
          subMenu={this.state.leverSubs}
        />
        <section className="chart">
          <LeverChart
            leverData={this.state.leverData}
            params={this.props.params}
            query={this.props.query}
          />
          <LeverAside
            columns={this.state.columns}
            activeColumns={this.state.activeColumns}
            params={this.props.params}
            query={this.props.query}
          />
        </section>
        <LeverDescription
          params={this.props.params}
          config={this.props.config}
          />
        <LeverRow leverRow={this.state.leverRow} />
      </main>
    );
  }
});

module.exports = View;
