import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  // uri: "https://tes-craft.test/api",
  uri: process.env.NEXT_PUBLIC_CRAFT_CMS_ENDPOINT,
  cache: new InMemoryCache()
});

export default client;
