import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../layout/Home/Home';
import Login from '../components/Login/Login';
import Signup from '../components/Signup/Signup';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Switch>
    );
  }
}
