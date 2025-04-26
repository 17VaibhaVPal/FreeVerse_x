import { graphqlClient } from "@/clients/api"
import { useQuery } from "@tanstack/react-query"

//  Plain query
const getCurrentUserQuery = `
  query GetCurrentUser {
    getCurrentUser {
      id
      profileImageURL
      email
      firstName
      lastName
    }
  }
`

//  Define the expected shape
interface GetCurrentUserResponse {
  getCurrentUser: {
    id: string;
    profileImageURL: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export const useCurrentUser = () => {
    const query = useQuery({
        queryKey: ["current-user"],
        queryFn: () => graphqlClient.request<GetCurrentUserResponse>(getCurrentUserQuery)
    })
    return { ...query, user: query.data?.getCurrentUser }
}
