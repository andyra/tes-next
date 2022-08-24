import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.NODE_ENV.CRAFT_CMS_ENDPOINT,
  cache: new InMemoryCache()
});

const countryClient = new ApolloClient({
  uri: "https://countries.trevorblades.com",
  cache: new InMemoryCache()
});

export default client;
