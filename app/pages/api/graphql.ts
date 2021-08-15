import { ApolloServer, gql } from "apollo-server-micro";
import { resolvers } from "../../graphql/resolvers";
import { rootSchema } from "../../graphql/schema";

export const config = {
  api: {
    bodyParser: false,
  },
};

const server = new ApolloServer({ schema: rootSchema });

export default server.createHandler({ path: "/api/graphql" });
