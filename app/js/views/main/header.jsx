'use strict';

var React       = window.React,
    _           = window._,
    DatePicker  = require('../lever/lever_datepicker.jsx'),
    View;

View = React.createClass({
  propTypes: {
    leverTitle: React.PropTypes.string,
    leverSubs: React.PropTypes.array
  },
  render: function() {
    return (
     <header className="main-header">
        <section className="main-header__tl">
        </section>
        <section className="main-header__tc">
          <h1>{this.props.leverTitle}</h1>
          <ul className="horizontal-list">
            {
              _.map(this.props.leverSubs, function(sub, i) {
                return (
                  <li key={i}>
                    <a href="#">{sub}</a>
                  </li>
                )
              })
            }
          </ul>
        </section>
        <section className="main-header__tr">
          <DatePicker />
        </section>
      </header>
    )
  }
});

module.exports = View;
