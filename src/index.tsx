import React from 'react';
import {render} from 'react-dom';
import App from './components/App';
import {ApolloClient, InMemoryCache} from '@apollo/client';
import {ApolloProvider} from '@apollo/client/react';

const client = new ApolloClient({
  uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          allPeople: {
            keyArgs: false,
            merge(existing, incoming) {
              if (!incoming) return existing;
              if (!existing) return incoming;

              const { people, ...rest } = incoming;

              let result = rest;
              result.people = [...existing.people, ...people];
  
              return result;
            }
          }
        }
      }
    }
  })
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);