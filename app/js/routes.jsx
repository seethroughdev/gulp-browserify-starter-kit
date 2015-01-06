'use strict';

var React         = window.React,
    Reflux        = require('reflux'),
    Router        = require('react-router'),
    Route         = Router.Route,
    DefaultRoute  = Router.DefaultRoute,
    NotFoundRoute = Router.NotFoundRoute,
    Link          = Router.Link,

    AppView       = require('./views/app.jsx'),
    HomeView      = require('./views/home.jsx'),
    LeverView     = require('./views/lever.jsx'),
    routes;

routes = (
  <Route handler={ AppView }>
    <Route name='lever' path='/lever' handler={ LeverView } ignoreScrollBehavior />
    <DefaultRoute name='homePage' handler={ HomeView } />
  </Route>
);

module.exports = Router.run(routes, function(Handler, state) {
  React.render(
    <Handler params={ state.params } />, document.getElementById('page')
  );
});
