import { getGraphqlClient } from "@/clients/api";
import { Comment, CreateCommentMutationVariables } from "@/gql/graphql";
import { CreateTweetData } from "@/gql/graphql";
import { createTweetMutation } from "@/graphql/mutations/tweet";
import { getAllTweetsQuery } from "@/graphql/query/tweet";
import { createCommentMutation } from "@/graphql/mutations/tweet";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getCommentsQuery } from "@/graphql/query/tweet";

export const useCreateTweet = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: CreateTweetData) =>
      getGraphqlClient().request(createTweetMutation, { payload }),
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
//added new 2
export const useCreateComment = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Comment, Error, CreateCommentMutationVariables>({
    mutationFn: async (variables) => {
      const res = await getGraphqlClient().request(
        createCommentMutation,
        variables
      );
      return res.createComment as Comment;

    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-tweets"] });
    },
  });
  
  return mutation;
};

export const useGetTweetComments = (tweetId: string) => {
  return useQuery({
    queryKey: ["tweet-comments", tweetId],
    queryFn: () =>
      getGraphqlClient().request(getCommentsQuery, { tweetId }),
    enabled: !!tweetId,
   select: (data) => data.getComments, 
  });
};
// till here

export const useGetAllTweets = () => {
  const query = useQuery({
    queryKey: ["all-tweets"],
    queryFn: () => getGraphqlClient().request(getAllTweetsQuery),
  });
  return { ...query, tweets: query.data?.getAllTweets };
};
