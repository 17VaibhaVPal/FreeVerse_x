import Image from "next/image";
import "@/styles/globals.css";
import React, { useCallback, useState } from "react";

import { FaImage } from "react-icons/fa6";
import FeedCard from "@/components/FeedCard";
import toast from "react-hot-toast";
import { useCurrentUser } from "@/hooks/user";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { Tweet } from "@/gql/graphql";
import Twitterlayout from "@/components/FeedCard/layout/TwitterLayout";
import { GetServerSideProps } from "next";
import { getGraphqlClient } from "@/clients/api";
import { getAllTweetsQuery } from "@/graphql/query/tweet";

interface HomeProps {
  tweets?: Tweet[];
}
export default function Home(props: HomeProps) {
  const { user } = useCurrentUser();

  const { mutate } = useCreateTweet();

  const [content, setContent] = useState("");

  const handleCreateTweet = useCallback(() => {
    if (!content.trim()) {
      return toast.error("Tweet content cannot be empty!");
    }
    mutate({
      content,
    });
  }, [content, mutate]);
  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
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

        {props.tweets?.map((tweet) =>
          tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet} /> : null
        )}
      </Twitterlayout>
    </div>
  );
}
//"server side rendering"
// wwhic  makes our page more secure and fast
export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context
) => {
  const graphqlClient = getGraphqlClient();
  const allTweets = await graphqlClient.request(getAllTweetsQuery);
  return {
    props: {
      tweets: allTweets.getAllTweets as Tweet[],
    },
  };
};
