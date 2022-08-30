import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://tes-craft.test/api",
  cache: new InMemoryCache()
});

export default client;
