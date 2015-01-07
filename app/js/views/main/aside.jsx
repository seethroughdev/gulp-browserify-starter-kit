'use strict';

var React  = window.React,
    Router = window.ReactRouter,
    Route   = Router.Route,
    Link   = Router.Link,
    View, _levers;

_levers = ['Revenue', 'Churn', 'Customers', 'ARPU'];

View = React.createClass({

  getInitialState: function() {
    return {
      menuIsActive: false
    };
  },

  // add/remove/toggle state for active menus

  handleToggle: function(e) {
    this.setState({
      menuIsActive: !this.state.menuIsActive
    });
  },

  addIsActive: function() {
    this.setState({
      menuIsActive: true
    });
  },

  removeIsActive: function() {
    this.setState({
      menuIsActive: false
    });
  },

  render: function() {

    return (
      <aside className="main__aside">
        <ul className="main__aside__nav">
          <li className="favorite-btn-wrapper">
            <a className="icon-star" href="#" />
          </li>
        </ul>
        <ul className="main__aside__nav">
          <li>
            <a href="#">Dash</a>
          </li>
          <li
            className={this.state.menuIsActive ? 'is-active' : ''}
            onMouseEnter={this.addIsActive}
            onMouseLeave={this.removeIsActive}
            >
            <a href="#">Levers</a>
            <ul>
              {
                _levers.map(function(lever, i) {
                  return (
                    <li key={i}>
                      <Link
                        to="lever"
                        activeClassName="is-active"
                        params={{
                          lever: lever.toLowerCase(),
                          sub: 'summary'
                        }}>
                        {lever}
                      </Link>
                    </li>
                  )
                })
              }
            </ul>
          </li>
          <li>
            <a href="#">Share</a>
          </li>
          <li>
            <a href="#">Favorites</a>
          </li>
        </ul>
        <ul className="main__aside__nav">
          <li>
            <a href="#">Account</a>
          </li>
          <li>
            <a className="logo-btn logo" href="#">Tinge</a>
          </li>
        </ul>
      </aside>
    )
  }
});

module.exports = View;
