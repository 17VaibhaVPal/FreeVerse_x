import { getGraphqlClient } from "@/clients/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

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

      isLiked: boolean;      
  likesCount: number;  
    
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
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const localToken = localStorage.getItem("__twitter_token");
    setToken(localToken);
  }, []);

  const query = useQuery({
    queryKey: ["current-user", token], // include token in queryKey for refresh
    queryFn: () =>
      getGraphqlClient(token || undefined).request<GetCurrentUserResponse>(
        getCurrentUserQuery
      ),
    enabled: !!token,
    staleTime: 0,
  });

  if (query.error) {
    console.error("❌ useCurrentUser error:", query.error);
  }

  return { ...query, user: query.data?.getCurrentUser };
};


/*
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
*/
