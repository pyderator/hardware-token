import { ApolloServer } from "apollo-server-micro";
import { config as dotEnvConfig } from "dotenv";
import { NextApiRequest, NextApiResponse } from "next";
import { createContext } from "../../graphql/context";
import { rootSchema } from "../../graphql/schema";
import cookies from "../../utils/cookies";

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

// const context = createContext();

export const server = new ApolloServer({
  schema: rootSchema,
  context: createContext,
});

export default cookies(server.createHandler({ path: "/api/graphql" }));
