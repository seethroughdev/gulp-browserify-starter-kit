'use strict';

var React         = require('react'),
    Router        = require('react-router'),

    AppView       = require('./main/views/app.js'),
    HomeView      = require('./home/views/home.js'),
    LeverView     = require('./levers/views/lever.js'),
    AccountView   = require('./account/views/account.js'),
    routes;

const {Route, DefaultRoute, NotFoundRoute} = Router;

routes = (
  <Route handler={AppView}>
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
    <Handler {...state} />, document.getElementById('app')
  );
});
