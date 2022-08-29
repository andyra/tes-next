import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://content.tes.fm/api",
  // uri: "https://tes-craft.test/api",
  cache: new InMemoryCache()
});

const countryClient = new ApolloClient({
  uri: "https://countries.trevorblades.com",
  cache: new InMemoryCache()
});

export default client;
