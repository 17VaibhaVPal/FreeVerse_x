"use client";

import { useEffect, useState } from "react";
import TwitterLayout from "@/components/FeedCard/layout/TwitterLayout";
import { getGraphqlClient } from "@/clients/api";
import { getBookmarkedTweetsQuery } from "@/graphql/query/user";
import { GetBookmarkedTweetsQuery, Tweet } from "@/gql/graphql";
import FeedCard from "@/components/FeedCard";
import toast from "react-hot-toast";

// ✅ Use type compatible with query
type BookmarkedTweet = {
  id: string;
  content: string;
  imageURL?: string | null;
  isBookmarked: boolean;
  author?: {
    id: string;
    firstName: string;
    lastName?: string | null;
    profileImageURL?: string | null;
    followers: { id: string }[];
    following: { id: string }[];
    tweets: { id: string }[];
  } | null;
};

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<BookmarkedTweet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const client = getGraphqlClient();
        const res: GetBookmarkedTweetsQuery = await client.request(getBookmarkedTweetsQuery);
        setBookmarks(res.getBookmarkedTweets || []);
      } catch (error) {
        console.error("Client-side bookmarks fetch error:", error);
        toast.error("Failed to load bookmarks.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  return (
    <TwitterLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Your Bookmarks</h1>
        {loading ? (
          <p>Loading...</p>
        ) : bookmarks.length === 0 ? (
          <p>No bookmarks yet.</p>
        ) : (
          bookmarks.map((tweet) => <FeedCard key={tweet.id} data={tweet as unknown as Tweet} />)
        )}
      </div>
    </TwitterLayout>
  );
}
