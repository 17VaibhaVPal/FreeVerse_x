import { graphql } from "@/gql";

export const createTweetMutation = graphql(`
  #graphql

  mutation CreateTweet($payload: CreateTweetData!) {
    createTweet(payload: $payload) {
      id
    }
  }
`);

//added new 
export const likeTweetMutation = graphql(`
  mutation LikeTweet($tweetId: ID!) {
    likeTweet(tweetId: $tweetId)
  }
`);

export const unlikeTweetMutation = graphql(`
  mutation UnlikeTweet($tweetId: ID!) {
    unlikeTweet(tweetId: $tweetId)
  }
`);

//added new 2 
export const createCommentMutation = graphql(`
  mutation CreateComment($tweetId: ID!, $content: String!) {
    createComment(tweetId: $tweetId, content: $content) {
      id
      content
      createdAt
      user {
        id
        firstName
        lastName
        profileImageURL
      }
    }
  }
`);
