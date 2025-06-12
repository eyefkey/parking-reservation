// lib/apollo-client.js

import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql", // URL of your NestJS backend
  cache: new InMemoryCache(),
});

export default client;
