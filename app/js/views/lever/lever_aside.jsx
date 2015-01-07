'use strict';

var React = window.React,
    _ = window._,
    View;

View = React.createClass({
  propTypes: {
    leverFilters: React.PropTypes.array.isRequired
  },

  render: function() {
    console.log('filter', this.props.leverFilters);
    return (
      <aside className="chart__aside">
        <div>
          <h3>Summary</h3>
          <div className="scroll-wrapper">
            <ul className="filter_-tags">
              {
                _.map(this.props.leverFilters, function(filter, i) {
                  return (
                    <li className="is-active" key={i}>{filter}</li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </aside>
    )
  }
});

module.exports = View;
