import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddUserResponse = {
  __typename?: 'AddUserResponse';
  data?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Array<Error>>;
  success: Scalars['Boolean'];
};

export type CheckCredsMatchResponse = {
  __typename?: 'CheckCredsMatchResponse';
  data?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Array<Error>>;
  success: Scalars['Boolean'];
};

export type Error = {
  __typename?: 'Error';
  message: Scalars['String'];
};

export type HardwareToken = {
  __typename?: 'HardwareToken';
  id?: Maybe<Scalars['ID']>;
  tokenId?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  addHardwareToken?: Maybe<TokenResponse>;
  addUser?: Maybe<UserResponse>;
  registerUser?: Maybe<AddUserResponse>;
};


export type MutationAddHardwareTokenArgs = {
  tokenId: Scalars['String'];
};


export type MutationAddUserArgs = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  contactNumber: Scalars['String'];
  accountNumber: Scalars['String'];
  hardwareTokenId?: Maybe<Scalars['String']>;
};


export type MutationRegisterUserArgs = {
  accountNumber: Scalars['String'];
  contactNumber: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  getHardwareToken?: Maybe<TokenResponse>;
  getHardwareTokens?: Maybe<TokensResponse>;
  findUser?: Maybe<UserResponse>;
  findAllUsers?: Maybe<UsersResponse>;
  checkIfCredsMatches?: Maybe<CheckCredsMatchResponse>;
  checkIfTOTPMatches?: Maybe<CheckCredsMatchResponse>;
};


export type QueryGetHardwareTokenArgs = {
  id: Scalars['String'];
};


export type QueryFindUserArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryCheckIfCredsMatchesArgs = {
  accountNumber?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};


export type QueryCheckIfTotpMatchesArgs = {
  totpToken?: Maybe<Scalars['String']>;
  accountNumber?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export enum Status {
  Active = 'ACTIVE',
  NotActive = 'NOT_ACTIVE',
  Blocked = 'BLOCKED'
}

export type TokenResponse = {
  __typename?: 'TokenResponse';
  data?: Maybe<HardwareToken>;
  errors: Array<Error>;
  success: Scalars['Boolean'];
};

export type TokensResponse = {
  __typename?: 'TokensResponse';
  data: Array<HardwareToken>;
  errors?: Maybe<Array<Error>>;
  success?: Maybe<Scalars['Boolean']>;
};

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  contactNumber?: Maybe<Scalars['String']>;
  accountNumber?: Maybe<Scalars['String']>;
  hardwareToken?: Maybe<HardwareToken>;
  amount?: Maybe<Scalars['Int']>;
  status?: Maybe<Status>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  data?: Maybe<User>;
  errors?: Maybe<Array<Error>>;
  success: Scalars['Boolean'];
};

export type UsersResponse = {
  __typename?: 'UsersResponse';
  data?: Maybe<Array<User>>;
  errors?: Maybe<Array<Error>>;
  success: Scalars['Boolean'];
};

export type RegisterAccountMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  contactNumber: Scalars['String'];
  accountNumber: Scalars['String'];
  hardwareTokenId: Scalars['String'];
}>;


export type RegisterAccountMutation = { __typename?: 'Mutation', addUser?: Maybe<{ __typename?: 'UserResponse', success: boolean, data?: Maybe<{ __typename?: 'User', id?: Maybe<string> }>, errors?: Maybe<Array<{ __typename?: 'Error', message: string }>> }> };

export type AllHardwareTokensQueryVariables = Exact<{ [key: string]: never; }>;


export type AllHardwareTokensQuery = { __typename?: 'Query', getHardwareTokens?: Maybe<{ __typename?: 'TokensResponse', success?: Maybe<boolean>, data: Array<{ __typename?: 'HardwareToken', id?: Maybe<string>, tokenId?: Maybe<string> }>, errors?: Maybe<Array<{ __typename?: 'Error', message: string }>> }> };

export type AllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUsersQuery = { __typename?: 'Query', findAllUsers?: Maybe<{ __typename?: 'UsersResponse', success: boolean, data?: Maybe<Array<{ __typename?: 'User', id?: Maybe<string>, firstName?: Maybe<string>, lastName?: Maybe<string>, email?: Maybe<string>, contactNumber?: Maybe<string>, accountNumber?: Maybe<string>, status?: Maybe<Status>, amount?: Maybe<number>, hardwareToken?: Maybe<{ __typename?: 'HardwareToken', tokenId?: Maybe<string> }> }>>, errors?: Maybe<Array<{ __typename?: 'Error', message: string }>> }> };


export const RegisterAccountDocument = gql`
    mutation registerAccount($firstName: String!, $lastName: String!, $email: String!, $contactNumber: String!, $accountNumber: String!, $hardwareTokenId: String!) {
  addUser(
    firstName: $firstName
    lastName: $lastName
    email: $email
    contactNumber: $contactNumber
    accountNumber: $accountNumber
    hardwareTokenId: $hardwareTokenId
  ) {
    data {
      id
    }
    errors {
      message
    }
    success
  }
}
    `;
export type RegisterAccountMutationFn = Apollo.MutationFunction<RegisterAccountMutation, RegisterAccountMutationVariables>;

/**
 * __useRegisterAccountMutation__
 *
 * To run a mutation, you first call `useRegisterAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerAccountMutation, { data, loading, error }] = useRegisterAccountMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      email: // value for 'email'
 *      contactNumber: // value for 'contactNumber'
 *      accountNumber: // value for 'accountNumber'
 *      hardwareTokenId: // value for 'hardwareTokenId'
 *   },
 * });
 */
export function useRegisterAccountMutation(baseOptions?: Apollo.MutationHookOptions<RegisterAccountMutation, RegisterAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterAccountMutation, RegisterAccountMutationVariables>(RegisterAccountDocument, options);
      }
export type RegisterAccountMutationHookResult = ReturnType<typeof useRegisterAccountMutation>;
export type RegisterAccountMutationResult = Apollo.MutationResult<RegisterAccountMutation>;
export type RegisterAccountMutationOptions = Apollo.BaseMutationOptions<RegisterAccountMutation, RegisterAccountMutationVariables>;
export const AllHardwareTokensDocument = gql`
    query allHardwareTokens {
  getHardwareTokens {
    data {
      id
      tokenId
    }
    errors {
      message
    }
    success
  }
}
    `;

/**
 * __useAllHardwareTokensQuery__
 *
 * To run a query within a React component, call `useAllHardwareTokensQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllHardwareTokensQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllHardwareTokensQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllHardwareTokensQuery(baseOptions?: Apollo.QueryHookOptions<AllHardwareTokensQuery, AllHardwareTokensQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllHardwareTokensQuery, AllHardwareTokensQueryVariables>(AllHardwareTokensDocument, options);
      }
export function useAllHardwareTokensLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllHardwareTokensQuery, AllHardwareTokensQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllHardwareTokensQuery, AllHardwareTokensQueryVariables>(AllHardwareTokensDocument, options);
        }
export type AllHardwareTokensQueryHookResult = ReturnType<typeof useAllHardwareTokensQuery>;
export type AllHardwareTokensLazyQueryHookResult = ReturnType<typeof useAllHardwareTokensLazyQuery>;
export type AllHardwareTokensQueryResult = Apollo.QueryResult<AllHardwareTokensQuery, AllHardwareTokensQueryVariables>;
export const AllUsersDocument = gql`
    query AllUsers {
  findAllUsers {
    data {
      id
      firstName
      lastName
      email
      contactNumber
      accountNumber
      status
      hardwareToken {
        tokenId
      }
      amount
    }
    errors {
      message
    }
    success
  }
}
    `;

/**
 * __useAllUsersQuery__
 *
 * To run a query within a React component, call `useAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<AllUsersQuery, AllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllUsersQuery, AllUsersQueryVariables>(AllUsersDocument, options);
      }
export function useAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllUsersQuery, AllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllUsersQuery, AllUsersQueryVariables>(AllUsersDocument, options);
        }
export type AllUsersQueryHookResult = ReturnType<typeof useAllUsersQuery>;
export type AllUsersLazyQueryHookResult = ReturnType<typeof useAllUsersLazyQuery>;
export type AllUsersQueryResult = Apollo.QueryResult<AllUsersQuery, AllUsersQueryVariables>;