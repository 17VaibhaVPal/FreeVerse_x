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
      tweets{
      id
      content
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
    tweets: {
      id: string;
      content: string;
      
    }[];
  };
}

export const useCurrentUser = () => {
  const query = useQuery({
    queryKey: ["current-user"],
    queryFn: () =>
      getGraphqlClient().request<GetCurrentUserResponse>(getCurrentUserQuery),
  });
  return { ...query, user: query.data?.getCurrentUser };
};

