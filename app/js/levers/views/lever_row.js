'use strict';

var React     = require('react/addons'),
    _         = require('lodash'),
    LeverItem = require('./lever_row_item.js'),
    View;

View = React.createClass({

  propTypes: {
    leverRow: React.PropTypes.array.isRequired
  },

  render: function() {
    return (
      <section className="data-row">
        {
          _.map(this.props.leverRow, function(item, i) {
            return (
              <LeverItem
                Title={item.title}
                Total={item.total}
                Today={item.today}
                key={i}
              />
            )
          })
        }
      </section>
    )
  }
});

module.exports = View;
