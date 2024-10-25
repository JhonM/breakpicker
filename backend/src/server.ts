import express from "express";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema";
import { root } from "./resolver";

const server = express();

server.use(cors());

server.use(
  "/graphql",
  cors<cors.CorsRequest>({ origin: ["http://localhost:1234"] }),
  graphqlHTTP({ schema, rootValue: root, graphiql: true })
);

export default server;
