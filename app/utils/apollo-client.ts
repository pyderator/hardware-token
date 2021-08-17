import { ApolloClient, InMemoryCache } from "@apollo/client";

console.log(process.env.NEXT_PUBLIC_GRAPHQL_DEV_URL);
const client = new ApolloClient({
  uri: `http://localhost:3000/api/graphql`,
  cache: new InMemoryCache(),
});

export default client;
