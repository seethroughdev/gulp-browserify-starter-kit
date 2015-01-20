'use strict';

var React        = require('react/addons'),
    RP           = React.PropTypes,
    ChartOpts    = require('../../util/chart-options/_lever-chart-opts'),
    View;

View = React.createClass({

  propTypes: {
    params: RP.object.isRequired
  },

  getInitialState: function() {
    return {
      isActive: true
    };
  },

  componentWillReceiveProps: function() {
    var lever = this.props.params.lever,
        sub = this.props.params.sub;

    this.setState({
      message: ChartOpts[lever][sub].description
    });
  },

  render: function() {
    return (
      <section className="message__container">
        <p>{this.state.message}</p>
      </section>
    );
  }
});

module.exports = View;
