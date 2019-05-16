import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';

import Home from '../components/Home/Home';
import Login from '../components/auth/Login/Login';
import Signup from '../components/auth/Signup/Signup';
import Profile from '../components/Profile/Profile';
import ActionForm from '../components/ActionForm/ActionForm';
import Dashboard from '../components/Dashboard/Dashboard';
import Actions from '../components/Actions/Actions';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/signup" component={Signup} exact />
        <Route path="/actions" component={Actions} exact />
        <ProtectedRoute path="/profile" component={Profile} exact />
        <ProtectedRoute path="/submit_action" component={ActionForm} exact />
        <AdminRoute path="/dashboard" component={Dashboard} exact />
      </Switch>
    );
  }
}
