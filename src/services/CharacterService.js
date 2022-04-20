import md5 from 'js-md5';
import axios from 'axios';

const ts = Number(new Date());
const hash = md5.create();
hash.update(ts + process.env.API_KEY_PRIVATE + process.env.API_KEY_PUBLIC);

export default class CharacterService {
    async fetchAll() {
        const response = await axios.get(`${process.env.BASE_URL}/characters?ts=${ts}&apikey=${API_KEY_PUBLIC}&hash=${hash}`)
        return response.data
    }

    async fetchOne(characterId) {
        const response = await axios.get(`${process.env.BASE_URL}/characters/${characterId}?ts=${ts}&apikey=${API_KEY_PUBLIC}&hash=${hash}`)
        return response.data
    }

    async fetchCharacterComics(characterId) {
        const response = await axios.get(`${process.env.BASE_URL}/characters/${characterId}/comics?ts=${ts}&apikey=${API_KEY_PUBLIC}&hash=${hash}`)
        return response.data
    }

    async fetchCharacterEvents(characterId) {
        const response = await axios.get(`${process.env.BASE_URL}/characters/${characterId}/events?ts=${ts}&apikey=${API_KEY_PUBLIC}&hash=${hash}`)
        return response.data
    }

    async fetchCharacterSeries(characterId) {
        const response = await axios.get(`${process.env.BASE_URL}/characters/${characterId}/series?ts=${ts}&apikey=${API_KEY_PUBLIC}&hash=${hash}`)
        return response.data
    }

    async fetchCharacterStories(characterId) {
        const response = await axios.get(`${process.env.BASE_URL}/characters/${characterId}/stories?ts=${ts}&apikey=${API_KEY_PUBLIC}&hash=${hash}`)
        return response.data
    }
}