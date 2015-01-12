'use strict';

var React         = require('react/addons'),
    Router        = require('react-router'),
    Reflux        = require('reflux'),
    Route         = Router.Route,
    DefaultRoute  = Router.DefaultRoute,
    NotFoundRoute = Router.NotFoundRoute,
    Link          = Router.Link,

    AppView       = require('./views/app.jsx'),
    HomeView      = require('./views/home.jsx'),
    LeverView     = require('./views/lever/lever.jsx'),
    routes;

routes = (
  <Route handler={ AppView }>
    <Route name="lever" path=':lever/' handler={LeverView}>
      <Route name="leverSub" path=":sub/" handler={LeverView} />
      <NotFoundRoute handler={LeverView} />
      <DefaultRoute handler={LeverView} />
    </Route>
    <DefaultRoute name='homePage' handler={HomeView} />
    <NotFoundRoute handler={HomeView} />
  </Route>
);

module.exports = Router.run(routes, function(Handler, state) {
  React.render(
    <Handler params={state.params} query={state.query} />,
                                  document.getElementById('page')
  );
});
