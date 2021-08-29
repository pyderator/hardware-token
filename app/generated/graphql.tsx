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
  productKey?: Maybe<Scalars['String']>;
  hashArray?: Maybe<Scalars['String']>;
};

export type LoggedInUser = {
  __typename?: 'LoggedInUser';
  data?: Maybe<LoggedInUserData>;
  errors?: Maybe<Array<Error>>;
  success?: Maybe<Scalars['Boolean']>;
};

export type LoggedInUserData = {
  __typename?: 'LoggedInUserData';
  id?: Maybe<Scalars['ID']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  accountNumber?: Maybe<Scalars['String']>;
  isPasswordExpired?: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  addHardwareToken?: Maybe<TokenResponse>;
  addUser?: Maybe<UserResponse>;
  registerUser?: Maybe<AddUserResponse>;
  checkIfCredsMatches?: Maybe<CheckCredsMatchResponse>;
  checkIfTOTPMatches?: Maybe<CheckCredsMatchResponse>;
  changeUserPassword?: Maybe<CheckCredsMatchResponse>;
  preTransactionCheck?: Maybe<PreCheckTransaction>;
  transaction?: Maybe<Transaction>;
};


export type MutationAddHardwareTokenArgs = {
  productKey: Scalars['String'];
};


export type MutationAddUserArgs = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  contactNumber: Scalars['String'];
  accountNumber: Scalars['String'];
  productKey: Scalars['String'];
};


export type MutationRegisterUserArgs = {
  accountNumber: Scalars['String'];
  contactNumber: Scalars['String'];
};


export type MutationCheckIfCredsMatchesArgs = {
  accountNumber?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};


export type MutationCheckIfTotpMatchesArgs = {
  totpToken?: Maybe<Scalars['String']>;
  accountNumber?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};


export type MutationChangeUserPasswordArgs = {
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
};


export type MutationPreTransactionCheckArgs = {
  recipientAccountNumber: Scalars['String'];
  amount: Scalars['String'];
};


export type MutationTransactionArgs = {
  recipientAccountNumber: Scalars['String'];
  amount: Scalars['String'];
  totpToken?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  getHardwareToken?: Maybe<TokenResponse>;
  getHardwareTokens?: Maybe<TokensResponse>;
  getHardwareTokensUnAssigned?: Maybe<TokensResponse>;
  findUser?: Maybe<UserResponse>;
  findAllUsers?: Maybe<UsersResponse>;
  loggedInUser?: Maybe<LoggedInUser>;
  getUserInfo?: Maybe<UserInfo>;
};


export type QueryGetHardwareTokenArgs = {
  productKey: Scalars['String'];
};


export type QueryFindUserArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryGetUserInfoArgs = {
  id?: Maybe<Scalars['String']>;
};

export enum Status {
  Active = 'ACTIVE',
  NotActive = 'NOT_ACTIVE',
  Blocked = 'BLOCKED'
}

export type T = {
  __typename?: 'T';
  id?: Maybe<Scalars['String']>;
  transactionId?: Maybe<Scalars['String']>;
  fromUser?: Maybe<Scalars['String']>;
  toUser?: Maybe<Scalars['String']>;
};

export type TokenResponse = {
  __typename?: 'TokenResponse';
  data?: Maybe<HardwareToken>;
  errors?: Maybe<Array<Error>>;
  success: Scalars['Boolean'];
};

export type TokensResponse = {
  __typename?: 'TokensResponse';
  data?: Maybe<Array<HardwareToken>>;
  errors?: Maybe<Array<Error>>;
  success?: Maybe<Scalars['Boolean']>;
};

export type Transaction = {
  __typename?: 'Transaction';
  data?: Maybe<TransactionInfo>;
  errors?: Maybe<Array<Error>>;
  success?: Maybe<Scalars['Boolean']>;
};

export type TransactionInfo = {
  __typename?: 'TransactionInfo';
  newAmount?: Maybe<Scalars['String']>;
};

export type U = {
  __typename?: 'U';
  accountNumber?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['String']>;
  contactNumber?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  hardwareTokenId?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  contactNumber?: Maybe<Scalars['String']>;
  accountNumber?: Maybe<Scalars['String']>;
  hardwareTokenId?: Maybe<Scalars['String']>;
  hardwareToken?: Maybe<HardwareToken>;
  amount?: Maybe<Scalars['Int']>;
  status?: Maybe<Status>;
};

export type UserInfo = {
  __typename?: 'UserInfo';
  data?: Maybe<UserInfoData>;
  errors?: Maybe<Array<Error>>;
  success?: Maybe<Scalars['Boolean']>;
};

export type UserInfoData = {
  __typename?: 'UserInfoData';
  transactions?: Maybe<Array<T>>;
  user?: Maybe<U>;
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

export type PreCheckTransaction = {
  __typename?: 'preCheckTransaction';
  data?: Maybe<PreCheckTransactionInfo>;
  errors?: Maybe<Array<Error>>;
  success?: Maybe<Scalars['Boolean']>;
};

export type PreCheckTransactionInfo = {
  __typename?: 'preCheckTransactionInfo';
  recipientInfo?: Maybe<RecipientInfoType>;
  amount?: Maybe<Scalars['String']>;
};

export type RecipientInfoType = {
  __typename?: 'recipientInfoType';
  name?: Maybe<Scalars['String']>;
  accountNumber?: Maybe<Scalars['String']>;
  initiatedTransactionDate?: Maybe<Scalars['String']>;
};

export type AddHardwareTokenMutationVariables = Exact<{
  productKey: Scalars['String'];
}>;


export type AddHardwareTokenMutation = { __typename?: 'Mutation', addHardwareToken?: Maybe<{ __typename?: 'TokenResponse', success: boolean, data?: Maybe<{ __typename?: 'HardwareToken', id?: Maybe<string>, productKey?: Maybe<string>, hashArray?: Maybe<string> }>, errors?: Maybe<Array<{ __typename?: 'Error', message: string }>> }> };

export type AddUserMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  contactNumber: Scalars['String'];
  accountNumber: Scalars['String'];
  productKey: Scalars['String'];
}>;


export type AddUserMutation = { __typename?: 'Mutation', addUser?: Maybe<{ __typename?: 'UserResponse', success: boolean, data?: Maybe<{ __typename?: 'User', id?: Maybe<string>, hardwareToken?: Maybe<{ __typename?: 'HardwareToken', productKey?: Maybe<string> }> }>, errors?: Maybe<Array<{ __typename?: 'Error', message: string }>> }> };

export type PreTransactionCheckMutationVariables = Exact<{
  recipientAmountNumber: Scalars['String'];
  amount: Scalars['String'];
}>;


export type PreTransactionCheckMutation = { __typename?: 'Mutation', preTransactionCheck?: Maybe<{ __typename?: 'preCheckTransaction', data?: Maybe<{ __typename?: 'preCheckTransactionInfo', amount?: Maybe<string>, recipientInfo?: Maybe<{ __typename?: 'recipientInfoType', name?: Maybe<string>, accountNumber?: Maybe<string>, initiatedTransactionDate?: Maybe<string> }> }>, errors?: Maybe<Array<{ __typename?: 'Error', message: string }>> }> };

export type RegisterUserMutationVariables = Exact<{
  accountNumber: Scalars['String'];
  contactNumber: Scalars['String'];
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser?: Maybe<{ __typename?: 'AddUserResponse', data?: Maybe<boolean>, success: boolean, errors?: Maybe<Array<{ __typename?: 'Error', message: string }>> }> };

export type TransactionMutationVariables = Exact<{
  recipientAccountNumber: Scalars['String'];
  amount: Scalars['String'];
  totpToken: Scalars['String'];
}>;


export type TransactionMutation = { __typename?: 'Mutation', transaction?: Maybe<{ __typename?: 'Transaction', success?: Maybe<boolean>, data?: Maybe<{ __typename?: 'TransactionInfo', newAmount?: Maybe<string> }>, errors?: Maybe<Array<{ __typename?: 'Error', message: string }>> }> };

export type ChangePasswordMutationVariables = Exact<{
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changeUserPassword?: Maybe<{ __typename?: 'CheckCredsMatchResponse', data?: Maybe<boolean>, success: boolean, errors?: Maybe<Array<{ __typename?: 'Error', message: string }>> }> };

export type AllHardwareTokensQueryVariables = Exact<{ [key: string]: never; }>;


export type AllHardwareTokensQuery = { __typename?: 'Query', getHardwareTokens?: Maybe<{ __typename?: 'TokensResponse', success?: Maybe<boolean>, data?: Maybe<Array<{ __typename?: 'HardwareToken', id?: Maybe<string>, productKey?: Maybe<string> }>>, errors?: Maybe<Array<{ __typename?: 'Error', message: string }>> }> };

export type GetNonAssignedHardwareTokensQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNonAssignedHardwareTokensQuery = { __typename?: 'Query', getHardwareTokensUnAssigned?: Maybe<{ __typename?: 'TokensResponse', data?: Maybe<Array<{ __typename?: 'HardwareToken', productKey?: Maybe<string> }>> }> };

export type AllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUsersQuery = { __typename?: 'Query', findAllUsers?: Maybe<{ __typename?: 'UsersResponse', success: boolean, data?: Maybe<Array<{ __typename?: 'User', id?: Maybe<string>, firstName?: Maybe<string>, lastName?: Maybe<string>, email?: Maybe<string>, contactNumber?: Maybe<string>, accountNumber?: Maybe<string>, hardwareTokenId?: Maybe<string>, amount?: Maybe<number>, status?: Maybe<Status>, hardwareToken?: Maybe<{ __typename?: 'HardwareToken', id?: Maybe<string>, productKey?: Maybe<string>, hashArray?: Maybe<string> }> }>>, errors?: Maybe<Array<{ __typename?: 'Error', message: string }>> }> };

export type GetUserInfoQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetUserInfoQuery = { __typename?: 'Query', getUserInfo?: Maybe<{ __typename?: 'UserInfo', data?: Maybe<{ __typename?: 'UserInfoData', user?: Maybe<{ __typename?: 'U', accountNumber?: Maybe<string>, amount?: Maybe<string>, contactNumber?: Maybe<string>, email?: Maybe<string>, firstName?: Maybe<string>, hardwareTokenId?: Maybe<string>, lastName?: Maybe<string>, status?: Maybe<string> }>, transactions?: Maybe<Array<{ __typename?: 'T', id?: Maybe<string>, transactionId?: Maybe<string>, fromUser?: Maybe<string>, toUser?: Maybe<string> }>> }>, errors?: Maybe<Array<{ __typename?: 'Error', message: string }>> }> };

export type IsUserLoggedInQueryVariables = Exact<{ [key: string]: never; }>;


export type IsUserLoggedInQuery = { __typename?: 'Query', loggedInUser?: Maybe<{ __typename?: 'LoggedInUser', success?: Maybe<boolean>, data?: Maybe<{ __typename?: 'LoggedInUserData', id?: Maybe<string>, firstName?: Maybe<string>, lastName?: Maybe<string>, email?: Maybe<string>, accountNumber?: Maybe<string>, isPasswordExpired?: Maybe<boolean> }>, errors?: Maybe<Array<{ __typename?: 'Error', message: string }>> }> };

export type CheckIfCredsMatchesMutationVariables = Exact<{
  accountNumber: Scalars['String'];
  password: Scalars['String'];
}>;


export type CheckIfCredsMatchesMutation = { __typename?: 'Mutation', checkIfCredsMatches?: Maybe<{ __typename?: 'CheckCredsMatchResponse', data?: Maybe<boolean>, success: boolean, errors?: Maybe<Array<{ __typename?: 'Error', message: string }>> }> };

export type CheckIfTotpMatchesMutationVariables = Exact<{
  accountNumber: Scalars['String'];
  password: Scalars['String'];
  totpToken: Scalars['String'];
}>;


export type CheckIfTotpMatchesMutation = { __typename?: 'Mutation', checkIfTOTPMatches?: Maybe<{ __typename?: 'CheckCredsMatchResponse', data?: Maybe<boolean>, success: boolean, errors?: Maybe<Array<{ __typename?: 'Error', message: string }>> }> };


export const AddHardwareTokenDocument = gql`
    mutation AddHardwareToken($productKey: String!) {
  addHardwareToken(productKey: $productKey) {
    data {
      id
      productKey
      hashArray
    }
    errors {
      message
    }
    success
  }
}
    `;
export type AddHardwareTokenMutationFn = Apollo.MutationFunction<AddHardwareTokenMutation, AddHardwareTokenMutationVariables>;

/**
 * __useAddHardwareTokenMutation__
 *
 * To run a mutation, you first call `useAddHardwareTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddHardwareTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addHardwareTokenMutation, { data, loading, error }] = useAddHardwareTokenMutation({
 *   variables: {
 *      productKey: // value for 'productKey'
 *   },
 * });
 */
export function useAddHardwareTokenMutation(baseOptions?: Apollo.MutationHookOptions<AddHardwareTokenMutation, AddHardwareTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddHardwareTokenMutation, AddHardwareTokenMutationVariables>(AddHardwareTokenDocument, options);
      }
export type AddHardwareTokenMutationHookResult = ReturnType<typeof useAddHardwareTokenMutation>;
export type AddHardwareTokenMutationResult = Apollo.MutationResult<AddHardwareTokenMutation>;
export type AddHardwareTokenMutationOptions = Apollo.BaseMutationOptions<AddHardwareTokenMutation, AddHardwareTokenMutationVariables>;
export const AddUserDocument = gql`
    mutation addUser($firstName: String!, $lastName: String!, $email: String!, $contactNumber: String!, $accountNumber: String!, $productKey: String!) {
  addUser(
    firstName: $firstName
    lastName: $lastName
    email: $email
    contactNumber: $contactNumber
    accountNumber: $accountNumber
    productKey: $productKey
  ) {
    data {
      id
      hardwareToken {
        productKey
      }
    }
    errors {
      message
    }
    success
  }
}
    `;
export type AddUserMutationFn = Apollo.MutationFunction<AddUserMutation, AddUserMutationVariables>;

/**
 * __useAddUserMutation__
 *
 * To run a mutation, you first call `useAddUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserMutation, { data, loading, error }] = useAddUserMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      email: // value for 'email'
 *      contactNumber: // value for 'contactNumber'
 *      accountNumber: // value for 'accountNumber'
 *      productKey: // value for 'productKey'
 *   },
 * });
 */
export function useAddUserMutation(baseOptions?: Apollo.MutationHookOptions<AddUserMutation, AddUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddUserMutation, AddUserMutationVariables>(AddUserDocument, options);
      }
export type AddUserMutationHookResult = ReturnType<typeof useAddUserMutation>;
export type AddUserMutationResult = Apollo.MutationResult<AddUserMutation>;
export type AddUserMutationOptions = Apollo.BaseMutationOptions<AddUserMutation, AddUserMutationVariables>;
export const PreTransactionCheckDocument = gql`
    mutation preTransactionCheck($recipientAmountNumber: String!, $amount: String!) {
  preTransactionCheck(
    recipientAccountNumber: $recipientAmountNumber
    amount: $amount
  ) {
    data {
      recipientInfo {
        name
        accountNumber
        initiatedTransactionDate
      }
      amount
    }
    errors {
      message
    }
  }
}
    `;
export type PreTransactionCheckMutationFn = Apollo.MutationFunction<PreTransactionCheckMutation, PreTransactionCheckMutationVariables>;

/**
 * __usePreTransactionCheckMutation__
 *
 * To run a mutation, you first call `usePreTransactionCheckMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePreTransactionCheckMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [preTransactionCheckMutation, { data, loading, error }] = usePreTransactionCheckMutation({
 *   variables: {
 *      recipientAmountNumber: // value for 'recipientAmountNumber'
 *      amount: // value for 'amount'
 *   },
 * });
 */
export function usePreTransactionCheckMutation(baseOptions?: Apollo.MutationHookOptions<PreTransactionCheckMutation, PreTransactionCheckMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PreTransactionCheckMutation, PreTransactionCheckMutationVariables>(PreTransactionCheckDocument, options);
      }
export type PreTransactionCheckMutationHookResult = ReturnType<typeof usePreTransactionCheckMutation>;
export type PreTransactionCheckMutationResult = Apollo.MutationResult<PreTransactionCheckMutation>;
export type PreTransactionCheckMutationOptions = Apollo.BaseMutationOptions<PreTransactionCheckMutation, PreTransactionCheckMutationVariables>;
export const RegisterUserDocument = gql`
    mutation registerUser($accountNumber: String!, $contactNumber: String!) {
  registerUser(accountNumber: $accountNumber, contactNumber: $contactNumber) {
    data
    errors {
      message
    }
    success
  }
}
    `;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      accountNumber: // value for 'accountNumber'
 *      contactNumber: // value for 'contactNumber'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const TransactionDocument = gql`
    mutation Transaction($recipientAccountNumber: String!, $amount: String!, $totpToken: String!) {
  transaction(
    recipientAccountNumber: $recipientAccountNumber
    amount: $amount
    totpToken: $totpToken
  ) {
    data {
      newAmount
    }
    errors {
      message
    }
    success
  }
}
    `;
export type TransactionMutationFn = Apollo.MutationFunction<TransactionMutation, TransactionMutationVariables>;

/**
 * __useTransactionMutation__
 *
 * To run a mutation, you first call `useTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [transactionMutation, { data, loading, error }] = useTransactionMutation({
 *   variables: {
 *      recipientAccountNumber: // value for 'recipientAccountNumber'
 *      amount: // value for 'amount'
 *      totpToken: // value for 'totpToken'
 *   },
 * });
 */
export function useTransactionMutation(baseOptions?: Apollo.MutationHookOptions<TransactionMutation, TransactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TransactionMutation, TransactionMutationVariables>(TransactionDocument, options);
      }
export type TransactionMutationHookResult = ReturnType<typeof useTransactionMutation>;
export type TransactionMutationResult = Apollo.MutationResult<TransactionMutation>;
export type TransactionMutationOptions = Apollo.BaseMutationOptions<TransactionMutation, TransactionMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation changePassword($password: String!, $confirmPassword: String!) {
  changeUserPassword(password: $password, confirmPassword: $confirmPassword) {
    data
    errors {
      message
    }
    success
  }
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      password: // value for 'password'
 *      confirmPassword: // value for 'confirmPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const AllHardwareTokensDocument = gql`
    query allHardwareTokens {
  getHardwareTokens {
    data {
      id
      productKey
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
export const GetNonAssignedHardwareTokensDocument = gql`
    query getNonAssignedHardwareTokens {
  getHardwareTokensUnAssigned {
    data {
      productKey
    }
  }
}
    `;

/**
 * __useGetNonAssignedHardwareTokensQuery__
 *
 * To run a query within a React component, call `useGetNonAssignedHardwareTokensQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNonAssignedHardwareTokensQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNonAssignedHardwareTokensQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNonAssignedHardwareTokensQuery(baseOptions?: Apollo.QueryHookOptions<GetNonAssignedHardwareTokensQuery, GetNonAssignedHardwareTokensQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNonAssignedHardwareTokensQuery, GetNonAssignedHardwareTokensQueryVariables>(GetNonAssignedHardwareTokensDocument, options);
      }
export function useGetNonAssignedHardwareTokensLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNonAssignedHardwareTokensQuery, GetNonAssignedHardwareTokensQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNonAssignedHardwareTokensQuery, GetNonAssignedHardwareTokensQueryVariables>(GetNonAssignedHardwareTokensDocument, options);
        }
export type GetNonAssignedHardwareTokensQueryHookResult = ReturnType<typeof useGetNonAssignedHardwareTokensQuery>;
export type GetNonAssignedHardwareTokensLazyQueryHookResult = ReturnType<typeof useGetNonAssignedHardwareTokensLazyQuery>;
export type GetNonAssignedHardwareTokensQueryResult = Apollo.QueryResult<GetNonAssignedHardwareTokensQuery, GetNonAssignedHardwareTokensQueryVariables>;
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
      hardwareTokenId
      hardwareToken {
        id
        productKey
        hashArray
      }
      amount
      status
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
export const GetUserInfoDocument = gql`
    query getUserInfo($id: String!) {
  getUserInfo(id: $id) {
    data {
      user {
        accountNumber
        amount
        contactNumber
        email
        firstName
        hardwareTokenId
        lastName
        status
      }
      transactions {
        id
        transactionId
        fromUser
        toUser
      }
    }
    errors {
      message
    }
  }
}
    `;

/**
 * __useGetUserInfoQuery__
 *
 * To run a query within a React component, call `useGetUserInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserInfoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserInfoQuery(baseOptions: Apollo.QueryHookOptions<GetUserInfoQuery, GetUserInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserInfoQuery, GetUserInfoQueryVariables>(GetUserInfoDocument, options);
      }
export function useGetUserInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserInfoQuery, GetUserInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserInfoQuery, GetUserInfoQueryVariables>(GetUserInfoDocument, options);
        }
export type GetUserInfoQueryHookResult = ReturnType<typeof useGetUserInfoQuery>;
export type GetUserInfoLazyQueryHookResult = ReturnType<typeof useGetUserInfoLazyQuery>;
export type GetUserInfoQueryResult = Apollo.QueryResult<GetUserInfoQuery, GetUserInfoQueryVariables>;
export const IsUserLoggedInDocument = gql`
    query isUserLoggedIn {
  loggedInUser {
    data {
      id
      firstName
      lastName
      email
      accountNumber
      isPasswordExpired
    }
    errors {
      message
    }
    success
  }
}
    `;

/**
 * __useIsUserLoggedInQuery__
 *
 * To run a query within a React component, call `useIsUserLoggedInQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsUserLoggedInQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsUserLoggedInQuery({
 *   variables: {
 *   },
 * });
 */
export function useIsUserLoggedInQuery(baseOptions?: Apollo.QueryHookOptions<IsUserLoggedInQuery, IsUserLoggedInQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsUserLoggedInQuery, IsUserLoggedInQueryVariables>(IsUserLoggedInDocument, options);
      }
export function useIsUserLoggedInLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsUserLoggedInQuery, IsUserLoggedInQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsUserLoggedInQuery, IsUserLoggedInQueryVariables>(IsUserLoggedInDocument, options);
        }
export type IsUserLoggedInQueryHookResult = ReturnType<typeof useIsUserLoggedInQuery>;
export type IsUserLoggedInLazyQueryHookResult = ReturnType<typeof useIsUserLoggedInLazyQuery>;
export type IsUserLoggedInQueryResult = Apollo.QueryResult<IsUserLoggedInQuery, IsUserLoggedInQueryVariables>;
export const CheckIfCredsMatchesDocument = gql`
    mutation CheckIfCredsMatches($accountNumber: String!, $password: String!) {
  checkIfCredsMatches(accountNumber: $accountNumber, password: $password) {
    data
    errors {
      message
    }
    success
  }
}
    `;
export type CheckIfCredsMatchesMutationFn = Apollo.MutationFunction<CheckIfCredsMatchesMutation, CheckIfCredsMatchesMutationVariables>;

/**
 * __useCheckIfCredsMatchesMutation__
 *
 * To run a mutation, you first call `useCheckIfCredsMatchesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckIfCredsMatchesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkIfCredsMatchesMutation, { data, loading, error }] = useCheckIfCredsMatchesMutation({
 *   variables: {
 *      accountNumber: // value for 'accountNumber'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCheckIfCredsMatchesMutation(baseOptions?: Apollo.MutationHookOptions<CheckIfCredsMatchesMutation, CheckIfCredsMatchesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CheckIfCredsMatchesMutation, CheckIfCredsMatchesMutationVariables>(CheckIfCredsMatchesDocument, options);
      }
export type CheckIfCredsMatchesMutationHookResult = ReturnType<typeof useCheckIfCredsMatchesMutation>;
export type CheckIfCredsMatchesMutationResult = Apollo.MutationResult<CheckIfCredsMatchesMutation>;
export type CheckIfCredsMatchesMutationOptions = Apollo.BaseMutationOptions<CheckIfCredsMatchesMutation, CheckIfCredsMatchesMutationVariables>;
export const CheckIfTotpMatchesDocument = gql`
    mutation CheckIfTOTPMatches($accountNumber: String!, $password: String!, $totpToken: String!) {
  checkIfTOTPMatches(
    accountNumber: $accountNumber
    password: $password
    totpToken: $totpToken
  ) {
    data
    errors {
      message
    }
    success
  }
}
    `;
export type CheckIfTotpMatchesMutationFn = Apollo.MutationFunction<CheckIfTotpMatchesMutation, CheckIfTotpMatchesMutationVariables>;

/**
 * __useCheckIfTotpMatchesMutation__
 *
 * To run a mutation, you first call `useCheckIfTotpMatchesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckIfTotpMatchesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkIfTotpMatchesMutation, { data, loading, error }] = useCheckIfTotpMatchesMutation({
 *   variables: {
 *      accountNumber: // value for 'accountNumber'
 *      password: // value for 'password'
 *      totpToken: // value for 'totpToken'
 *   },
 * });
 */
export function useCheckIfTotpMatchesMutation(baseOptions?: Apollo.MutationHookOptions<CheckIfTotpMatchesMutation, CheckIfTotpMatchesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CheckIfTotpMatchesMutation, CheckIfTotpMatchesMutationVariables>(CheckIfTotpMatchesDocument, options);
      }
export type CheckIfTotpMatchesMutationHookResult = ReturnType<typeof useCheckIfTotpMatchesMutation>;
export type CheckIfTotpMatchesMutationResult = Apollo.MutationResult<CheckIfTotpMatchesMutation>;
export type CheckIfTotpMatchesMutationOptions = Apollo.BaseMutationOptions<CheckIfTotpMatchesMutation, CheckIfTotpMatchesMutationVariables>;