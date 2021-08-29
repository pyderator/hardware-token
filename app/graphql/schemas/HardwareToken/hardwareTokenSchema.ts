import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  extend type Query {
    getHardwareToken(productKey: String!): TokenResponse
    getHardwareTokens: TokensResponse
    getHardwareTokensUnAssigned: TokensResponse
  }

  type HardwareToken {
    id: ID
    productKey: String
    hashArray: String
  }

  extend type Mutation {
    addHardwareToken(productKey: String!): TokenResponse
  }

  type TokenResponse {
    data: HardwareToken
    errors: [Error!]
    success: Boolean!
  }

  type TokensResponse {
    data: [HardwareToken!]
    errors: [Error!]
    success: Boolean
  }

  type Error {
    message: String!
  }
`;
