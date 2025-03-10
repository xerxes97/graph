import axios from "axios";
import { sequelize } from "../database/index.js";
import RickAndMortyAPI from "../api/api.js";
import { Character } from "../database/models/character.js";

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

    enum CharacterStatus {
      Dead
      Alive
      Unknown
    }

    enum Gender {
      Female
      Male
      Genderless
      Unknown
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

    type CharactersData {
      info: Info
      data: [Character]
    }

    type Query {
        testConnections: String
        getCharacters(name: String, status: CharacterStatus, gender: Gender species: String, origin: String): CharactersData
        getCharacter(id: ID): Character
        testExternalCharacters: [ExternalCharacter]
    }
`;

export const resolvers = {
  Query: {
    getCharacters: async (_, args) => {
      const { count, rows } = await Character.findAndCountAll();
      return { info: { next: null, pages: Math.ceil(count / 10) }, data: rows };
    },
    getCharacter: async (_, args) => {
      const { id } = args;
      const character = await Character.findByPk(id);
      return character;
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
      } catch (error) {
        console.error(
          "Error en la consulta:",
          error.response?.data || error.message
        );
      }
    },
  },
};
