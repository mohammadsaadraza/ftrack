import { gql } from "@apollo/client";

export const AUTH = gql`
  query Query($password: String!) {
    authenticate(password: $password) {
      access_token
      refresh_token
    }
  }
`;

export const REFRESH_AUTH = gql`
  query Refresh {
    refresh {
      access_token
      refresh_token
    }
  }
`;

export const GET_TRANSACTIONS = gql`
  query GetTransactions {
    getTransactions {
      type
      id
      currency
      description
      date
      amount
    }
  }
`;