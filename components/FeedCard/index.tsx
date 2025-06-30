import { Tweet } from "@/gql/graphql";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { FaRegCommentDots, FaRegHeart, FaHeart } from "react-icons/fa6";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getGraphqlClient } from "@/clients/api";
import Image from "next/image";
import { useCreateComment, useGetTweetComments } from "@/hooks/tweet";
import { useCurrentUser } from "@/hooks/user"; // Assuming this exists

interface FeedCardProps {
  data: Tweet;
  isBookmarked?: boolean;
}

const FeedCard: React.FC<FeedCardProps> = ({ data, isBookmarked = false }) => {
  const [bookmarked, setBookmarked] = useState(!!isBookmarked);
  const [liked, setLiked] = useState(data.isLiked || false);
  const [likeCount, setLikeCount] = useState(data.likesCount || 0);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");

  const { data: comments = [], refetch: refetchComments } = useGetTweetComments(
    data.id
  );

  const { user: currentUser } = useCurrentUser();

  
  const client = getGraphqlClient();
  const queryClient = useQueryClient();
  const createComment = useCreateComment();

  const bookmarkMutation = useMutation({
    mutationFn: async () => {
      await client.request(
        `mutation BookmarkTweet($tweetId: ID!) {
          bookmarkTweet(tweetId: $tweetId)
        }`,
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
        `mutation RemoveBookmark($tweetId: ID!) {
          removeBookmark(tweetId: $tweetId)
        }`,
        { tweetId: data.id }
      );
    },
    onSuccess: () => {
      setBookmarked(false);
      queryClient.invalidateQueries();
    },
  });

  const likeMutation = useMutation({
    mutationFn: async () => {
      await client.request(
        `mutation LikeTweet($tweetId: ID!) {
          likeTweet(tweetId: $tweetId)
        }`,
        { tweetId: data.id }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allTweets"] });
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: async () => {
      await client.request(
        `mutation UnlikeTweet($tweetId: ID!) {
          unlikeTweet(tweetId: $tweetId)
        }`,
        { tweetId: data.id }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allTweets"] });
    },
  });

  const toggleBookmark = () => {
    if (bookmarked) {
      removeBookmarkMutation.mutate();
    } else {
      bookmarkMutation.mutate();
    }
  };

  const toggleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount((prev) => Math.max(prev - 1, 0));
      unlikeMutation.mutate();
    } else {
      setLiked(true);
      setLikeCount((prev) => prev + 1);
      likeMutation.mutate();
    }
  };

  const postComment = () => {
    if (!comment.trim()) return;

    createComment.mutate(
      { tweetId: data.id, content: comment },
      {
        onSuccess: () => {
          setComment("");
          refetchComments(); //  Fetch latest comments after posting
        },
      }
    );
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
            <Link href={`/user/${data.author?.id}`}>
              {data.author?.firstName} {data.author?.lastName}
            </Link>
          </h5>

          <p>{data.content}</p>
          {data.imageURL && (
            <img src={data.imageURL} alt="image" width={400} height={400} />
          )}

          <div className="flex justify-around mt-5 text-xl items-center p-2 w-full gap-6">
            {/* Comment icon */}
            <div
              className="flex items-center gap-1 hover:text-white transition-colors text-gray-400 cursor-pointer"
              onClick={() => {
                setShowCommentBox((prev) => {
                  const next = !prev;
                  if (!prev) refetchComments(); //refetch only when opening
                  return next;
                });
              }}
            >
              <FaRegCommentDots size={20} />
              <span className="text-sm">{comments.length}</span>
            </div>

            {/* Like icon */}
            <div
              className={`flex flex-col items-center cursor-pointer transition-colors ${
                liked ? "text-red-500" : "text-gray-400 hover:text-white"
              }`}
              onClick={toggleLike}
            >
              {liked ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
              <span className="text-sm">{likeCount}</span>
            </div>

            {/* View count icon placeholder */}
            <div className="flex items-center text-gray-400 gap-1">
              <AiOutlineEye size={22} />
            </div>

            {/* Bookmark icon */}
            <div
              className="hover:text-white text-gray-400 transition-colors cursor-pointer"
              onClick={toggleBookmark}
              aria-label="Toggle Bookmark"
            >
              {bookmarked ? (
                <BsBookmarkFill size={20} />
              ) : (
                <BsBookmark size={20} />
              )}
            </div>
          </div>

          {showCommentBox && (
            <div className="mt-4 px-2 space-y-4">
              {/* Existing comments */}
              <div className="space-y-2">
                {comments?.map((comment) => {
                  
                  const isCurrentUser = comment.user?.id === currentUser?.id;

                  return (
                    <div
                      key={comment.id}
                      className={`flex items-start gap-3 ${
                        isCurrentUser
                          ? "flex-row-reverse text-right"
                          : "flex-row"
                      }`}
                    >
                      {comment.user?.profileImageURL && (
                        <Image
                          src={comment.user.profileImageURL}
                          width={30}
                          height={30}
                          alt="user"
                          className="rounded-full"
                        />
                      )}

                      <div
                        className={`max-w-[70%] px-3 py-2 rounded-lg ${
                          isCurrentUser
                            ? "bg-blue-600 text-white"
                            : "bg-gray-800 text-white"
                        }`}
                      >
                        <p className="text-sm font-semibold">
                          {comment.user?.firstName} {comment.user?.lastName}
                        </p>
                        <p className="text-sm">{comment.content}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Input box */}
              <div className="flex items-center gap-2">
                <input
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-gray-800 text-white px-3 py-1 rounded-md"
                  placeholder="Write a comment..."
                />
                <button
                  className="text-blue-500 font-semibold disabled:text-gray-400"
                  disabled={!comment.trim() || createComment.isPending}
                  onClick={postComment}
                >
                  Post
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
