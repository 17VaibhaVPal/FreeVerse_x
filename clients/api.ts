import { GraphQLClient } from "graphql-request";

const isClient = typeof window !== "undefined";

export const getGraphqlClient = (token?: string): GraphQLClient => {
  let headers: Record<string, string> = {};

  // ✅ Always use the passed token if available
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  } else if (isClient) {
    // fallback if token not passed but in localStorage
    const clientToken = window.localStorage.getItem("__twitter_token");
    if (clientToken) {
      headers.Authorization = `Bearer ${clientToken}`;
    }
  }
  //https://d2ulf7ww0gvd5i.cloudfront.net/graphql -> use this apollo deployed server

  return new GraphQLClient(process.env.NEXT_PUBLIC_API_URL as string, {
    headers,
  });
};
