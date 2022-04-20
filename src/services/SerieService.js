import md5 from 'js-md5';
import axios from 'axios';

const ts = Number(new Date());
const hash = md5.create();
hash.update(ts + process.env.API_KEY_PRIVATE + process.env.API_KEY_PUBLIC);

export default class SerieService {
    async fetchAll() {
        const response = await axios.get(`${process.env.BASE_URL}/series?ts=${ts}&apikey=${API_KEY_PUBLIC}&hash=${hash}`)
        return response.data
    }

    async fetchOne(serieId) {
        const response = await axios.get(`${process.env.BASE_URL}/series/${serieId}?ts=${ts}&apikey=${API_KEY_PUBLIC}&hash=${hash}`)
        return response.data
    }

    async fetchSerieCharacters(serieId) {
        const response = await axios.get(`${process.env.BASE_URL}/series/${serieId}/characters?ts=${ts}&apikey=${API_KEY_PUBLIC}&hash=${hash}`)
        return response.data
    }

    async fetchSerieComics(serieId) {
        const response = await axios.get(`${process.env.BASE_URL}/series/${serieId}/comics?ts=${ts}&apikey=${API_KEY_PUBLIC}&hash=${hash}`)
        return response.data
    }

    async fetchSerieCreators(serieId) {
        const response = await axios.get(`${process.env.BASE_URL}/series/${serieId}/creators?ts=${ts}&apikey=${API_KEY_PUBLIC}&hash=${hash}`)
        return response.data
    }

    async fetchSerieEvents(serieId) {
        const response = await axios.get(`${process.env.BASE_URL}/series/${serieId}/events?ts=${ts}&apikey=${API_KEY_PUBLIC}&hash=${hash}`)
        return response.data
    }

    async fetchSerieStories(serieId) {
        const response = await axios.get(`${process.env.BASE_URL}/series/${serieId}/stories?ts=${ts}&apikey=${API_KEY_PUBLIC}&hash=${hash}`)
        return response.data
    }
}