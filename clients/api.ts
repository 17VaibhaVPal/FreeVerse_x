import { GraphQLClient } from "graphql-request";

const isClient = typeof window !== "undefined";

export const getGraphqlClient = () => {
  let headers = {};
  if (isClient) {
    const token = window.localStorage.getItem("__twitter_token");
    headers = {
      Authorization: token ? `Bearer ${token}` : "",
    };
  }

  return new GraphQLClient("http://localhost:8000/graphql", {
    headers,
  });
};
