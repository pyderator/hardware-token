import { ApolloServer } from "apollo-server-micro";
import Dataloader from "dataloader";
import { config as dotEnvConfig } from "dotenv";
import { batchHashes } from "../../batches/hashLoader";
import { createContext } from "../../graphql/context";
import { rootSchema } from "../../graphql/schema";

// Configuring env to support local and production as well.
process.env.NODE_ENV === "development"
  ? dotEnvConfig({ path: ".env" })
  : dotEnvConfig({ path: ".env.production" });

export const config = {
  api: {
    bodyParser: false,
  },
};

// Context

const context = createContext();

export const server = new ApolloServer({
  schema: rootSchema,
  context,
});

export default server.createHandler({ path: "/api/graphql" });
