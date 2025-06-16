"use client";

import { useCurrentUser } from "@/hooks/user";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BiSolidHome } from "react-icons/bi";
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
import Link from "next/link";
import { useRouter } from "next/router";

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
  link: string;
}

interface TwitterlayoutProps {
  children: React.ReactNode;
}

const Twitterlayout: React.FC<TwitterlayoutProps> = (props) => {
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();

  const sidebarMenuItems: TwitterSidebarButton[] = useMemo(
    () => [
      {
        title: "Home",
        icon: <BiSolidHome />,
        link: "/",
      },
      {
        title: "Messages",
        icon: <MdMessage />,
        link: `/inbox`,
      },
      {
        title: "Bookmarks",
        icon: <GoBookmark />,
        link: "/bookmarks",
      },
      {
        title: "Profile",
        icon: <FaUserAlt />,
        link: `/${user?.id}`,
      },
      {
        title: "More",
        icon: <SlOptions />,
        link: "/",
      },
    ],
    [user?.id]
  );

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

      if (verifyGoogleToken)
        window.localStorage.setItem("__twitter_token", verifyGoogleToken);

      toast.success("Verified token");
      await queryClient.invalidateQueries({ queryKey: ["current-user"] });
      await queryClient.refetchQueries({ queryKey: ["current-user"] });
    },
    [queryClient]
  );

  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen sm:px-36">
        {/* Sidebar */}
        <div className="col-span-2 sm:col-span-3 pt-1 px-4 flex flex-col justify-between items-end relative">
          <div className="flex flex-col gap-y-5 items-start w-full">
            <div className="hover:bg-gray-800 rounded-full p-3 cursor-pointer transition-all">
              <BsTwitterX className="text-xl" />
            </div>

            <ul className="text-base font-medium">
              {sidebarMenuItems.map((item) => {
                if (item.title === "More") {
                  return <MoreDropdown key={item.title} icon={item.icon} />;
                }

                return (
                  <li key={item.title}>
                    <Link
                      className="flex items-center gap-4 hover:bg-gray-800 rounded-full px-2 py-2 w-fit cursor-pointer"
                      href={item.link}
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <span className="hidden sm:inline">{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {user && (
            <div className="mt-6 mb-3 w-full flex items-center gap-3 bg-[#1e2732] hover:bg-[#25313f] transition-all p-3 rounded-2xl">
              {user.profileImageURL && (
                <Image
                  className="rounded-full"
                  src={user.profileImageURL}
                  alt="user-image"
                  height={40}
                  width={40}
                />
              )}
              <div className="flex flex-col overflow-hidden">
                <span className="text-white font-semibold text-sm truncate">
                  {user.firstName} {user.lastName}
                </span>
                <span className="text-gray-400 text-xs truncate">
                  @{user.email}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Middle Panel */}
        <div className="col-span-10 sm:col-span-5 border-r border-l border-gray-600 h-screen overflow-y-scroll scrollbar-hide">
          {props.children}
        </div>

        {/* Right Panel */}
        <div className="col-span-0 sm:col-span-3">
          {!user ? (
            <div className="p-5 ml-2 mt-2 bg-slate-700 rounded-xl shadow-lg">
              <h1 className="text-2xl font-semibold mb-2 text-white">
                New to Twitter?
              </h1>
              <GoogleLogin onSuccess={handleLoginWithGoogle} />
            </div>
          ) : (
            <div className="px-5 py-4 ml-2 mt-2 bg-[#15202b] rounded-2xl w-full max-w-sm shadow-lg">
              <h2 className="text-white font-bold text-xl mb-4">
                Users you may know
              </h2>

              <div className="flex flex-col gap-4">
                {user?.recommendedUser?.map((el) => (
                  <div
                    key={el?.id}
                    className="flex items-center gap-4 bg-[#1e2732] hover:bg-[#25313f] transition-colors p-3 rounded-xl cursor-pointer"
                  >
                    {el?.profileImageURL && (
                      <Image
                        src={el.profileImageURL}
                        alt="user-image"
                        className="rounded-full"
                        width={48}
                        height={48}
                      />
                    )}
                    <div className="flex flex-col">
                      <span className="text-white font-medium text-sm leading-tight">
                        {el?.firstName} {el?.lastName}
                      </span>
                      <Link
                        href={`/${el?.id}`}
                        className="mt-1 inline-flex items-center justify-center bg-white hover:bg-gray-200 text-black text-xs font-semibold px-4 py-1 rounded-full transition-all"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// More dropdown component
const MoreDropdown = ({ icon }: { icon: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSignOut = () => {
    localStorage.removeItem("__twitter_token");
    setIsOpen(false);
    router.push("/log-in");
  };
  const handleLogin = () => {
    setIsOpen(false);
    router.push("/log-in");
  };
  const handleCreateAccount = () => {
    setIsOpen(false);
    router.push("/create-account");
  };

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("__twitter_token")
      : null;

  return (
    <div className="relative">
      <div
        className="flex items-center gap-4 hover:bg-gray-800 rounded-full px-2 py-2 w-fit cursor-pointer"
        onClick={toggleDropdown}
      >
        <span className="text-2xl">{icon}</span>
        <span className="hidden sm:inline">More</span>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-2 bg-gray-900 border border-gray-700 rounded-md w-40 shadow-lg text-sm text-white">
          <button
            onClick={handleCreateAccount}
            className="block w-full text-left px-4 py-2 hover:bg-gray-800"
          >
            Create Account
          </button>
          <button
            onClick={handleLogin}
            className="block w-full text-left px-4 py-2 hover:bg-gray-800"
          >
            Log In
          </button>

          {token && (
            <button
              onClick={handleSignOut}
              className="block w-full text-left px-4 py-2 hover:bg-gray-800"
            >
              Sign Out
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Twitterlayout;
