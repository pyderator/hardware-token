import { gql } from "apollo-server-micro";
import { typeDefs as hardwareTypeDefs } from "./HardwareToken/hardwareTokenSchema";
import { userTypeDefs } from "./Users/userSchema";

const typeDefs = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

export const rootTypeDefs = [typeDefs, hardwareTypeDefs, userTypeDefs];
