import { useState } from "react";
import { useRouter } from "next/router";
import TwitterLayout from "@/components/FeedCard/layout/TwitterLayout";
import toast from "react-hot-toast";
import { gql, request } from "graphql-request";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LOGIN_EMAIL_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    loginWithEmail(email: $email, password: $password)
  }
`;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  type LoginResponse = {
    loginWithEmail: string;
  };

  const handleLogin = async () => {
    try {
      const data = await request<LoginResponse>(
        "http://localhost:8000/graphql",
        LOGIN_EMAIL_MUTATION,
        {
          email,
          password,
        }
      );

      const token = data.loginWithEmail;

      if (!token) throw new Error("Login failed");

      localStorage.setItem("__twitter_token", token);
      toast.success("Logged in successfully!");
      router.push("/");
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    }
  };

  return (
    <TwitterLayout>
      <div className="flex justify-center items-center h-[80vh]">
        <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg w-[400px] hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-3xl font-bold mb-6 text-center">Log In</h2>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 rounded bg-gray-800 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-6 relative">
            <label className="block mb-2 text-sm font-medium">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-2 pr-10 rounded bg-gray-800 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute top-[38px] right-3 text-white"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-2 rounded text-white text-lg"
          >
            Log In
          </button>
        </div>
      </div>
    </TwitterLayout>
  );
}
