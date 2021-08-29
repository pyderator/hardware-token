import { ApolloClient, InMemoryCache } from "@apollo/client";

console.log(process.env.NEXT_PUBLIC_GRAPHQL_DEV_URL);
const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_GRAPHQL_DEV_URL}`,
  cache: new InMemoryCache(),
});

export default client;
