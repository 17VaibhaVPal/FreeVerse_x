"use client";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getConversationsQuery } from "@/graphql/query/user";
import { getGraphqlClient } from "@/clients/api";
import { GetConversationsQuery } from "@/gql/graphql";
import { useState } from "react";

export default function InboxPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading } = useQuery<GetConversationsQuery>({
    queryKey: ["conversations"],
    queryFn: () => getGraphqlClient().request(getConversationsQuery),
  });

  const users = data?.getConversations ?? [];

  const filteredUsers = users.filter(
    (user) =>
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatLastSeen = (timestamp?: string) => {
    if (!timestamp) return "Just now";

    const now = new Date();
    const lastSeen = new Date(timestamp);
    const diffInMs = now.getTime() - lastSeen.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;

    if (diffInDays === 1) return "Yesterday";
    if (diffInDays <= 6) {
      return lastSeen.toLocaleDateString("en-US", { weekday: "long" });
    }

    return lastSeen.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            Messages
          </h1>
          <Link
            href="/send-message"
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-6 py-2 rounded-full text-white font-medium transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            New Chat
          </Link>
        </div>

        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="p-4 space-y-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 bg-gray-800 bg-opacity-50 rounded-xl animate-pulse"
              >
                <div className="w-14 h-14 bg-gray-700 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 p-8">
            <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              No conversations yet
            </h3>
            <p className="text-gray-500 text-center mb-6">
              Start chatting by sending a message
            </p>
            <Link
              href="/send-message"
              className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-full text-white font-medium transition-all duration-200"
            >
              Start New Conversation
            </Link>
          </div>
        ) : (
          <div className="p-4 space-y-2">
            {filteredUsers.map((user) => (
              <Link
                key={user.id}
                href={`/messages/${user.id}`}
                className="flex items-center gap-4 p-4 bg-gray-800 bg-opacity-50 hover:bg-gray-700 hover:bg-opacity-70 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg border border-transparent hover:border-gray-600"
              >
                <Image
                  src={user.profileImageURL || "/default-pfp.png"}
                  alt="Profile"
                  width={56}
                  height={56}
                  className="rounded-full border-2 border-gray-600"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-white truncate">
                      {user.firstName} {user.lastName}
                    </p>
                    <span className="text-xs text-gray-400 ml-2">
                      {formatLastSeen(user.lastMessageTimestamp ?? undefined)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400 truncate">
                      {user.email}
                    </p>
                    {user.unreadCount && user.unreadCount > 0 && (
                      <div className="flex items-center ml-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                      </div>
                    )}
                  </div>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
