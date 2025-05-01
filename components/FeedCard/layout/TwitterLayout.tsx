'use client';

import { useCurrentUser } from "@/hooks/user";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BiDollar, BiSolidHome } from "react-icons/bi";
import { BsTwitterX } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { FaBell, FaHashtag } from "react-icons/fa6";
import { MdMessage } from "react-icons/md";
import { SlOptions } from "react-icons/sl";
import Image from "next/image";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { getGraphqlClient } from "@/clients/api";
import toast from "react-hot-toast";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useQueryClient } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { GoBookmark } from "react-icons/go";
import Link from "next/dist/client/link";


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

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
  link :string
}

interface TwitterlayoutProps {
  children: React.ReactNode;
}
const Twitterlayout: React.FC<TwitterlayoutProps> = (props) => {

  const { user } = useCurrentUser();
  const queryClient = useQueryClient();

  const sidebarMenuItems : TwitterSidebarButton[]= useMemo(() => [
    {
      title: "Home",
      icon: <BiSolidHome />,
      link :'/'
    },
    {
      title: "Explore",
      icon: <FaHashtag />,
        link :'/'
    },
    {
      title: "Notifications",
      icon: <FaBell />,
        link :'/'
    },
    {
      title: "Messages",
      icon: <MdMessage />,
        link :'/'
    },
    {
      title: "Bookmarks",
      icon: <GoBookmark />,
        link :'/'
    },
    {
      title: "Twitter Blue",
      icon: <BiDollar />,
        link :'/'
    },
    {
      title: "Profile",
      icon: <FaUserAlt />,
        link :`/${user?.id}`
    },
    {
      title: "More",
      icon: <SlOptions />,
        link :'/'
    },
  ],
  [user?.id])

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;

      if (!googleToken) return toast.error(`Google token not found`);

      const { verifyGoogleToken } = await getGraphqlClient().request(
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
      <div className="grid grid-cols-12 h-screen w-screen sm:px-36">
        <div className="col-span-2 sm:col-span-3 pt-1 px-4   flex flex-col items-end relative">
          <div>
            <div className="flex flex-col gap-2 items-start w-fit">
              <div className="hover:bg-gray-800 rounded-full p-3 cursor-pointer transition-all">
                <BsTwitterX className="text-xl" />
              </div>

              <ul className="text-base font-medium">
                {sidebarMenuItems.map((item) => (
                  <li
                    key={item.title}
                   
                  >
                    <Link  className="flex items-center gap-4 hover:bg-gray-800 rounded-full px-2 py-2 w-fit cursor-pointer" href = {item.link}>
                    <span className="text-2xl">{item.icon}</span>
                    <span className="hidden sm:inline">{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              <button className="hidden sm:block bg-[#1d6bf0] font-semibold text-sm py-2 px-4 rounded-full w-full mt-4 cursor-pointer">
                Tweet
              </button>
              <button className="block sm:hidden bg-[#1d6bf0] font-semibold text-sm py-2 px-4 rounded-full w-full mt-4 cursor-pointer">
                <BsTwitterX />
              </button>
            </div>
          </div>
          {user && (
            <div className="mr-35 mt-4 bottom-5 left-0 flex items-center gap-3 p-3 rounded-full hover:bg-gray-800 cursor-pointer transition-all w-full pr-5">
              {user.profileImageURL && (
                <Image
                  className="rounded-full "
                  src={user.profileImageURL}
                  alt="user-image"
                  height={40}
                  width={40}
                />
              )}
              <div className="hidden sm:block leading-tight">
                <div className="font-semibold text-white text-sm">
                  {user.firstName} {user.lastName}
                </div>
                <div className="text-gray-400 text-xs">@{user.email}</div>
              </div>
            </div>
          )}
        </div>

        <div className="col-span-10 sm:col-span-5 border-r border-l  border-gray-600 h-screen overflow-y-scroll scrollbar-hide ">
          {props.children}
        </div>
        <div className="col-span-0 sm: col-span-3">
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
};
export default Twitterlayout;
function setIsMounted(arg0: boolean) {
  throw new Error("Function not implemented.");
}

