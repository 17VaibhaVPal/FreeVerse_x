import Image from "next/image";
import { Geist } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "@/styles/globals.css";

import { BsTwitterX } from "react-icons/bs";
import React, { useCallback, useState } from "react";
import { BiDollar, BiSolidHome } from "react-icons/bi";
import { FaHashtag, FaImage } from "react-icons/fa6";
import { FaBell } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { FaBookmark } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import FeedCard from "@/components/FeedCard";
import { SlOptions } from "react-icons/sl";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

import { gql } from "@apollo/client";
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import { ImGift } from "react-icons/im";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { Tweet } from "@/gql/graphql";

const USERS_QUERY = gql`
  query Users {
    users {
      id
      firstName
      lastName
      email
    }
  }
`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
}
const sidebarMenuItems: TwitterSidebarButton[] = [
  {
    title: "Home",
    icon: <BiSolidHome />,
  },
  {
    title: "Explore",
    icon: <FaHashtag />,
  },
  {
    title: "Notifications",
    icon: <FaBell />,
  },
  {
    title: "Messages",
    icon: <MdMessage />,
  },
  {
    title: "Bookmarks",
    icon: <FaBookmark />,
  },
  {
    title: "Twitter Blue",
    icon: <BiDollar />,
  },
  {
    title: "Profile",
    icon: <FaUserAlt />,
  },
  {
    title: "More",
    icon: <SlOptions />,
  },
];
export default function Home() {
  const { user } = useCurrentUser();

  const { tweets = [] } = useGetAllTweets();
  const {mutate} = useCreateTweet();

  const queryClient = useQueryClient();
  const [content, setContent] = useState("");

  const handleCreateTweet = useCallback(() =>{
    if (!content.trim()) {
      return toast.error("Tweet content cannot be empty!");
    }
    mutate({
      content,
    });
  },[content ,mutate])
  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
  }, []);

  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;

      if (!googleToken) return toast.error(`Google token not found`);

      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleTokenQuery,
        { token: googleToken }
      );

      toast.success("Verified token");
      console.log(verifyGoogleToken);

      if (verifyGoogleToken)
        window.localStorage.setItem("__twitter_token", verifyGoogleToken);

      await queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
    [queryClient]
  );

  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-36">
        <div className="col-span-3 pt-1 px-4  ml-28 flex flex-col items-end relative">
          <div className="flex flex-col gap-2 items-start w-fit">
            <div className="hover:bg-gray-800 rounded-full p-3 cursor-pointer transition-all">
              <BsTwitterX className="text-xl" />
            </div>

            <ul className="text-base font-medium">
              {sidebarMenuItems.map((item) => (
                <li
                  key={item.title}
                  className="flex items-center gap-4 hover:bg-gray-800 rounded-full px-2 py-2 w-fit cursor-pointer"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>

            <button className="bg-[#1d6bf0] font-semibold text-sm py-2 px-4 rounded-full w-full mt-4 cursor-pointer">
              Tweet
            </button>
          </div>
          {user && (
            <div className="mr-35 mt-4 bottom-5 left-0 flex items-center gap-3 p-3 rounded-full hover:bg-gray-800 cursor-pointer transition-all w-full pr-5">
              {user.profileImageURL && (
                <Image
                  className="rounded-full"
                  src={user.profileImageURL}
                  alt="user-image"
                  height={40}
                  width={40}
                />
              )}
              <div className="flex flex-col leading-tight">
                <span className="font-semibold text-white text-sm">
                  {user.firstName} {user.lastName}
                </span>
                <span className="text-gray-400 text-xs">@{user.email}</span>
              </div>
            </div>
          )}
        </div>

        <div className="col-span-5 border-r border-l  border-gray-600 h-screen overflow-y-scroll scrollbar-hide ">
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
                    <button onClick={handleCreateTweet} className="bg-[#1d6bf0] font-semibold text-sm py-2 px-4 rounded-full cursor-pointer">
                      Tweet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {tweets?.map((tweet) =>
            tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet} /> : null
          )}
        </div>
        <div className="col-span-3">
          {!user && (
            <div className="p-5 ml-2 mt-2 bg-slate-700 rounded-lg">
              <h1 className="my-0.5 text-2xl">New to Twitter?</h1>
              <GoogleLogin onSuccess={handleLoginWithGoogle} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
