import React, { useContext, useReducer } from 'react';
import ReactDOM from 'react-dom';

import Context from './context';
import reducer from './reducer';

import { BrowserRouter as Router } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';

import Header from './components/Header/Header';
import Routes from './Routes';

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
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Router>
      <ApolloProvider client={client}>
        <Context.Provider value={{ state, dispatch }}>
          <>
            <Header />
            <main className="main">
              <Routes />
            </main>
          </>
        </Context.Provider>
      </ApolloProvider>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
