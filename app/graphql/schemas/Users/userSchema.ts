import { gql } from "apollo-server-micro";

export const userTypeDefs = gql`
  extend type Query {
    findUser(id: String): UserResponse
  }

  extend type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      contactNumber: String!
      accountNumber: String!
      hardwareTokenId: String
    ): UserResponse
    registerUser(
      accountNumber: String!
      contactNumber: String!
    ): AddUserResponse
  }

  type User {
    id: String
    firstName: String
    lastName: String
    email: String
    contactNumber: String
    accountNumber: String
    hardwareToken: HardwareToken
    amount: Int
    status: STATUS
  }

  type UserResponse {
    data: User
    errors: [Error!]!
    success: Boolean!
  }

  type AddUserResponse {
    data: Boolean
    errors: [Error!]
    success: Boolean!
  }

  enum STATUS {
    ACTIVE
    NOT_ACTIVE
    BLOCKED
  }
`;