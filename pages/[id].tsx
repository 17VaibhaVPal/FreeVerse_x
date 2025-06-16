import FeedCard from "@/components/FeedCard";
import { useRouter } from "next/router";
import Twitterlayout from "@/components/FeedCard/layout/TwitterLayout";
import { Tweet, User } from "@/gql/graphql";
import { parse } from "cookie";
import { GetServerSideProps, NextPage } from "next";
import { FaArrowLeft, FaLessThanEqual } from "react-icons/fa6";
import { getGraphqlClient } from "@/clients/api";
import { getUserByIdQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { useCallback, useMemo } from "react";

import { useQueryClient } from "@tanstack/react-query";
import {
  followUserMutation,
  unfollowUserMutation,
} from "@/graphql/mutations/user";

interface ServerProps {
  user?: User;
}
const UserProfilePage: NextPage<ServerProps> = (props) => {
  const router = useRouter();
  const { user: currentUser } = useCurrentUser();

  const queryClient = useQueryClient();

  const amIFollowing = useMemo(() => {
    if (!props.user) return false;
    return (
      (currentUser?.following.findIndex((el) => el?.id === props.user?.id) ??
        -1) >= 0
    ); // finding in follow list of my own profile whom m following
  }, [currentUser?.following, props.user]);

  const handleFollowUser = useCallback(async () => {
    if (!props.user?.id) return;

    const graphqlClient = getGraphqlClient();
    await graphqlClient.request(followUserMutation, { to: props.user.id });
    //refresh then current user i.e. your following list
    await queryClient.invalidateQueries({ queryKey: ["current-user"] });
  }, [props.user?.id, queryClient]);

  const handleUnFollowUser = useCallback(async () => {
    if (!props.user?.id) return;

    const graphqlClient = getGraphqlClient();
    await graphqlClient.request(unfollowUserMutation, { to: props.user.id });
    //refresh then current user i.e. your following list
    await queryClient.invalidateQueries({ queryKey: ["current-user"] });
  }, [props.user?.id, queryClient]);

  return (
    <div>
      <Twitterlayout>
        <div>
          <nav className=" flex items-center gap-3 py-3 px-3">
            <FaArrowLeft className="text-2xl" />
            <div>
              <h1 className="text-2xl font-bold">
                {props.user?.firstName} {props.user?.lastName}
              </h1>
              <h1 className="text-md font-bold text-slate-500">
                {" "}
                {props.user?.tweets?.length} Tweets
              </h1>
            </div>
          </nav>
          <div className="p-4 border-b border-slate-800">
            {props.user?.profileImageURL && (
              <img
                src={props.user?.profileImageURL}
                className="rounded-full"
                alt="user-image"
                width={100}
                height={100}
              />
            )}
            <h1 className="text-2xl font-bold mt-3">
              {props.user?.firstName} {props.user?.lastName}
            </h1>
            <div className="flex justify-between items-center">
              <div className="flex gap-4 mt-2 text-sm text-gray-400">
                <span> {props.user?.followers?.length} Followers</span>
                <span> {props.user?.following?.length} Following</span>
              </div>
              {currentUser?.id !== props.user?.id && (
                <>
                  {amIFollowing ? (
                    <button
                      onClick={handleUnFollowUser}
                      className="bg-white text-black px-3 py-1 rounded-full text-sm cursor-pointer"
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      onClick={handleFollowUser}
                      className="bg-white text-black px-3 py-1 rounded-full text-sm cursor-pointer"
                    >
                      Follow
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
          <div>
            {props.user?.tweets?.map((tweet) => (
              <FeedCard
                data={tweet as Tweet}
                isBookmarked={(tweet as Tweet).isBookmarked ?? false}
                key={tweet?.id}
              />
            ))}
          </div>
        </div>
      </Twitterlayout>
    </div>
  );
};

//to make profile page of user server side rended i.e. where u fetch the data tto seerver and display direct data to user
//" we did the client -side rendering "
export const getServerSideProps: GetServerSideProps<ServerProps> = async (
  context
) => {
  const id = context.query.id as string | undefined;
  if (!id) return { notFound: true };

  const cookies = parse(context.req.headers.cookie || "");
  const token = cookies["__twitter_token"];
  const graphqlClient = getGraphqlClient(token);

  const userInfo = await graphqlClient.request(getUserByIdQuery, { id });

  if (!userInfo?.getUserById) return { notFound: true };

  return {
    props: {
      user: userInfo.getUserById as User,
    },
  };
};
export default UserProfilePage;
