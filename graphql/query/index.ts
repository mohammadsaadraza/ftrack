import { gql } from "@apollo/client";

export const AUTH = gql`
  query Query($password: String!) {
    authenticate(password: $password) {
      access_token
      refresh_token
    }
  }
`;