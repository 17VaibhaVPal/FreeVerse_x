// C:\Twitter project\twitter-client\clients\api.ts
import { GraphQLClient } from "graphql-request";

const isClient = typeof window !== "undefined";

export const getGraphqlClient = (token?: string): GraphQLClient => {
  let headers: Record<string, string> = {};

  if (isClient) {
    const clientToken = window.localStorage.getItem("__twitter_token");
    if (clientToken) {
      headers.Authorization = `Bearer ${clientToken}`;
    }
  } else if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return new GraphQLClient("https://d2ulf7ww0gvd5i.cloudfront.net/graphql", {
    headers,
  });
};

export const syncTokenFromCookies = async () => {
  if (!isClient) return;
  try {
    const response = await fetch('/api/get-token');
    if (response.ok) {
      const { token } = await response.json();
      if (token) {
        window.localStorage.setItem("__twitter_token", token);
      }
    }
  } catch (error) {
    console.error('Failed to sync token from cookies:', error);
  }
};
