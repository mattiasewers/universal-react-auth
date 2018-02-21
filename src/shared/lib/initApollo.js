import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-unfetch';

let apolloClient = null;

if (!process.browser) {
  global.fetch = fetch;
}

function create(initialState, headers) {
  return new ApolloClient({
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries run once)
    link: new HttpLink({
      uri: 'http://localhost:3000/graphql', // Server URL (must be absolute)
      credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
      headers
    }),
    cache: new InMemoryCache({
      dataIdFromObject: o => o.id
    }).restore(initialState || {})
  });
}

export default function initApollo(initialState, headers) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections
  if (!process.browser) {
    return create(initialState, headers);
  }

  // Reuse apollo client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
