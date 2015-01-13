'use strict';

var React      = require('react/addons'),
    _          = require('lodash'),
    Router     = require('react-router'),
    Route      = Router.Route,
    Link       = Router.Link,
    DatePicker = require('../lever/lever_datepicker.jsx'),
    View;

View = React.createClass({
  propTypes: {
    leverTitle: React.PropTypes.string,
    leverSubs: React.PropTypes.array
  },
  render: function() {
    var leverTitle = this.props.leverTitle;

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
                    <Link
                      to="leverSub"
                      activeClassName="is-active"
                      params={{
                        lever: leverTitle,
                        sub: sub
                      }}>
                      {sub}
                    </Link>
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
