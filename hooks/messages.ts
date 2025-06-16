import { getGraphqlClient } from "@/clients/api";
import { useQuery } from "@tanstack/react-query";
import { getMessagesWithUserQuery } from "@/graphql/query/user";
import { GetMessagesWithUserQuery } from "@/gql/graphql";


interface Message {
  id: string;
  content: string;
  from: {
    id: string;
    firstName: string;
    lastName: string;
    profileImageURL: string;
  };
  to: {
    id: string;
    firstName: string;
    lastName: string;
    profileImageURL: string;
  };
}

interface GetMessagesResponse {
  getMessagesWithUser: Message[];
}


export const useMessages = (to: string) =>
  useQuery<GetMessagesWithUserQuery>({
    queryKey: ["messages", to],
    queryFn: () =>
      getGraphqlClient().request(getMessagesWithUserQuery, {
        to,
      }),
    enabled: Boolean(to),
  });
