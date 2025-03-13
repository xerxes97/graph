import { typeDefs, resolvers } from "./schema/index.js";
import { configDotenv } from "dotenv";
import responseTime from "response-time";
import cron from "node-cron";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectRedis } from "./common/redis.js";

configDotenv();

const app = express();
const httpServer = http.createServer(app);

// cron.schedule('*/2 * * * * *', () => {
//   console.log('Running a task every minute', new Date());
// })

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();
await connectRedis();

app.use(responseTime());

app.use(
  cors(),
  bodyParser.json(),
  expressMiddleware(server),
);

await new Promise<void>((resolve) => httpServer.listen({ port: process.env.PORT }, resolve));
console.log(`🚀 Server ready at port ${process.env.PORT}`);
