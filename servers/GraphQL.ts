import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import resolvers from "../resolvers/resolvers";
import fs from "fs";
import { UserType } from "../models/User";
import connectDB from "../middleware/connectDB";
import Courses from "../routes/Courses";

export default async function () {
  const app = express();
  app.use(connectDB); // to support Mongo DB connection
  app.use("/api/courses", Courses);
  // app.use(auth);

  const server = new ApolloServer({
    typeDefs: gql(fs.readFileSync("./schemas/schemas.gql", "utf8")),
    resolvers: resolvers as any,
    context: ({ req }) => ({
      user: (req as any as { user: UserType }).user,
    }),
  });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}
