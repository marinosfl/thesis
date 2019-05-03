import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../layout/Home/Home';
import Login from '../components/auth/Login/Login';
import Signup from '../components/auth/Signup/Signup';
import Profile from '../components/auth/Profile/Profile';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/profile" component={Profile} />
      </Switch>
    );
  }
}
