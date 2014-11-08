/**
 * @jsx React.DOM
 */

 /*jshint ignore:start */

// Bootstrapping the App.

var APP = require('./components/app.js');
var React = require('react');


React.renderComponent(
  <APP />,
  document.getElementById('main')
);

/*jshint ignore:end */
