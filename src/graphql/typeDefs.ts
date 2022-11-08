import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Login {
    accessToken: String
    expired: String
  }
  type User {
    account: String
    password: String
    name: String
    birthday: String
  }
  input LoginInput {
    account: String
    password: String
  }
  type Query {
    me: User
    login(userInput: LoginInput): Login
  }
`;
