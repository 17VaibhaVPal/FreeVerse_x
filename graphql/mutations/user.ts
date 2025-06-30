import { graphql } from "@/gql";

export const followUserMutation = graphql(`
  #graphql
  mutation FollowUser($to: ID!) {
    followUser(to: $to)
  }
`);

export const unfollowUserMutation = graphql(`
  #graphql
  mutation UnfollowUser($to: ID!) {
    unfollowUser(to: $to)
  }
`);

export const bookmarkTweetMutation = graphql(`
   #graphql
  mutation BookmarkTweet($tweetId: ID!) {
    bookmarkTweet(tweetId: $tweetId)
  }
`);

export const removeBookmarkMutation = graphql(`
   #graphql
  mutation RemoveBookmark($tweetId: ID!) {
    removeBookmark(tweetId: $tweetId)
  }
`);

export const createAccountMutation = graphql(`
  mutation CreateAccount(
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
  ) {
    createAccount(
      email: $email
      firstName: $firstName
      lastName: $lastName
      password: $password
    )
  }
`);

export const sendMessageMutation = graphql(`
  mutation SendMessage($to: ID!, $content: String!) {
    sendMessage(to: $to, content: $content)
  }
`);



