import axios from "axios";
import { sequelize } from "../database/index.js";
import RickAndMortyAPI from "../api/api.js";

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

export const typeDefs = `#graphql
    type Book {
        title: String
        Author: String
    }

    type Character {
        id: ID
        name: String
    }

    type Info {
        pages: Int
        next: Int
    }

    type ExternalCharacter {
        name: String
    }

    type ExternalCharacters {
      characters: Info
      results: [ExternalCharacter]
    }

    type Query {
        books: [Book]
        testConnections: String
        getCharacters: [Character]
        testExternal: [Character]
        testExternalCharacters: [ExternalCharacter]
    }
`;

export const resolvers = {
  Query: {
    books: () => books,
    getCharacters: async () => {
      return await RickAndMortyAPI.getCharacters();
    },
    testExternal: async () => {
        try {
            const response = await axios.post(
                "https://rickandmortyapi.com/graphql",
                {
                    query: `
                    query {
                        characters {
                            info {
                                pages
                            }
                            results {
                                species
                                name
                            }
                        }
                    }`
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
    
            console.log(response.data.data.characters.results);
        } catch (error) {
            console.error("Error en la consulta:", error.response?.data || error.message);
        };
    },
    testConnections: async () => {
      try {
        await sequelize.authenticate();
        return "Connection has been established successfully.";
      } catch (error) {
        console.error("Unable to connect to the database:", error);
        return error?.message;
      }
    },
    testExternalCharacters: async () => {
      try {
        const characters = await RickAndMortyAPI.getCharacters();
        return characters;
      }
      catch (error) {console.error("Error en la consulta:", error.response?.data || error.message);}
    }
  },
};
