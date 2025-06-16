import { Tweet } from "@/gql/graphql";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { FaRegCommentDots, FaRegHeart } from "react-icons/fa6";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getGraphqlClient } from "@/clients/api";
import Image from "next/image";
interface FeedCardProps {
  data: Tweet;
  isBookmarked?: boolean;
}

const FeedCard: React.FC<FeedCardProps> = ({ data, isBookmarked = false }) => {
  const [bookmarked, setBookmarked] = useState(!!isBookmarked);
  const client = getGraphqlClient();
  const queryClient = useQueryClient();

  const bookmarkMutation = useMutation({
    mutationFn: async () => {
      await client.request(
        `
        mutation BookmarkTweet($tweetId: ID!) {
          bookmarkTweet(tweetId: $tweetId)
        }
      `,
        { tweetId: data.id }
      );
    },
    onSuccess: () => {
      setBookmarked(true);
      queryClient.invalidateQueries({ queryKey: ["allTweets"] });
    },
  });

  const removeBookmarkMutation = useMutation({
    mutationFn: async () => {
      await client.request(
        `
        mutation RemoveBookmark($tweetId: ID!) {
          removeBookmark(tweetId: $tweetId)
        }
      `,
        { tweetId: data.id }
      );
    },
    onSuccess: () => {
      setBookmarked(false);
      queryClient.invalidateQueries(); // Refresh data
    },
  });

  const toggleBookmark = () => {
    if (bookmarked) {
      removeBookmarkMutation.mutate();
    } else {
      bookmarkMutation.mutate();
    }
  };

  return (
    <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-1">
          {data.author?.profileImageURL && (
            <Image
              className="rounded-full"
              src={data.author.profileImageURL}
              alt="user-image"
              height={50}
              width={50}
            />
          )}
        </div>
        <div className="col-span-11">
          <h5>
            <Link href={`/${data.author?.id}`}>
              {data.author?.firstName} {data.author?.lastName}
            </Link>
          </h5>

          <p>{data.content}</p>
          {data.imageURL && (
            <img src={data.imageURL} alt="image" width={400} height={400} />
          )}
          <div className="flex justify-between mt-5 text-xl items-center p-2 w-[90%]">
            <div className="hover:text-white transition-colors">
              <FaRegCommentDots />
            </div>
            <div className="hover:text-white transition-colors">
              <FaRegHeart />
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-400">
              <AiOutlineEye className="text-lg" />
            </div>
            <div
              className="hover:text-white transition-colors"
              onClick={toggleBookmark}
               aria-label="Toggle Bookmark"
            >
              {bookmarked ? <BsBookmarkFill /> : <BsBookmark />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
