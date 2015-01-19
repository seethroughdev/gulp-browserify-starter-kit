'use strict';

var React      = require('react/addons'),
    RP         = React.PropTypes,
    _          = require('lodash'),
    Router     = require('react-router'),
    Link       = Router.Link,
    DatePicker = require('./lever_datepicker.jsx'),
    View;

View = React.createClass({
  propTypes: {
    params: RP.object.isRequired,
    query: RP.object.isRequired,
    leverSubs: RP.array.isRequired
  },
  render: function() {
    var leverTitle = this.props.params.lever;

    return (
     <header className="main-header">
        <section className="main-header__tl">
        </section>
        <section className="main-header__tc">
          <h1>{this.props.params.lever}</h1>
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
                      }}
                      query={{
                        filter: this.props.query.filter
                      }}
                      >
                      {sub}
                    </Link>
                  </li>
                )
              }, this)
            }
          </ul>
        </section>
        <section className="main-header__tr">
          <DatePicker
            params={this.props.params}
            query={this.props.query} />
        </section>
      </header>
    )
  }
});

module.exports = View;
