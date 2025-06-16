import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "vaibhav-twitter-dev.s3.ap-south-1.amazonaws.com",
    ],
  },
};

export default nextConfig;
