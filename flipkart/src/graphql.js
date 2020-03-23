import React from 'react';
import ReactDOM from 'react-dom';
import Graphqlapp from './graphqlapp';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: 'localhost:4000/graphiql'
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Graphqlapp />
  </ApolloProvider>,
  document.getElementById('root')
);