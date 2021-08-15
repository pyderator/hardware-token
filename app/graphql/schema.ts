import { gql } from "apollo-server-micro";
import { mergeResolvers } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "./resolvers";
import { rootTypeDefs } from "./schemas";

export const rootSchema = makeExecutableSchema({
  typeDefs: [rootTypeDefs],
  resolvers: mergeResolvers(resolvers),
});
