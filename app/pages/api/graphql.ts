import { ApolloServer, gql } from "apollo-server-micro";
// import { resolvers } from "../../resolvers";
// import { typeDefs } from "../../schemas";
const typeDefs = gql`
  type Query {
    sayHello: String
  }
`;

const resolvers = {
  Query: {
    sayHello() {
      return "Hello World!";
    },
  },
};
export const config = {
  api: {
    bodyParser: false,
  },
};
const server = new ApolloServer({ typeDefs, resolvers });

export default server.createHandler({ path: "/api/graphql" });
