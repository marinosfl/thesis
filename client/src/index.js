import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';

import 'mapbox-gl/dist/mapbox-gl.css';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';

// Components
import Header from './components/Header/Header';
import Routes from './routes/Routes';
import Alert from './components/Alert/Alert';

import './index.scss';

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  option: {
    reconnect: true
  }
});

const client = new ApolloClient({
  link: wsLink,
  cache: new InMemoryCache()
});

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <>
            <Header />
            <main className="main">
              <Alert />
              <Routes />
            </main>
          </>
        </Provider>
      </ApolloProvider>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
