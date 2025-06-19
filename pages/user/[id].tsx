"use client";

import FeedCard from "@/components/FeedCard";
import Twitterlayout from "@/components/FeedCard/layout/TwitterLayout";
import { Tweet, User } from "@/gql/graphql";
import { getGraphqlClient } from "@/clients/api";
import { getUserByIdQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useQueryClient } from "@tanstack/react-query";
import { GetUserByIdQuery } from "@/gql/graphql";

import {
  followUserMutation,
  unfollowUserMutation,
} from "@/graphql/mutations/user";


  const UserProfilePage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { user: currentUser } = useCurrentUser();
  const [user, setUser] = useState<GetUserByIdQuery["getUserById"] | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!id || typeof id !== "string") return;

    const fetchUser = async () => {
      const token = localStorage.getItem("__twitter_token");
      if (!token) return;

      const client = getGraphqlClient(token);
      try {
        const result = await client.request(getUserByIdQuery, { id });

        if (result.getUserById) {
          setUser(result.getUserById);
        } else {
          console.warn("User not found for id:", id);
          setUser(null);
        }
      } catch (err) {
        console.error("GraphQL fetch error:", err);
      }
    };

    fetchUser();
  }, [id]);

  const amIFollowing = useMemo(() => {
    if (!user || !currentUser?.following) return false;
    return currentUser.following.some((el) => el?.id === user.id);
  }, [currentUser, user]);

  const handleFollowUser = useCallback(async () => {
    if (!user?.id) return;

    const token = localStorage.getItem("__twitter_token");
    const client = getGraphqlClient(token!);
    await client.request(followUserMutation, { to: user.id });
    await queryClient.invalidateQueries({ queryKey: ["current-user"] });
  }, [user, queryClient]);

  const handleUnFollowUser = useCallback(async () => {
    if (!user?.id) return;

    const token = localStorage.getItem("__twitter_token");
    const client = getGraphqlClient(token!);
    await client.request(unfollowUserMutation, { to: user.id });
    await queryClient.invalidateQueries({ queryKey: ["current-user"] });
  }, [user, queryClient]);

  if (!user) return <div className="text-white p-4">Loading user...</div>;

  return (
    <Twitterlayout>
      <div>
        <nav className="flex items-center gap-3 py-3 px-3">
          <FaArrowLeft
            className="text-2xl cursor-pointer"
            onClick={() => router.back()}
          />
          <div>
            <h1 className="text-2xl font-bold">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-md font-bold text-slate-500">
              {user.tweets?.length} Tweets
            </p>
          </div>
        </nav>

        <div className="p-4 border-b border-slate-800">
          {user.profileImageURL && (
            <img
              src={user.profileImageURL}
              className="rounded-full"
              alt="user"
              width={100}
              height={100}
            />
          )}
          <h1 className="text-2xl font-bold mt-3">
            {user.firstName} {user.lastName}
          </h1>
          <div className="flex justify-between items-center">
            <div className="flex gap-4 mt-2 text-sm text-gray-400">
              <span>{user.followers?.length ?? 0} Followers</span>
              <span>{user.following?.length ?? 0} Following</span>
            </div>

            {currentUser?.id !== user.id && (
              <>
                {amIFollowing ? (
                  <button
                    onClick={handleUnFollowUser}
                    className="bg-white text-black px-3 py-1 rounded-full text-sm"
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={handleFollowUser}
                    className="bg-white text-black px-3 py-1 rounded-full text-sm"
                  >
                    Follow
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        <div>
          {user.tweets?.map((tweet) => (
            <FeedCard
              key={tweet.id}
              data={tweet as Tweet}
              isBookmarked={tweet.isBookmarked ?? false}
            />
          ))}
        </div>
      </div>
    </Twitterlayout>
  );
};

export default UserProfilePage;
