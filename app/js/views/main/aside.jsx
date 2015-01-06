'use strict';

var React = window.React,
    View;

View = React.createClass({
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
    )
  }
});

module.exports = View;
