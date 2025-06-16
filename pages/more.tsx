import { useState } from "react";
import { useRouter } from "next/router";
import TwitterLayout from "@/components/FeedCard/layout/TwitterLayout";

export default function MorePage() {
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const handleSignOut = () => {
    setShowConfirm(true);
  };

  const confirmSignOut = () => {
    localStorage.removeItem("__twitter_token");
    router.push("/");
  };

  const cancelSignOut = () => {
    setShowConfirm(false);
    router.push("/");
  };

  return (
    <TwitterLayout>
      <div className="flex justify-center items-center h-[80vh]">
        <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg w-[400px] hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-3xl font-bold mb-6 text-center">More Options</h2>

          {!showConfirm ? (
            <button
              className="w-full bg-red-600 hover:bg-red-700 transition-colors text-white px-4 py-2 rounded text-lg"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          ) : (
            <div className="text-center">
              <p className="mb-4 text-lg">Are you sure you want to sign out?</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={confirmSignOut}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
                >
                  Yes
                </button>
                <button
                  onClick={cancelSignOut}
                  className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-white"
                >
                  No
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </TwitterLayout>
  );
}
