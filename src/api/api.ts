import axios from "axios";
import { getCharactersQuery, getLocations } from "./query.js";
import { HEADERS } from "../constants/index.js";

class RickAndMortyAPI {
  apiURL: string;

  constructor() {
    this.apiURL = "https://rickandmortyapi.com/graphql";
  }

  async getCharacters(): Promise<any> {
    try {
      const results = [];
      let page = 1;

        while (page !== null) {
        console.log("page", page);
        const query = getCharactersQuery(page);
        const { data } = await axios.post(
            this.apiURL,
            { query },
            { headers: HEADERS }
        );
        const { characters } = data.data;
        results.push(...characters.results);
        console.log("page", characters.info);
        page = characters.info.next;
    }
      console.log(results.length);
      return results;
    } catch (error) {
      throw new Error(`Error en la consulta: ${error}`);
    }
  }

  async getLocations(): Promise<any> {
    const { data } = await axios.post(
      this.apiURL,
      { query: getLocations },
      { headers: HEADERS }
    );
    return data.data;
  }
}

export default new RickAndMortyAPI();
