'use strict';

var React      = require('react/addons'),
    _          = require('lodash'),
    Router     = require('react-router'),
    Route      = Router.Route,
    Link       = Router.Link,
    View;

View = React.createClass({
  propTypes: {
  },
  render: function() {

    return (
     <header className="main-header">
        <section className="main-header__tl">
        </section>
        <section className="main-header__tc">
          <h1>Main Header</h1>
        </section>
        <section className="main-header__tr">
        </section>
      </header>
    )
  }
});

module.exports = View;
