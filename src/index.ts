import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs, resolvers } from './schema/index.js';
import { configDotenv } from 'dotenv';

configDotenv();

const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

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
