import { gql } from "apollo-server-micro";
import { typeDefs as hardwareTypeDefs } from "./HardwareToken/hardwareTokenSchema";
import { resolvers } from "../resolvers";
import { mergeResolvers } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { hardwareTokenResolvers } from "../resolvers/HardwareToken/hardwareTokenResolvers";

const typeDefs = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

export const rootTypeDefs = [typeDefs, hardwareTypeDefs];
