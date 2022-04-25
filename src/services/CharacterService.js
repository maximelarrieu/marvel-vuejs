import md5 from "js-md5";
import axios from "axios";

const ts = Number(new Date());
const hash = md5.create();
hash.update(
  ts + process.env.VUE_APP_API_KEY_PRIVATE + process.env.VUE_APP_API_KEY_PUBLIC
);

export default class CharacterService {
    async fetchAll() {
        const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/characters?ts=${ts}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`)
        return response.data.data
    }

    async fetchAllForPaginate(offset) {
        const response = await axios.get(
        `${process.env.VUE_APP_BASE_URL}/characters?ts=${ts}&limit=20&offset=${offset}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`
        );
        return response.data.data;
    }

    async fetchAllForPaginateWithSearch(name, offset) {
        const response = await axios.get(
        `${process.env.VUE_APP_BASE_URL}/characters?nameStartsWith=${name}&ts=${ts}&limit=20&offset=${offset}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`
        );
        console.log(`${process.env.VUE_APP_BASE_URL}/characters?nameStartsWith=${name}&ts=${ts}&limit=20&offset=${offset}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`)
        return response.data.data;
    }

    async fetchOne(characterId) {
        const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/characters/${characterId}?ts=${ts}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`)
        return response.data.data
    }

    async fetchCharacterComics(characterId) {
        const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/characters/${characterId}/comics?ts=${ts}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`)
        return response.data.data
    }

    async fetchCharacterEvents(characterId) {
        const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/characters/${characterId}/events?ts=${ts}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`)
        return response.data.data
    }

    async fetchCharacterSeries(characterId) {
        const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/characters/${characterId}/series?ts=${ts}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`)
        return response.data.data
    }

    async fetchCharacterStories(characterId) {
        const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/characters/${characterId}/stories?ts=${ts}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`)
        return response.data.data
    }
}
