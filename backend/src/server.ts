import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema";
import { root } from "./resolver";

const server = express();

server.use(
  "/graphql",
  graphqlHTTP({ schema, rootValue: root, graphiql: true })
);

export default server;
