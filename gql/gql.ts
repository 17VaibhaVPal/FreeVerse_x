/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query Users {\n    users {\n      id\n      firstName\n      lastName\n      email\n    }\n  }\n": typeof types.UsersDocument,
    "\n  #graphql\n\n  mutation CreateTweet($payload: CreateTweetData!) {\n    createTweet(payload: $payload) {\n      id\n    }\n  }\n": typeof types.CreateTweetDocument,
    "\n  mutation LikeTweet($tweetId: ID!) {\n    likeTweet(tweetId: $tweetId)\n  }\n": typeof types.LikeTweetDocument,
    "\n  mutation UnlikeTweet($tweetId: ID!) {\n    unlikeTweet(tweetId: $tweetId)\n  }\n": typeof types.UnlikeTweetDocument,
    "\n  mutation CreateComment($tweetId: ID!, $content: String!) {\n    createComment(tweetId: $tweetId, content: $content) {\n      id\n      content\n      createdAt\n      user {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n    }\n  }\n": typeof types.CreateCommentDocument,
    "\n  #graphql\n  mutation FollowUser($to: ID!) {\n    followUser(to: $to)\n  }\n": typeof types.FollowUserDocument,
    "\n  #graphql\n  mutation UnfollowUser($to: ID!) {\n    unfollowUser(to: $to)\n  }\n": typeof types.UnfollowUserDocument,
    "\n   #graphql\n  mutation BookmarkTweet($tweetId: ID!) {\n    bookmarkTweet(tweetId: $tweetId)\n  }\n": typeof types.BookmarkTweetDocument,
    "\n   #graphql\n  mutation RemoveBookmark($tweetId: ID!) {\n    removeBookmark(tweetId: $tweetId)\n  }\n": typeof types.RemoveBookmarkDocument,
    "\n  mutation CreateAccount(\n    $email: String!\n    $firstName: String!\n    $lastName: String!\n    $password: String!\n  ) {\n    createAccount(\n      email: $email\n      firstName: $firstName\n      lastName: $lastName\n      password: $password\n    )\n  }\n": typeof types.CreateAccountDocument,
    "\n  mutation SendMessage($to: ID!, $content: String!) {\n    sendMessage(to: $to, content: $content)\n  }\n": typeof types.SendMessageDocument,
    "\n  #graphql\n\n  query GetAllTweets {\n    getAllTweets {\n      id\n      content\n      imageURL\n      isBookmarked\n\n      isLiked        \n      likesCount      \n\n      commentsCount   \n      comments {       \n        id\n        content\n        createdAt\n        user {\n          id\n          firstName\n          lastName\n          profileImageURL\n        }\n      }\n\n      author {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n    }\n  }\n": typeof types.GetAllTweetsDocument,
    "\n  query GetSignedURL($imageName: String!, $imageType: String!) {\n    getSignedURLForTweet(imageName: $imageName, imageType: $imageType)\n  }\n": typeof types.GetSignedUrlDocument,
    "\n  query GetComments($tweetId: ID!) {\n    getComments(tweetId: $tweetId) {\n      id\n      content\n      createdAt\n      user {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n    }\n  }\n": typeof types.GetCommentsDocument,
    "\n      #graphql\n      query VerifyUserGoogleToken($token: String!) {\n        verifyGoogleToken(token: $token)\n      }\n    ": typeof types.VerifyUserGoogleTokenDocument,
    "\n    query GetCurrentUser {\n      getCurrentUser {\n        id\n        profileImageURL\n        email\n        firstName\n        lastName\n        recommendedUser {\n          id\n          email\n          firstName\n          lastName\n          profileImageURL\n        }\n\n        followers {\n          id\n          firstName\n          lastName\n          profileImageURL\n            email  \n        }\n\n        following {\n          id\n          firstName\n          lastName\n          profileImageURL\n        }\n        tweets {\n          content\n          id\n           isLiked         \n        likesCount  \n\n          author {\n            id\n            firstName\n            lastName\n            profileImageURL\n          }\n        }\n      }\n    }\n  ": typeof types.GetCurrentUserDocument,
    "\n    #graphql\n    query GetUserById($id: ID!) {\n      getUserById(id: $id) {\n        id\n        firstName\n        lastName\n        email\n        profileImageURL\n        followers {\n          firstName\n          lastName\n          profileImageURL\n        }\n\n        following {\n          firstName\n          lastName\n          profileImageURL\n        }\n        tweets {\n          content\n          id\n          isBookmarked\n\n            isLiked           \n            likesCount \n\n          author {\n            id\n            firstName\n            lastName\n            profileImageURL\n          }\n        }\n      }\n    }\n  ": typeof types.GetUserByIdDocument,
    "\n    #graphql\n    query GetBookmarkedTweets {\n      getBookmarkedTweets {\n        id\n        content\n        imageURL\n        isBookmarked\n\n          isLiked          \n         likesCount   \n\n        author {\n          id\n          firstName\n          lastName\n          profileImageURL\n          followers { id }\n          following { id }\n          tweets { id }\n        }\n      }\n    }\n  ": typeof types.GetBookmarkedTweetsDocument,
    "\n  query GetMessagesWithUser($to: ID!) {\n    getMessagesWithUser(to: $to) {\n      id\n      content\n      createdAt\n      from {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n      to {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n    }\n  }\n": typeof types.GetMessagesWithUserDocument,
    "\n  query GetConversations {\n    getConversations {\n      id\n      firstName\n      lastName\n      email\n      profileImageURL\n      lastMessageTimestamp\n      unreadCount\n    }\n  }\n": typeof types.GetConversationsDocument,
    "\n  mutation Login($email: String!, $password: String!) {\n    loginWithEmail(email: $email, password: $password)\n  }\n": typeof types.LoginDocument,
    "\n  mutation MarkMessagesAsRead($fromId: ID!) {\n    markMessagesAsRead(fromId: $fromId)\n  }\n": typeof types.MarkMessagesAsReadDocument,
};
const documents: Documents = {
    "\n  query Users {\n    users {\n      id\n      firstName\n      lastName\n      email\n    }\n  }\n": types.UsersDocument,
    "\n  #graphql\n\n  mutation CreateTweet($payload: CreateTweetData!) {\n    createTweet(payload: $payload) {\n      id\n    }\n  }\n": types.CreateTweetDocument,
    "\n  mutation LikeTweet($tweetId: ID!) {\n    likeTweet(tweetId: $tweetId)\n  }\n": types.LikeTweetDocument,
    "\n  mutation UnlikeTweet($tweetId: ID!) {\n    unlikeTweet(tweetId: $tweetId)\n  }\n": types.UnlikeTweetDocument,
    "\n  mutation CreateComment($tweetId: ID!, $content: String!) {\n    createComment(tweetId: $tweetId, content: $content) {\n      id\n      content\n      createdAt\n      user {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n    }\n  }\n": types.CreateCommentDocument,
    "\n  #graphql\n  mutation FollowUser($to: ID!) {\n    followUser(to: $to)\n  }\n": types.FollowUserDocument,
    "\n  #graphql\n  mutation UnfollowUser($to: ID!) {\n    unfollowUser(to: $to)\n  }\n": types.UnfollowUserDocument,
    "\n   #graphql\n  mutation BookmarkTweet($tweetId: ID!) {\n    bookmarkTweet(tweetId: $tweetId)\n  }\n": types.BookmarkTweetDocument,
    "\n   #graphql\n  mutation RemoveBookmark($tweetId: ID!) {\n    removeBookmark(tweetId: $tweetId)\n  }\n": types.RemoveBookmarkDocument,
    "\n  mutation CreateAccount(\n    $email: String!\n    $firstName: String!\n    $lastName: String!\n    $password: String!\n  ) {\n    createAccount(\n      email: $email\n      firstName: $firstName\n      lastName: $lastName\n      password: $password\n    )\n  }\n": types.CreateAccountDocument,
    "\n  mutation SendMessage($to: ID!, $content: String!) {\n    sendMessage(to: $to, content: $content)\n  }\n": types.SendMessageDocument,
    "\n  #graphql\n\n  query GetAllTweets {\n    getAllTweets {\n      id\n      content\n      imageURL\n      isBookmarked\n\n      isLiked        \n      likesCount      \n\n      commentsCount   \n      comments {       \n        id\n        content\n        createdAt\n        user {\n          id\n          firstName\n          lastName\n          profileImageURL\n        }\n      }\n\n      author {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n    }\n  }\n": types.GetAllTweetsDocument,
    "\n  query GetSignedURL($imageName: String!, $imageType: String!) {\n    getSignedURLForTweet(imageName: $imageName, imageType: $imageType)\n  }\n": types.GetSignedUrlDocument,
    "\n  query GetComments($tweetId: ID!) {\n    getComments(tweetId: $tweetId) {\n      id\n      content\n      createdAt\n      user {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n    }\n  }\n": types.GetCommentsDocument,
    "\n      #graphql\n      query VerifyUserGoogleToken($token: String!) {\n        verifyGoogleToken(token: $token)\n      }\n    ": types.VerifyUserGoogleTokenDocument,
    "\n    query GetCurrentUser {\n      getCurrentUser {\n        id\n        profileImageURL\n        email\n        firstName\n        lastName\n        recommendedUser {\n          id\n          email\n          firstName\n          lastName\n          profileImageURL\n        }\n\n        followers {\n          id\n          firstName\n          lastName\n          profileImageURL\n            email  \n        }\n\n        following {\n          id\n          firstName\n          lastName\n          profileImageURL\n        }\n        tweets {\n          content\n          id\n           isLiked         \n        likesCount  \n\n          author {\n            id\n            firstName\n            lastName\n            profileImageURL\n          }\n        }\n      }\n    }\n  ": types.GetCurrentUserDocument,
    "\n    #graphql\n    query GetUserById($id: ID!) {\n      getUserById(id: $id) {\n        id\n        firstName\n        lastName\n        email\n        profileImageURL\n        followers {\n          firstName\n          lastName\n          profileImageURL\n        }\n\n        following {\n          firstName\n          lastName\n          profileImageURL\n        }\n        tweets {\n          content\n          id\n          isBookmarked\n\n            isLiked           \n            likesCount \n\n          author {\n            id\n            firstName\n            lastName\n            profileImageURL\n          }\n        }\n      }\n    }\n  ": types.GetUserByIdDocument,
    "\n    #graphql\n    query GetBookmarkedTweets {\n      getBookmarkedTweets {\n        id\n        content\n        imageURL\n        isBookmarked\n\n          isLiked          \n         likesCount   \n\n        author {\n          id\n          firstName\n          lastName\n          profileImageURL\n          followers { id }\n          following { id }\n          tweets { id }\n        }\n      }\n    }\n  ": types.GetBookmarkedTweetsDocument,
    "\n  query GetMessagesWithUser($to: ID!) {\n    getMessagesWithUser(to: $to) {\n      id\n      content\n      createdAt\n      from {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n      to {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n    }\n  }\n": types.GetMessagesWithUserDocument,
    "\n  query GetConversations {\n    getConversations {\n      id\n      firstName\n      lastName\n      email\n      profileImageURL\n      lastMessageTimestamp\n      unreadCount\n    }\n  }\n": types.GetConversationsDocument,
    "\n  mutation Login($email: String!, $password: String!) {\n    loginWithEmail(email: $email, password: $password)\n  }\n": types.LoginDocument,
    "\n  mutation MarkMessagesAsRead($fromId: ID!) {\n    markMessagesAsRead(fromId: $fromId)\n  }\n": types.MarkMessagesAsReadDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Users {\n    users {\n      id\n      firstName\n      lastName\n      email\n    }\n  }\n"): (typeof documents)["\n  query Users {\n    users {\n      id\n      firstName\n      lastName\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n\n  mutation CreateTweet($payload: CreateTweetData!) {\n    createTweet(payload: $payload) {\n      id\n    }\n  }\n"): (typeof documents)["\n  #graphql\n\n  mutation CreateTweet($payload: CreateTweetData!) {\n    createTweet(payload: $payload) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LikeTweet($tweetId: ID!) {\n    likeTweet(tweetId: $tweetId)\n  }\n"): (typeof documents)["\n  mutation LikeTweet($tweetId: ID!) {\n    likeTweet(tweetId: $tweetId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UnlikeTweet($tweetId: ID!) {\n    unlikeTweet(tweetId: $tweetId)\n  }\n"): (typeof documents)["\n  mutation UnlikeTweet($tweetId: ID!) {\n    unlikeTweet(tweetId: $tweetId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateComment($tweetId: ID!, $content: String!) {\n    createComment(tweetId: $tweetId, content: $content) {\n      id\n      content\n      createdAt\n      user {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateComment($tweetId: ID!, $content: String!) {\n    createComment(tweetId: $tweetId, content: $content) {\n      id\n      content\n      createdAt\n      user {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation FollowUser($to: ID!) {\n    followUser(to: $to)\n  }\n"): (typeof documents)["\n  #graphql\n  mutation FollowUser($to: ID!) {\n    followUser(to: $to)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation UnfollowUser($to: ID!) {\n    unfollowUser(to: $to)\n  }\n"): (typeof documents)["\n  #graphql\n  mutation UnfollowUser($to: ID!) {\n    unfollowUser(to: $to)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n   #graphql\n  mutation BookmarkTweet($tweetId: ID!) {\n    bookmarkTweet(tweetId: $tweetId)\n  }\n"): (typeof documents)["\n   #graphql\n  mutation BookmarkTweet($tweetId: ID!) {\n    bookmarkTweet(tweetId: $tweetId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n   #graphql\n  mutation RemoveBookmark($tweetId: ID!) {\n    removeBookmark(tweetId: $tweetId)\n  }\n"): (typeof documents)["\n   #graphql\n  mutation RemoveBookmark($tweetId: ID!) {\n    removeBookmark(tweetId: $tweetId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateAccount(\n    $email: String!\n    $firstName: String!\n    $lastName: String!\n    $password: String!\n  ) {\n    createAccount(\n      email: $email\n      firstName: $firstName\n      lastName: $lastName\n      password: $password\n    )\n  }\n"): (typeof documents)["\n  mutation CreateAccount(\n    $email: String!\n    $firstName: String!\n    $lastName: String!\n    $password: String!\n  ) {\n    createAccount(\n      email: $email\n      firstName: $firstName\n      lastName: $lastName\n      password: $password\n    )\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SendMessage($to: ID!, $content: String!) {\n    sendMessage(to: $to, content: $content)\n  }\n"): (typeof documents)["\n  mutation SendMessage($to: ID!, $content: String!) {\n    sendMessage(to: $to, content: $content)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n\n  query GetAllTweets {\n    getAllTweets {\n      id\n      content\n      imageURL\n      isBookmarked\n\n      isLiked        \n      likesCount      \n\n      commentsCount   \n      comments {       \n        id\n        content\n        createdAt\n        user {\n          id\n          firstName\n          lastName\n          profileImageURL\n        }\n      }\n\n      author {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n\n  query GetAllTweets {\n    getAllTweets {\n      id\n      content\n      imageURL\n      isBookmarked\n\n      isLiked        \n      likesCount      \n\n      commentsCount   \n      comments {       \n        id\n        content\n        createdAt\n        user {\n          id\n          firstName\n          lastName\n          profileImageURL\n        }\n      }\n\n      author {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetSignedURL($imageName: String!, $imageType: String!) {\n    getSignedURLForTweet(imageName: $imageName, imageType: $imageType)\n  }\n"): (typeof documents)["\n  query GetSignedURL($imageName: String!, $imageType: String!) {\n    getSignedURLForTweet(imageName: $imageName, imageType: $imageType)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetComments($tweetId: ID!) {\n    getComments(tweetId: $tweetId) {\n      id\n      content\n      createdAt\n      user {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetComments($tweetId: ID!) {\n    getComments(tweetId: $tweetId) {\n      id\n      content\n      createdAt\n      user {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      #graphql\n      query VerifyUserGoogleToken($token: String!) {\n        verifyGoogleToken(token: $token)\n      }\n    "): (typeof documents)["\n      #graphql\n      query VerifyUserGoogleToken($token: String!) {\n        verifyGoogleToken(token: $token)\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetCurrentUser {\n      getCurrentUser {\n        id\n        profileImageURL\n        email\n        firstName\n        lastName\n        recommendedUser {\n          id\n          email\n          firstName\n          lastName\n          profileImageURL\n        }\n\n        followers {\n          id\n          firstName\n          lastName\n          profileImageURL\n            email  \n        }\n\n        following {\n          id\n          firstName\n          lastName\n          profileImageURL\n        }\n        tweets {\n          content\n          id\n           isLiked         \n        likesCount  \n\n          author {\n            id\n            firstName\n            lastName\n            profileImageURL\n          }\n        }\n      }\n    }\n  "): (typeof documents)["\n    query GetCurrentUser {\n      getCurrentUser {\n        id\n        profileImageURL\n        email\n        firstName\n        lastName\n        recommendedUser {\n          id\n          email\n          firstName\n          lastName\n          profileImageURL\n        }\n\n        followers {\n          id\n          firstName\n          lastName\n          profileImageURL\n            email  \n        }\n\n        following {\n          id\n          firstName\n          lastName\n          profileImageURL\n        }\n        tweets {\n          content\n          id\n           isLiked         \n        likesCount  \n\n          author {\n            id\n            firstName\n            lastName\n            profileImageURL\n          }\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    query GetUserById($id: ID!) {\n      getUserById(id: $id) {\n        id\n        firstName\n        lastName\n        email\n        profileImageURL\n        followers {\n          firstName\n          lastName\n          profileImageURL\n        }\n\n        following {\n          firstName\n          lastName\n          profileImageURL\n        }\n        tweets {\n          content\n          id\n          isBookmarked\n\n            isLiked           \n            likesCount \n\n          author {\n            id\n            firstName\n            lastName\n            profileImageURL\n          }\n        }\n      }\n    }\n  "): (typeof documents)["\n    #graphql\n    query GetUserById($id: ID!) {\n      getUserById(id: $id) {\n        id\n        firstName\n        lastName\n        email\n        profileImageURL\n        followers {\n          firstName\n          lastName\n          profileImageURL\n        }\n\n        following {\n          firstName\n          lastName\n          profileImageURL\n        }\n        tweets {\n          content\n          id\n          isBookmarked\n\n            isLiked           \n            likesCount \n\n          author {\n            id\n            firstName\n            lastName\n            profileImageURL\n          }\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    query GetBookmarkedTweets {\n      getBookmarkedTweets {\n        id\n        content\n        imageURL\n        isBookmarked\n\n          isLiked          \n         likesCount   \n\n        author {\n          id\n          firstName\n          lastName\n          profileImageURL\n          followers { id }\n          following { id }\n          tweets { id }\n        }\n      }\n    }\n  "): (typeof documents)["\n    #graphql\n    query GetBookmarkedTweets {\n      getBookmarkedTweets {\n        id\n        content\n        imageURL\n        isBookmarked\n\n          isLiked          \n         likesCount   \n\n        author {\n          id\n          firstName\n          lastName\n          profileImageURL\n          followers { id }\n          following { id }\n          tweets { id }\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMessagesWithUser($to: ID!) {\n    getMessagesWithUser(to: $to) {\n      id\n      content\n      createdAt\n      from {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n      to {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetMessagesWithUser($to: ID!) {\n    getMessagesWithUser(to: $to) {\n      id\n      content\n      createdAt\n      from {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n      to {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetConversations {\n    getConversations {\n      id\n      firstName\n      lastName\n      email\n      profileImageURL\n      lastMessageTimestamp\n      unreadCount\n    }\n  }\n"): (typeof documents)["\n  query GetConversations {\n    getConversations {\n      id\n      firstName\n      lastName\n      email\n      profileImageURL\n      lastMessageTimestamp\n      unreadCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($email: String!, $password: String!) {\n    loginWithEmail(email: $email, password: $password)\n  }\n"): (typeof documents)["\n  mutation Login($email: String!, $password: String!) {\n    loginWithEmail(email: $email, password: $password)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation MarkMessagesAsRead($fromId: ID!) {\n    markMessagesAsRead(fromId: $fromId)\n  }\n"): (typeof documents)["\n  mutation MarkMessagesAsRead($fromId: ID!) {\n    markMessagesAsRead(fromId: $fromId)\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;