'use strict';

var React      = require('react/addons'),
    RP         = React.PropTypes,
    _          = require('lodash'),
    Router     = require('react-router'),
    Link       = Router.Link,
    DatePicker = require('../../levers/views/lever_datepicker.jsx'),
    View;

View = React.createClass({

  propTypes: {
    params: RP.object.isRequired,
    query: RP.object.isRequired,
    subMenu: RP.array,
    title: RP.string
  },

  mixins: [
    Router.State
  ],

  getDefaultProps: function() {
    return {
      title: 'Heading'
    };
  },

  render: function() {

    var currentHandler = this.getRoutes(),
        currentHandlerLength = currentHandler.length,
        headerTopRight;

    currentHandler = currentHandler[currentHandlerLength - 1].name;

    if (this.props.params.lever) {
      headerTopRight =
        <DatePicker
          params={this.props.params}
          query={this.props.query} />;
    }

    return (
     <header className="main-header">
        <section className="main-header__tl">
        </section>
        <section className="main-header__tc">
          <h1>{this.props.title}</h1>
          <ul className="horizontal-list">
            {
              _.map(this.props.subMenu, function(sub, i) {
                return (
                  <li key={i}>
                    <Link
                      to={currentHandler}
                      activeClassName="is-active"
                      params={{
                        lever: this.props.params.lever,
                        sub: sub
                      }}
                      query={{
                        filter: this.props.query.filter
                      }}
                      >
                      {sub}
                    </Link>
                  </li>
                );
              }, this)
            }
          </ul>
        </section>
        <section className="main-header__tr">
          {headerTopRight}
        </section>
      </header>
    );
  }
});

module.exports = View;
