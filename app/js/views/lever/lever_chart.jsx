'use strict';

var React      = window.React,
    Reflux     = require('reflux'),
    c3         = window.c3,
    LeverStore = require('../../stores/lever_store'),
    View, chart;

View = React.createClass({

  mixins: [
    Reflux.listenTo(LeverStore, 'onStoreUpdate')
  ],

  propTypes: {
    leverTitle: React.PropTypes.string.isRequired
  },

  onStoreUpdate: function(lever) {
    var rand = _.times(3, _.partial(_.random, 1, 100));
    rand.unshift('data');
    chart.load({
      columns: [
        [
          'x',
          '2014-10-05',
          '2014-10-04',
          '2014-10-03'
        ],
        rand
      ]
    });
  },

  componentDidMount: function() {
    chart = c3.generate(LeverStore.getChartData());
  },

  render: function() {
    return (
      <div id="chartContainer"
           className="chart__content summary-chart"
           ref="chartContainer"
           />
    )
  }
});

module.exports = View;
