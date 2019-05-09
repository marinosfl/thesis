import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home/Home';
import Login from './components/auth/Login/Login';
import Signup from './components/auth/Signup/Signup';
import Profile from './components/Profile/Profile';
import ActionForm from './components/ActionForm/ActionForm';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/profile" component={Profile} />
        <Route path="/submit_action" component={ActionForm} />
      </Switch>
    );
  }
}
