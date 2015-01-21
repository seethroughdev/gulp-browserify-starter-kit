'use strict';

var React        = require('react/addons'),
    RP           = React.PropTypes,
    Reflux       = require('reflux'),
    MainStore    = require('../../main/main_store'),
    ChartOpts    = require('../../util/chart-options/_lever-chart-opts'),
    View;

View = React.createClass({

  mixins: [
    Reflux.listenTo(MainStore, 'onLoadMainComplete')
  ],

  propTypes: {
    params: RP.object.isRequired,
    config: RP.object.isRequired
  },

  getInitialState: function() {
    return {
      isActive: false
    };
  },

  onLoadMainComplete: function onLoadMainComplete(config) {
    this.setState({
      isActive: config.lever.showDescription
    });
  },

  componentWillReceiveProps: function() {
    var lever = this.props.params.lever,
        sub = this.props.params.sub;
    this.setState({
      message: ChartOpts[lever][sub].description
    });
  },

  handleClick: function() {
    this.setState({
      isActive: false
    });
  },

  render: function() {
    return (
      <section className="message__container">
        <p onClick={this.handleClick}>
          {this.state.isActive ? this.state.message : null}
        </p>
      </section>
    );
  }
});

module.exports = View;
