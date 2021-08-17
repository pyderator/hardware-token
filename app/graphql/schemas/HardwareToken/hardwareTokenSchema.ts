import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  extend type Query {
    getHardwareToken(id: String!): TokenResponse
    getHardwareTokens: TokensResponse
  }

  type HardwareToken {
    id: ID
    tokenId: String
  }

  extend type Mutation {
    addHardwareToken(tokenId: String!): TokenResponse
  }

  type TokenResponse {
    data: HardwareToken
    errors: [Error!]
    success: Boolean!
  }

  type TokensResponse {
    data: [HardwareToken!]!
    errors: [Error!]
    success: Boolean
  }

  type Error {
    message: String!
  }
`;
