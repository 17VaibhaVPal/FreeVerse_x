import { getGraphqlClient } from "@/clients/api";
import { useQuery } from "@tanstack/react-query";

//  Plain query
const getCurrentUserQuery = `
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

      followers{
      id
      firstName
      lastName
      profileImageURL
      }
      following{
      id
      firstName
      lastName
      profileImageURL
      }
      tweets{
      id
      content
      isBookmarked
      author {
      id
      firstName
      lastName
      profileImageURL
      }
      }
      
      
    }
  }
`;

//  Define the expected shape
interface GetCurrentUserResponse {
  getCurrentUser: {
    id: string;
    profileImageURL: string;
    email: string;
    firstName: string;
    lastName: string;

    recommendedUser: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      profileImageURL: string;
    }[];
    followers: {
      id: string;
      firstName: string;
      lastName: string;
      profileImageURL: string;
    }[];
    following: {
      id: string;
      firstName: string;
      lastName: string;
      profileImageURL: string;
    }[];
    tweets: {
      id: string;
      content: string;
      isBookmarked: boolean
      author: {
        id: string;
        firstName: string;
        lastName: string;
        profileImageURL: string;
      };
    }[];
  };
}

export const useCurrentUser = () => {
  const query = useQuery({
    queryKey: ["current-user"],
    queryFn: () =>
      getGraphqlClient().request<GetCurrentUserResponse>(getCurrentUserQuery),
     staleTime: 0,
  });
  console.log("Running useCurrentUser, data:", query.data);
  return { ...query, user: query.data?.getCurrentUser };
};
