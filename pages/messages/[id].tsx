"use client";
import { useRouter } from "next/router";
import { useMessages } from "@/hooks/messages";
import { useCurrentUser } from "@/hooks/user";
import { useState, useEffect, useRef } from "react";
import { getGraphqlClient } from "@/clients/api";
import { gql } from "graphql-request";
import Image from "next/image";
import { getUserByIdQuery } from "@/graphql/query/user";

const SEND_MESSAGE_MUTATION = gql`
  mutation SendMessage($to: ID!, $content: String!) {
    sendMessage(to: $to, content: $content)
  }
`;

const MARK_MESSAGES_AS_READ = gql`
  mutation MarkMessagesAsRead($fromId: ID!) {
    markMessagesAsRead(fromId: $fromId)
  }
`;

// TypeScript declarations for Speech Recognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onend: () => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  length: number;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
}

interface SpeechRecognitionErrorEvent {
  error: string;
}

interface Message {
  id: string;
  content: string;
  createdAt: string;
  from: {
    id: string;
    firstName: string;
    lastName: string;
  };
  to: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export default function ChatPage() {
  const { user } = useCurrentUser();
  const router = useRouter();
  const { id: recipientId } = router.query;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [recipientUser, setRecipientUser] = useState<null | {
    id: string;
    firstName: string;
    lastName?: string | null;
    email: string;
    profileImageURL?: string | null;
  }>(null);

  const { data, refetch, isLoading } = useMessages(
    typeof recipientId === "string" ? recipientId : ""
  );

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition =
        window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event: any) => {
        let transcript = "";
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setMessage(transcript);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const handleSend = async () => {
    if (!message.trim() || !recipientId) return;

    await getGraphqlClient().request(SEND_MESSAGE_MUTATION, {
      to: recipientId,
      content: message,
    });

    setMessage("");
    refetch();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleVoiceRecording = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition not supported in this browser");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const messages = data?.getMessagesWithUser ?? [];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch recipient user info
  useEffect(() => {
    const fetchRecipient = async () => {
      if (typeof recipientId !== "string") return;
      try {
        const res = await getGraphqlClient().request(getUserByIdQuery, {
          id: recipientId,
        });
        const user = res.getUserById;
        if (user) {
          const { id, firstName, lastName, email, profileImageURL } = user;
          setRecipientUser({ id, firstName, lastName, email, profileImageURL });
        }
      } catch (err) {
        console.error("Failed to fetch recipient info:", err);
      }
    };
    fetchRecipient();
  }, [recipientId]);

  useEffect(() => {
    const markAsRead = async () => {
      if (typeof recipientId !== "string") return;
      try {
        await getGraphqlClient().request(MARK_MESSAGES_AS_READ, {
          fromId: recipientId,
        });
      } catch (err) {
        console.error("Error marking messages as read:", err);
      }
    };

    markAsRead();
  }, [recipientId]);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return ""; // fallback
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (timestamp: string) => {
    const messageDate = new Date(timestamp);
    if (isNaN(messageDate.getTime())) return ""; // fallback

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const msgDateOnly = messageDate.toDateString();
    const todayOnly = today.toDateString();
    const yesterdayOnly = yesterday.toDateString();

    if (msgDateOnly === todayOnly) return "Today";
    if (msgDateOnly === yesterdayOnly) return "Yesterday";

    return messageDate.toLocaleDateString(undefined, {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  };

  const shouldShowDateSeparator = (
    currentMsg: Message,
    prevMsg: Message | null
  ) => {
    if (!prevMsg) return true;

    const currentDate = new Date(currentMsg.createdAt);
    const prevDate = new Date(prevMsg.createdAt);

    return currentDate.toDateString() !== prevDate.toDateString();
  };

  const groupMessagesByDate = () => {
    const grouped: Record<string, Message[]> = {};

    (messages as Message[]).forEach((msg: Message) => {
      const dateKey = formatDate(msg.createdAt);
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey]!.push(msg);
    });

    return grouped;
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4 shadow-lg">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {recipientUser ? (
            <div className="flex items-center gap-3 flex-1">
              <div className="relative">
                <Image
                  src={recipientUser.profileImageURL || "/default-pfp.png"}
                  alt="Profile"
                  width={45}
                  height={45}
                  className="rounded-full border-2 border-gray-600"
                />
              </div>
              <div className="flex-1">
                <p className="text-lg font-semibold text-white">
                  {recipientUser.firstName} {recipientUser.lastName}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-700 rounded-full animate-pulse"></div>
              <div className="space-y-2">
                <div className="w-32 h-4 bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Messages Container */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23374151' fill-opacity='0.05'%3E%3Cpath d='m0 40l40-40h-40v40zm40-40v40h-40l40-40z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mb-4">
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
            <p className="text-lg">Start your conversation</p>
            <p className="text-sm">Send a message to begin chatting</p>
          </div>
        ) : (
          Object.entries(groupMessagesByDate()).map(
            ([dateKey, dateMessages]) => (
              <div key={dateKey}>
                {/* Date Separator */}
                <div className="flex justify-center mb-4">
                  <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs font-medium">
                    {dateKey}
                  </span>
                </div>

                {/* Messages for this date */}
                {dateMessages.map((msg, index) => {
                  const isOwn = msg.from.id === user?.id;

                  return (
                    <div
                      key={msg.id}
                      className={`flex ${
                        isOwn ? "justify-end" : "justify-start"
                      } mb-1`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl ${
                          isOwn
                            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-sm"
                            : "bg-white text-gray-800 rounded-bl-sm"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            isOwn ? "text-blue-100" : "text-gray-500"
                          }`}
                        >
                          {formatTime(msg.createdAt)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          )
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-gray-800 border-t border-gray-700 p-4">
        <div className="flex items-end gap-3">
          {/* Voice Recording Button */}
          <button
            onClick={toggleVoiceRecording}
            className={`p-3 rounded-full transition-all duration-200 ${
              isListening
                ? "bg-red-500 hover:bg-red-600 text-white animate-pulse"
                : "text-gray-400 hover:text-white hover:bg-gray-700"
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
          </button>
          {/* File Attachment Button */}
          <label className="p-3 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 cursor-pointer transition-all duration-200">
            <input
              type="file"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setSelectedFile(file);
              }}
            />
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828L18 9.828M16 5a2 2 0 112.828 2.828L9.414 17H6v-3.414L16 5z"
              />
            </svg>
          </label>

          {/* Message Input */}
          <div className="flex-1 relative">
            <textarea
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-3xl text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder={isListening ? "Listening..." : "Type a message..."}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              rows={1}
              style={{ maxHeight: "120px" }}
            />
            {isListening && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              </div>
            )}
          </div>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className={`p-3 rounded-full transition-all duration-200 ${
              message.trim()
                ? "bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl"
                : "bg-gray-600 text-gray-400 cursor-not-allowed"
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>

        {isListening && (
          <div className="mt-2 text-center">
            <span className="text-red-400 text-sm">
              🎤 Listening... Speak now
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
