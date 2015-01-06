'use strict';

var React = window.React,
    View;

View = React.createClass({
  render: function() {
    return (
      <aside className="chart__aside">
        <div>
          <h3>Summary</h3>
          <div className="scroll-wrapper">
            <ul className="filter_-tags">
              <li className="is-active">Filter</li>
            </ul>
          </div>
        </div>
      </aside>
    )
  }
});

module.exports = View;
