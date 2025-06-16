"use client";
import { useCurrentUser } from "@/hooks/user";
import { getGraphqlClient } from "@/clients/api";
import { gql } from "graphql-request";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getCurrentUserQuery } from "@/graphql/query/user";
import Image from "next/image";

const SEND_MESSAGE_MUTATION = gql`
  mutation SendMessage($to: ID!, $content: String!) {
    sendMessage(to: $to, content: $content)
  }
`;

interface Follower {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImageURL?: string | null;
}

interface GetCurrentUserResponse {
  getCurrentUser: {
    followers: Follower[];
  };
}

export default function SendMessagePage() {
  const { user } = useCurrentUser();
  const router = useRouter();

  const [followers, setFollowers] = useState<Follower[]>([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<Follower | null>(null);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showUserList, setShowUserList] = useState(false);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const res = await getGraphqlClient().request<GetCurrentUserResponse>(getCurrentUserQuery);
        if (res?.getCurrentUser?.followers) {
          setFollowers(res.getCurrentUser.followers);
        }
      } catch (error) {
        console.error("Failed to fetch followers:", error);
      }
    };
    fetchFollowers();
  }, []);

  const filteredFollowers = followers.filter((u) =>
    `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(search.toLowerCase())
  );

  const handleUserSelect = (follower: Follower) => {
    setSelectedUser(follower);
    setSearch(`${follower.firstName} ${follower.lastName}`);
    setShowUserList(false);
  };

  const handleSend = async () => {
    if (!selectedUser || !message.trim()) return;
    setIsSending(true);
    try {
      await getGraphqlClient().request(SEND_MESSAGE_MUTATION, {
        to: selectedUser.id,
        content: message.trim(),
      });
      router.push(`/messages/${selectedUser.id}`);
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 relative">
      {/* Top Bar */}
      <div className="bg-gray-800 border-b border-gray-700 p-4 shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white">New Message</h1>
          </div>
        </div>

        {/* View Inbox Top-Right */}
        <button
          onClick={() => router.push("/inbox")}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0H4m0 0l4-4m0 0l4 4m-4-4v12" />
          </svg>
          Inbox
        </button>
      </div>

      <div className="p-6 max-w-2xl mx-auto">
        {/* Recipient Selection */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-6 shadow-xl border border-gray-700">
          <label className="block text-sm font-medium text-gray-300 mb-3">Send to</label>
          <div className="relative">
            <div className="flex items-center gap-3 p-3 bg-gray-700 rounded-xl border border-gray-600">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search followers by name or email..."
                className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowUserList(e.target.value.length > 0);
                  if (e.target.value === "") setSelectedUser(null);
                }}
                onFocus={() => setShowUserList(search.length > 0)}
              />
              {selectedUser && (
                <button
                  onClick={() => {
                    setSelectedUser(null);
                    setSearch("");
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {showUserList && search && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-gray-700 border border-gray-600 rounded-xl shadow-2xl z-10 max-h-60 overflow-y-auto">
                {filteredFollowers.length === 0 ? (
                  <div className="p-4 text-gray-400 text-center">No followers found</div>
                ) : (
                  filteredFollowers.map((follower) => (
                    <button
                      key={follower.id}
                      onClick={() => handleUserSelect(follower)}
                      className="w-full flex items-center gap-3 p-4 hover:bg-gray-600 transition-colors text-left first:rounded-t-xl last:rounded-b-xl"
                    >
                      <Image
                        unoptimized
                        src={follower.profileImageURL || "/default-pfp.png"}
                        alt="Profile"
                        width={40}
                        height={40}
                        className="rounded-full border-2 border-gray-500"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-white truncate">{follower.firstName} {follower.lastName}</p>
                        <p className="text-sm text-gray-400 truncate">{follower.email}</p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          {selectedUser && (
            <div className="mt-4 p-4 bg-gray-700 rounded-xl border border-gray-600">
              <div className="flex items-center gap-3">
                <Image
                  unoptimized
                  src={selectedUser.profileImageURL || "/default-pfp.png"}
                  alt="Profile"
                  width={48}
                  height={48}
                  className="rounded-full border-2 border-blue-500"
                />
                <div>
                  <p className="font-semibold text-white">{selectedUser.firstName} {selectedUser.lastName}</p>
                  <p className="text-sm text-gray-400">{selectedUser.email}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Message Box */}
        <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
          <label className="block text-sm font-medium text-gray-300 mb-3">Your message</label>
          <div className="relative">
            <textarea
              className="w-full p-4 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Write your message here..."
              rows={6}
              maxLength={500}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-400">{message.length}/500</div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={handleSend}
              disabled={!selectedUser || !message.trim() || isSending}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                selectedUser && message.trim() && !isSending
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isSending ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Send Message
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
