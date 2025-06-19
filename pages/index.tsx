import Image from "next/image";

import React, { useCallback, useState } from "react";
import { getBookmarkedTweetsQuery } from "@/graphql/query/user";
import { useQuery } from "@tanstack/react-query";

import { FaImage } from "react-icons/fa6";
import FeedCard from "@/components/FeedCard";
import toast from "react-hot-toast";
import { useCurrentUser } from "@/hooks/user";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { Tweet } from "@/gql/graphql";
import Twitterlayout from "@/components/FeedCard/layout/TwitterLayout";
import { GetServerSideProps } from "next";
import { getGraphqlClient } from "@/clients/api";
import {
  getAllTweetsQuery,
  getSignedURLForTweetQuery,
} from "@/graphql/query/tweet";
import { parse } from "cookie";
import axios from "axios";

interface HomeProps {
  tweets?: Tweet[];
}
export default function Home(props: HomeProps) {
  const { user } = useCurrentUser();
  const { tweets = props.tweets as Tweet[] } = useGetAllTweets();
  // m making use of get all tweets but default there is some data coming from the server
  //making a state copy of what so ever coming from server side
  //done by "sever side" rendering , need -> so that we have some data initially whenevr we server side load this page
  const { mutateAsync } = useCreateTweet();

  const [content, setContent] = useState("");
  const [imageURL, setImageURL] = useState("");

  ///
  const { data: bookmarksData } = useQuery({
    queryKey: ["bookmarkedTweets"],
    queryFn: async () => {
      const client = getGraphqlClient();
      const res = await client.request(getBookmarkedTweetsQuery);
      return res.getBookmarkedTweets?.map((tweet) => tweet.id) || [];
    },
    enabled: !!user?.id,
  });
  ///

  const handleCreateTweet = useCallback(async () => {
    if (!content.trim()) {
      return toast.error("Tweet content cannot be empty!");
    }
    await mutateAsync({
      content,
      imageURL,
    });
    setContent("");
    setImageURL("");
  }, [content, mutateAsync, imageURL]);

  const handleInputChangeFile = useCallback((input: HTMLInputElement) => {
    const graphqlClient = getGraphqlClient();

    return async (event: Event) => {
      event.preventDefault();
      const file: File | null | undefined = input.files?.item(0);
      if (!file) return;

      console.log("Image name:", file.name);
      console.log("Image type:", file.type);

      const { getSignedURLForTweet } = await graphqlClient.request(
        getSignedURLForTweetQuery,
        {
          imageName: file.name,
          imageType: file.type,
        }
      );

      if (getSignedURLForTweet) {
        toast.loading("Uploading...", { id: "2" });
        await axios.put(getSignedURLForTweet, file, {
          headers: {
            "Content-Type": file.type,
          },
        });

        toast.success("Upload completed", { id: "2" });
        const url = new URL(getSignedURLForTweet);
        const myFilepath = `${url.origin}${url.pathname}`;
        setImageURL(myFilepath);
      }
    };
  }, []);

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    const handlerFn = handleInputChangeFile(input);

    input.addEventListener("change", handlerFn);

    input.click();
  }, []);

  return (
    <div>
      <Twitterlayout>
        <div>
          <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer">
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-1">
                {user?.profileImageURL && (
                  <Image
                    className="rounded-full"
                    src={user?.profileImageURL}
                    alt="user-image"
                    height={50}
                    width={50}
                  />
                )}
              </div>
              <div className="col-span-11">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-transparent text-xl px-3 border-b-2 border-slate-700"
                  placeholder="What's happening ?"
                  rows={3}
                ></textarea>
                {imageURL && (
                  <Image
                    src={imageURL}
                    alt="tweet-image"
                    width={300}
                    height={300}
                  />
                )}
                <div className="mt-2 flex justify-between items-center">
                  <FaImage onClick={handleSelectImage} className="text-xl" />
                  <button
                    onClick={handleCreateTweet}
                    className="bg-[#1d6bf0] font-semibold text-sm py-2 px-4 rounded-full cursor-pointer"
                  >
                    Tweet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {tweets?.map((tweet) =>
          tweet ? (
            <FeedCard
              key={tweet?.id}
              data={tweet as Tweet}
              isBookmarked={bookmarksData?.includes(tweet.id)}
            />
          ) : null
        )}
      </Twitterlayout>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context
) => {
  const cookies = context.req.headers.cookie || "";
  const { __twitter_token: token } = parse(cookies);

  const graphqlClient = getGraphqlClient(token); // pass token to include Authorization header

  try {
    const { getAllTweets } = await graphqlClient.request(getAllTweetsQuery);

    return {
      props: {
        tweets: getAllTweets as Tweet[],
      },
    };
  } catch (err) {
    console.error("SSR Tweet fetch failed:", err);
    return {
      props: {
        tweets: [],
      },
    };
  }
};
