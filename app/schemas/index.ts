import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type User {
    id: ID
    firstName: String
    lastName: String
  }

  type Query {
    getUsers: [User]
    getUser(id: String!): User!
  }
`;
