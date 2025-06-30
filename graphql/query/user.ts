  import { graphql } from "../../gql";

  export const verifyUserGoogleTokenQuery = graphql(
    `
      #graphql
      query VerifyUserGoogleToken($token: String!) {
        verifyGoogleToken(token: $token)
      }
    `
  );

  export const getCurrentUserQuery = graphql(`
    query GetCurrentUser {
      getCurrentUser {
        id
        profileImageURL
        email
        firstName
        lastName
        recommendedUser {
          id
          email
          firstName
          lastName
          profileImageURL
        }

        followers {
          id
          firstName
          lastName
          profileImageURL
            email  
        }

        following {
          id
          firstName
          lastName
          profileImageURL
        }
        tweets {
          content
          id
           isLiked         
        likesCount  

          author {
            id
            firstName
            lastName
            profileImageURL
          }
        }
      }
    }
  `);

  export const getUserByIdQuery = graphql(`
    #graphql
    query GetUserById($id: ID!) {
      getUserById(id: $id) {
        id
        firstName
        lastName
        email
        profileImageURL
        followers {
          firstName
          lastName
          profileImageURL
        }

        following {
          firstName
          lastName
          profileImageURL
        }
        tweets {
          content
          id
          isBookmarked

            isLiked           
            likesCount 

          author {
            id
            firstName
            lastName
            profileImageURL
          }
        }
      }
    }
  `);

  export const getBookmarkedTweetsQuery = graphql(`
    #graphql
    query GetBookmarkedTweets {
      getBookmarkedTweets {
        id
        content
        imageURL
        isBookmarked

          isLiked          
         likesCount   

        author {
          id
          firstName
          lastName
          profileImageURL
          followers { id }
          following { id }
          tweets { id }
        }
      }
    }
  `);

  export const getMessagesWithUserQuery = graphql(`
  query GetMessagesWithUser($to: ID!) {
    getMessagesWithUser(to: $to) {
      id
      content
      createdAt
      from {
        id
        firstName
        lastName
        profileImageURL
      }
      to {
        id
        firstName
        lastName
        profileImageURL
      }
    }
  }
`);

export const getConversationsQuery = graphql(`
  query GetConversations {
    getConversations {
      id
      firstName
      lastName
      email
      profileImageURL
      lastMessageTimestamp
      unreadCount
    }
  }
`);