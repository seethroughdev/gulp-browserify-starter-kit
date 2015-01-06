'use strict';

var Router        = require('react-router'),
    RouteHandler  = Router.RouteHandler,
    Datepicker    = require('./lever_datepicker.jsx'),
    App;

App = React.createClass({
  render: function() {
    return (
      <div id="viewport">
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
            <li>
              <a href="#">Levers</a>
              <ul>
                <li>
                  <a href="#">Revenue</a>
                </li>
                <li>
                  <a href="#">Churn</a>
                </li>
                <li>
                  <a href="#">Customers</a>
                </li>
                <li>
                  <a href="#">ARPU</a>
                </li>
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
        <main className="main__content">
          <header className="main-header">
            <section className="main-header__tl">
            </section>
            <section className="main-header__tc">
              <h1>Revenue</h1>
              <ul className="horizontal-list">
                <li>
                  <a href="#">Something</a>
                </li>
                <li>
                  <a href="#">Something</a>
                </li>
                <li>
                  <a href="#">Something</a>
                </li>
              </ul>
            </section>
            <section className="main-header__tr">
              <Datepicker />
            </section>
          </header>
          <RouteHandler/>
        </main>
      </div>
    )
  }
});

module.exports = App;
