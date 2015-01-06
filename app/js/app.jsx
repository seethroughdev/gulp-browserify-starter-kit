'use strict';

var React         = window.React,
    Reflux        = require('reflux'),
    Router        = require('react-router'),
    RouteHandler  = Router.RouteHandler,
    Route         = Router.Route,
    DefaultRoute  = Router.DefaultRoute,
    NotFoundRoute = Router.NotFoundRoute,
    Link          = Router.Link,

    HomeView      = require('./views/home.jsx'),
    routes;

routes = (
  <Route handler={ HomeView }>
    <Route name='home' path='/' handler={ HomeView } ignoreScrollBehavior />
    <DefaultRoute name='homePage' handler={ HomeView } />
  </Route>
);

module.exports = Router.run(routes, function(Handler, state) {
  React.render(
    <Handler params={ state.params } />, document.getElementById('main')
  );
});
