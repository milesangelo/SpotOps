import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import GroupRoutes from './components/groups/GroupRoutes';
import SpotRoutes from './components/spots/SpotRoutes';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <AuthorizeRoute path='/spots' component={SpotRoutes} />
        <AuthorizeRoute path='/groups' component={GroupRoutes} />
        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
      </Layout>
    );
  }
}
