import { gql } from "apollo-server-micro";

// TODO: Naming conventions ;p
export const userTypeDefs = gql`
  extend type Query {
    findUser(id: String): UserResponse
    findAllUsers: UsersResponse
    loggedInUser: LoggedInUser
  }

  extend type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      contactNumber: String!
      accountNumber: String!
      productKey: String!
    ): UserResponse
    registerUser(
      accountNumber: String!
      contactNumber: String!
    ): AddUserResponse
    checkIfCredsMatches(
      accountNumber: String
      password: String
    ): CheckCredsMatchResponse
    checkIfTOTPMatches(
      totpToken: String
      accountNumber: String
      password: String
    ): CheckCredsMatchResponse
    changeUserPassword(
      password: String!
      confirmPassword: String!
    ): CheckCredsMatchResponse
  }

  type LoggedInUser {
    data: LoggedInUserData
    errors: [Error!]
    success: Boolean
  }

  type LoggedInUserData {
    id: ID
    firstName: String
    lastName: String
    email: String
    accountNumber: String
    isPasswordExpired: Boolean
  }

  type User {
    id: String
    firstName: String
    lastName: String
    email: String
    contactNumber: String
    accountNumber: String
    hardwareTokenId: String
    hardwareToken: HardwareToken
    amount: Int
    status: STATUS
  }

  type UserResponse {
    data: User
    errors: [Error!]
    success: Boolean!
  }

  type UsersResponse {
    data: [User!]
    errors: [Error!]
    success: Boolean!
  }

  type AddUserResponse {
    data: Boolean
    errors: [Error!]
    success: Boolean!
  }

  type CheckCredsMatchResponse {
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
