import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs, resolvers } from './schema/index.js';
import { configDotenv } from 'dotenv';
import cron from 'node-cron';

configDotenv();

const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // cron.schedule('*/2 * * * * *', () => {
  //   console.log('Running a task every minute', new Date());
  // })

  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(process.env.PORT) },
    context: async ({ req }) => {
      return {
        dataSources: {
          books: [],
        },
      };
    }
  });
  
  console.log(`🚀  Server ready at: ${url}`);
