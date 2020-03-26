
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Graphqlapp from './graphqlapp';
import * as serviceWorker from './serviceWorker';
import App from './App'
import firebase from 'firebase'
import { initializeFirebase } from './push-notification';
import registerServiceWorker from './serviceWorker';


import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4000/graphql'
})

const client = new ApolloClient({
  cache,
  link
})


if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./firebase-messaging-sw.js")
    .then(function(registration) {
      console.log("Registration successful, scope is:", registration.scope);
    })
    .catch(function(err) {
      console.log("Service worker registration failed, error:", err);
    });
}

ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<ApolloProvider client={client}><Graphqlapp /></ApolloProvider>, document.getElementById('root'));

registerServiceWorker();
initializeFirebase(); 