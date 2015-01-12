'use strict';

var React  = require('react/addons'),
    Reflux = require('reflux'),
    Home;

Home = React.createClass({
  render: function() {
    return (
      <main className="main__content">
        <h1>Homepage</h1>
      </main>
    )
  }
});

module.exports = Home;
