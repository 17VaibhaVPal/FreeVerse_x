import { graphql } from "@/gql";
export const getAllTweetsQuery = graphql(`
  #graphql

  query GetAllTweets {
    getAllTweets {
      id
      content
      imageURL
      isBookmarked

      isLiked        
      likesCount      

      commentsCount   
      comments {       
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

      author {
        id
        firstName
        lastName
        profileImageURL
      }
    }
  }
`);

export const getSignedURLForTweetQuery = graphql(`
  query GetSignedURL($imageName: String!, $imageType: String!) {
    getSignedURLForTweet(imageName: $imageName, imageType: $imageType)
  }
`);

//added new 

export const getCommentsQuery = graphql(`
  query GetComments($tweetId: ID!) {
    getComments(tweetId: $tweetId) {
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
