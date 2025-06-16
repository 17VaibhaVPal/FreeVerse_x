import { getGraphqlClient } from "@/clients/api";

import { CreateTweetData } from "@/gql/graphql";
import { createTweetMutation } from "@/graphql/mutations/tweet";
import { getAllTweetsQuery } from "@/graphql/query/tweet";


import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";



export const useCreateTweet = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: CreateTweetData) =>
      getGraphqlClient().request(createTweetMutation , { payload }),
    onMutate: () => {
        toast.loading("Creating Tweet...");
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["all-tweets"] });
        toast.dismiss();  
        toast.success("Tweet Created successfully ");
      },
      onError: (error) => {
        toast.dismiss();
        console.error("Error creating tweet:", error);
        toast.error("Failed to create tweet");
      },
     
    
  });

  return mutation;
};

export const useGetAllTweets = () => {
  const query = useQuery({
    queryKey: ["all-tweets"],
    queryFn: () => getGraphqlClient().request(getAllTweetsQuery),
  });
  return { ...query, tweets: query.data?.getAllTweets };
};
