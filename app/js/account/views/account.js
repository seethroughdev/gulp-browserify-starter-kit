'use strict';

var React            = require('react'),
    Reflux           = require('reflux'),
    Router           = require('react-router'),
    RP               = React.PropTypes,
    AccountActions   = require('../account_actions'),
    AccountStore     = require('../account_store'),
    Header           = require('../../main/views/header.js'),
    SettingsView     = require('./account_settings.js'),
    IntegrationsView = require('./account_integrations.js'),
    ContactsView     = require('./account_contacts.js'),
    BillingView      = require('./account_billing.js'),
    View;

View = React.createClass({

  propTypes: {
    params: RP.object.isRequired,
    query: RP.object.isRequired
  },

  mixins: [
    Reflux.listenTo(AccountStore, 'onLoadComplete'),
    Router.Navigation
  ],

  getInitialState: function() {
    return {
      subMenu: [],
      desc: ''
    };
  },

  // Create complete lever object
  onLoadComplete: function(account) {
    this.setState({
      subMenu: account.subMenu,
      desc: account.desc
    });
  },

  // when page is loaded, call lever action
  componentWillMount: function() {
    AccountActions.load();
  },

  render: function() {

    var accountSection;

    switch (this.props.params.sub) {
      case 'settings':
        accountSection = <SettingsView />;
        break;
      case 'integrations':
        accountSection = <IntegrationsView />;
        break;
      case 'contacts':
        accountSection = <ContactsView />;
        break;
      case 'billing':
        accountSection = <BillingView />;
        break;
      default:
        accountSection = <SettingsView />;
        break;
    }

    return (
      <main className="main__content">
        <Header
          handler={this.props.handler}
          params={this.props.params}
          query={this.props.query}
          title='Accounteroni'
          subMenu={this.state.subMenu}
        />
        <section>
          <h1>This is the account page</h1>
          {accountSection}
        </section>
      </main>
    );
  }
});

module.exports = View;
