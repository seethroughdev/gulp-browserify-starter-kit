'use strict';

var React         = require('react/addons'),
    Router        = require('react-router'),
    Route         = Router.Route,
    DefaultRoute  = Router.DefaultRoute,
    NotFoundRoute = Router.NotFoundRoute,

    AppView       = require('./main/views/app.js'),
    HomeView      = require('./home/views/home.js'),
    LeverView     = require('./levers/views/lever.js'),
    AccountView   = require('./account/views/account.js'),
    routes;

routes = (
  <Route handler={ AppView }>
    <Route name="account" path='account/' handler={AccountView}>
      <Route name="accountSub" path=":sub/" handler={AccountView} />
      <NotFoundRoute handler={AccountView} />
      <DefaultRoute handler={AccountView} />
    </Route>
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
                                  document.getElementById('app')
  );
});
