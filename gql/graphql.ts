/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
};

export type Comment = {
  __typename?: 'Comment';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  user: User;
};

export type CreateTweetData = {
  content: Scalars['String']['input'];
  imageURL?: InputMaybe<Scalars['String']['input']>;
};

export type Message = {
  __typename?: 'Message';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  from: User;
  id: Scalars['ID']['output'];
  to: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  bookmarkTweet?: Maybe<Scalars['Boolean']['output']>;
  createAccount: Scalars['String']['output'];
  createComment: Comment;
  createTweet?: Maybe<Tweet>;
  followUser?: Maybe<Scalars['Boolean']['output']>;
  likeTweet?: Maybe<Scalars['Boolean']['output']>;
  loginWithEmail?: Maybe<Scalars['String']['output']>;
  markMessagesAsRead?: Maybe<Scalars['Boolean']['output']>;
  removeBookmark?: Maybe<Scalars['Boolean']['output']>;
  sendMessage?: Maybe<Scalars['Boolean']['output']>;
  unfollowUser?: Maybe<Scalars['Boolean']['output']>;
  unlikeTweet?: Maybe<Scalars['Boolean']['output']>;
};


export type MutationBookmarkTweetArgs = {
  tweetId: Scalars['ID']['input'];
};


export type MutationCreateAccountArgs = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationCreateCommentArgs = {
  content: Scalars['String']['input'];
  tweetId: Scalars['ID']['input'];
};


export type MutationCreateTweetArgs = {
  payload: CreateTweetData;
};


export type MutationFollowUserArgs = {
  to: Scalars['ID']['input'];
};


export type MutationLikeTweetArgs = {
  tweetId: Scalars['ID']['input'];
};


export type MutationLoginWithEmailArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationMarkMessagesAsReadArgs = {
  fromId: Scalars['ID']['input'];
};


export type MutationRemoveBookmarkArgs = {
  tweetId: Scalars['ID']['input'];
};


export type MutationSendMessageArgs = {
  content: Scalars['String']['input'];
  to: Scalars['ID']['input'];
};


export type MutationUnfollowUserArgs = {
  to: Scalars['ID']['input'];
};


export type MutationUnlikeTweetArgs = {
  tweetId: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAllTweets?: Maybe<Array<Maybe<Tweet>>>;
  getBookmarkedTweets: Array<Tweet>;
  getComments: Array<Comment>;
  getConversations: Array<User>;
  getCurrentUser?: Maybe<User>;
  getMessagesWithUser: Array<Message>;
  getSignedURLForTweet?: Maybe<Scalars['String']['output']>;
  getUserById?: Maybe<User>;
  users: Array<User>;
  verifyGoogleToken?: Maybe<Scalars['String']['output']>;
};


export type QueryGetCommentsArgs = {
  tweetId: Scalars['ID']['input'];
};


export type QueryGetMessagesWithUserArgs = {
  to: Scalars['ID']['input'];
};


export type QueryGetSignedUrlForTweetArgs = {
  imageName: Scalars['String']['input'];
  imageType: Scalars['String']['input'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryVerifyGoogleTokenArgs = {
  token: Scalars['String']['input'];
};

export type Tweet = {
  __typename?: 'Tweet';
  author?: Maybe<User>;
  comments?: Maybe<Array<Comment>>;
  commentsCount?: Maybe<Scalars['Int']['output']>;
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  imageURL?: Maybe<Scalars['String']['output']>;
  isBookmarked?: Maybe<Scalars['Boolean']['output']>;
  isLiked?: Maybe<Scalars['Boolean']['output']>;
  likesCount?: Maybe<Scalars['Int']['output']>;
};

export type User = {
  __typename?: 'User';
  bookmarkedTweets: Array<Tweet>;
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  followers: Array<User>;
  following: Array<User>;
  id: Scalars['ID']['output'];
  lastMessageTimestamp?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  profileImageURL?: Maybe<Scalars['String']['output']>;
  recommendedUser: Array<User>;
  tweets: Array<Tweet>;
  unreadCount?: Maybe<Scalars['Int']['output']>;
};

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, firstName: string, lastName?: string | null, email: string }> };

export type CreateTweetMutationVariables = Exact<{
  payload: CreateTweetData;
}>;


export type CreateTweetMutation = { __typename?: 'Mutation', createTweet?: { __typename?: 'Tweet', id: string } | null };

export type LikeTweetMutationVariables = Exact<{
  tweetId: Scalars['ID']['input'];
}>;


export type LikeTweetMutation = { __typename?: 'Mutation', likeTweet?: boolean | null };

export type UnlikeTweetMutationVariables = Exact<{
  tweetId: Scalars['ID']['input'];
}>;


export type UnlikeTweetMutation = { __typename?: 'Mutation', unlikeTweet?: boolean | null };

export type CreateCommentMutationVariables = Exact<{
  tweetId: Scalars['ID']['input'];
  content: Scalars['String']['input'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', id: string, content: string, createdAt: any, user: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, profileImageURL?: string | null } } };

export type FollowUserMutationVariables = Exact<{
  to: Scalars['ID']['input'];
}>;


export type FollowUserMutation = { __typename?: 'Mutation', followUser?: boolean | null };

export type UnfollowUserMutationVariables = Exact<{
  to: Scalars['ID']['input'];
}>;


export type UnfollowUserMutation = { __typename?: 'Mutation', unfollowUser?: boolean | null };

export type BookmarkTweetMutationVariables = Exact<{
  tweetId: Scalars['ID']['input'];
}>;


export type BookmarkTweetMutation = { __typename?: 'Mutation', bookmarkTweet?: boolean | null };

export type RemoveBookmarkMutationVariables = Exact<{
  tweetId: Scalars['ID']['input'];
}>;


export type RemoveBookmarkMutation = { __typename?: 'Mutation', removeBookmark?: boolean | null };

export type CreateAccountMutationVariables = Exact<{
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount: string };

export type SendMessageMutationVariables = Exact<{
  to: Scalars['ID']['input'];
  content: Scalars['String']['input'];
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage?: boolean | null };

export type GetAllTweetsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTweetsQuery = { __typename?: 'Query', getAllTweets?: Array<{ __typename?: 'Tweet', id: string, content: string, imageURL?: string | null, isBookmarked?: boolean | null, isLiked?: boolean | null, likesCount?: number | null, commentsCount?: number | null, comments?: Array<{ __typename?: 'Comment', id: string, content: string, createdAt: any, user: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, profileImageURL?: string | null } }> | null, author?: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, profileImageURL?: string | null } | null } | null> | null };

export type GetSignedUrlQueryVariables = Exact<{
  imageName: Scalars['String']['input'];
  imageType: Scalars['String']['input'];
}>;


export type GetSignedUrlQuery = { __typename?: 'Query', getSignedURLForTweet?: string | null };

export type GetCommentsQueryVariables = Exact<{
  tweetId: Scalars['ID']['input'];
}>;


export type GetCommentsQuery = { __typename?: 'Query', getComments: Array<{ __typename?: 'Comment', id: string, content: string, createdAt: any, user: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, profileImageURL?: string | null } }> };

export type VerifyUserGoogleTokenQueryVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type VerifyUserGoogleTokenQuery = { __typename?: 'Query', verifyGoogleToken?: string | null };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser?: { __typename?: 'User', id: string, profileImageURL?: string | null, email: string, firstName: string, lastName?: string | null, recommendedUser: Array<{ __typename?: 'User', id: string, email: string, firstName: string, lastName?: string | null, profileImageURL?: string | null }>, followers: Array<{ __typename?: 'User', id: string, firstName: string, lastName?: string | null, profileImageURL?: string | null, email: string }>, following: Array<{ __typename?: 'User', id: string, firstName: string, lastName?: string | null, profileImageURL?: string | null }>, tweets: Array<{ __typename?: 'Tweet', content: string, id: string, isLiked?: boolean | null, likesCount?: number | null, author?: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, profileImageURL?: string | null } | null }> } | null };

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', getUserById?: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, email: string, profileImageURL?: string | null, followers: Array<{ __typename?: 'User', firstName: string, lastName?: string | null, profileImageURL?: string | null }>, following: Array<{ __typename?: 'User', firstName: string, lastName?: string | null, profileImageURL?: string | null }>, tweets: Array<{ __typename?: 'Tweet', content: string, id: string, isBookmarked?: boolean | null, isLiked?: boolean | null, likesCount?: number | null, author?: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, profileImageURL?: string | null } | null }> } | null };

export type GetBookmarkedTweetsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBookmarkedTweetsQuery = { __typename?: 'Query', getBookmarkedTweets: Array<{ __typename?: 'Tweet', id: string, content: string, imageURL?: string | null, isBookmarked?: boolean | null, isLiked?: boolean | null, likesCount?: number | null, author?: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, profileImageURL?: string | null, followers: Array<{ __typename?: 'User', id: string }>, following: Array<{ __typename?: 'User', id: string }>, tweets: Array<{ __typename?: 'Tweet', id: string }> } | null }> };

export type GetMessagesWithUserQueryVariables = Exact<{
  to: Scalars['ID']['input'];
}>;


export type GetMessagesWithUserQuery = { __typename?: 'Query', getMessagesWithUser: Array<{ __typename?: 'Message', id: string, content: string, createdAt: any, from: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, profileImageURL?: string | null }, to: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, profileImageURL?: string | null } }> };

export type GetConversationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetConversationsQuery = { __typename?: 'Query', getConversations: Array<{ __typename?: 'User', id: string, firstName: string, lastName?: string | null, email: string, profileImageURL?: string | null, lastMessageTimestamp?: string | null, unreadCount?: number | null }> };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', loginWithEmail?: string | null };

export type MarkMessagesAsReadMutationVariables = Exact<{
  fromId: Scalars['ID']['input'];
}>;


export type MarkMessagesAsReadMutation = { __typename?: 'Mutation', markMessagesAsRead?: boolean | null };


export const UsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;
export const CreateTweetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTweet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTweetData"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTweet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateTweetMutation, CreateTweetMutationVariables>;
export const LikeTweetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LikeTweet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likeTweet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tweetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}}}]}]}}]} as unknown as DocumentNode<LikeTweetMutation, LikeTweetMutationVariables>;
export const UnlikeTweetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UnlikeTweet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unlikeTweet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tweetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}}}]}]}}]} as unknown as DocumentNode<UnlikeTweetMutation, UnlikeTweetMutationVariables>;
export const CreateCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tweetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}}},{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}}]}}]}}]} as unknown as DocumentNode<CreateCommentMutation, CreateCommentMutationVariables>;
export const FollowUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"FollowUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"to"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"followUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"to"},"value":{"kind":"Variable","name":{"kind":"Name","value":"to"}}}]}]}}]} as unknown as DocumentNode<FollowUserMutation, FollowUserMutationVariables>;
export const UnfollowUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UnfollowUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"to"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unfollowUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"to"},"value":{"kind":"Variable","name":{"kind":"Name","value":"to"}}}]}]}}]} as unknown as DocumentNode<UnfollowUserMutation, UnfollowUserMutationVariables>;
export const BookmarkTweetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"BookmarkTweet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookmarkTweet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tweetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}}}]}]}}]} as unknown as DocumentNode<BookmarkTweetMutation, BookmarkTweetMutationVariables>;
export const RemoveBookmarkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveBookmark"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeBookmark"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tweetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}}}]}]}}]} as unknown as DocumentNode<RemoveBookmarkMutation, RemoveBookmarkMutationVariables>;
export const CreateAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"firstName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}}},{"kind":"Argument","name":{"kind":"Name","value":"lastName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<CreateAccountMutation, CreateAccountMutationVariables>;
export const SendMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"to"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"to"},"value":{"kind":"Variable","name":{"kind":"Name","value":"to"}}},{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}]}]}}]} as unknown as DocumentNode<SendMessageMutation, SendMessageMutationVariables>;
export const GetAllTweetsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllTweets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllTweets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"imageURL"}},{"kind":"Field","name":{"kind":"Name","value":"isBookmarked"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllTweetsQuery, GetAllTweetsQueryVariables>;
export const GetSignedUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSignedURL"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"imageName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"imageType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSignedURLForTweet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"imageName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"imageName"}}},{"kind":"Argument","name":{"kind":"Name","value":"imageType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"imageType"}}}]}]}}]} as unknown as DocumentNode<GetSignedUrlQuery, GetSignedUrlQueryVariables>;
export const GetCommentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetComments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getComments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tweetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tweetId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}}]}}]}}]} as unknown as DocumentNode<GetCommentsQuery, GetCommentsQueryVariables>;
export const VerifyUserGoogleTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VerifyUserGoogleToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyGoogleToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}]}]}}]} as unknown as DocumentNode<VerifyUserGoogleTokenQuery, VerifyUserGoogleTokenQueryVariables>;
export const GetCurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"recommendedUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"following"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tweets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetUserByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}},{"kind":"Field","name":{"kind":"Name","value":"followers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"following"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tweets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isBookmarked"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetUserByIdQuery, GetUserByIdQueryVariables>;
export const GetBookmarkedTweetsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBookmarkedTweets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBookmarkedTweets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"imageURL"}},{"kind":"Field","name":{"kind":"Name","value":"isBookmarked"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}},{"kind":"Field","name":{"kind":"Name","value":"followers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"following"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tweets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetBookmarkedTweetsQuery, GetBookmarkedTweetsQueryVariables>;
export const GetMessagesWithUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMessagesWithUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"to"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMessagesWithUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"to"},"value":{"kind":"Variable","name":{"kind":"Name","value":"to"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}}]}}]}}]} as unknown as DocumentNode<GetMessagesWithUserQuery, GetMessagesWithUserQueryVariables>;
export const GetConversationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetConversations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getConversations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}},{"kind":"Field","name":{"kind":"Name","value":"lastMessageTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"unreadCount"}}]}}]}}]} as unknown as DocumentNode<GetConversationsQuery, GetConversationsQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginWithEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const MarkMessagesAsReadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MarkMessagesAsRead"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fromId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"markMessagesAsRead"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fromId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fromId"}}}]}]}}]} as unknown as DocumentNode<MarkMessagesAsReadMutation, MarkMessagesAsReadMutationVariables>;