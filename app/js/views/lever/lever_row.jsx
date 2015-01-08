'use strict';

var React = window.React,
    LeverItem = require('./lever_row_item.jsx'),
    View;

View = React.createClass({
  render: function() {
    return (
      <section className="data-row">
        <LeverItem />
        <LeverItem />
        <LeverItem />
        <LeverItem />
        <LeverItem />
      </section>
    )
  }
});

module.exports = View;
