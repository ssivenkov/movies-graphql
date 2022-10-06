import { ApolloClient, InMemoryCache } from '@apollo/client';

import typeDefs from './typeDefs.gql';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  typeDefs: typeDefs,
  uri: `${process.env.REACT_APP_GRAPHQL_ENDPOINT}`,
});
