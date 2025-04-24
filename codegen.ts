
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:8000/graphql",//get schemna form here 
   documents: "**/*.{tsx,ts}",  //all typescript files in current directory
  generates: {//generte all typescript on frontend in this particular folder  
    "gql/": {
      preset: "client",
      plugins: []
    },
    "./graphql.schema.json": {
      plugins: ["introspection"]
    }
  }
};

export default config;
