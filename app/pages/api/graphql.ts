import { ApolloServer, gql } from "apollo-server-micro";
import { rootSchema } from "../../graphql/schema";
import { config as dotEnvConfig } from "dotenv";

// Configuring env to support local and production as well.
process.env.NODE_ENV === "development"
  ? dotEnvConfig({ path: ".env" })
  : dotEnvConfig({ path: ".env.production" });

export const config = {
  api: {
    bodyParser: false,
  },
};

const server = new ApolloServer({ schema: rootSchema });

export default server.createHandler({ path: "/api/graphql" });
