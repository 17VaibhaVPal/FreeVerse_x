import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://d2ulf7ww0gvd5i.cloudfront.net/graphql", //get schemna form here
  documents: "**/*.{tsx,ts}", //all typescript files in current directory
  generates: {
    //generte all typescript on frontend in this particular folder
    "gql/": {
      preset: "client",
      plugins: [],
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};

export default config;
