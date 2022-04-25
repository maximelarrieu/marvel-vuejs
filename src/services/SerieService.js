import md5 from "js-md5";
import axios from "axios";

const ts = Number(new Date());
const hash = md5.create();
hash.update(
  ts + process.env.VUE_APP_API_KEY_PRIVATE + process.env.VUE_APP_API_KEY_PUBLIC
);

export default class SerieService {
    async fetchAll() {
        const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/series?ts=${ts}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`)
        return response.data.data
    }

    async fetchAllForPaginate(offset) {
        const response = await axios.get(
        `${process.env.VUE_APP_BASE_URL}/series?ts=${ts}&limit=20&offset=${offset}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`
        );
        return response.data.data;
    }

    async fetchAllForPaginateWithSearch(title, offset) {
        const response = await axios.get(
        `${process.env.VUE_APP_BASE_URL}/series?titleStartsWith=${title}&ts=${ts}&limit=20&offset=${offset}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`
        );
        return response.data.data;
    }

    async fetchOne(serieId) {
        const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/series/${serieId}?ts=${ts}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`)
        return response.data.data
    }

    async fetchSerieCharacters(serieId) {
        const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/series/${serieId}/characters?ts=${ts}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`)
        return response.data.data
    }

    async fetchSerieComics(serieId) {
        const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/series/${serieId}/comics?ts=${ts}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`)
        return response.data.data
    }

    async fetchSerieCreators(serieId) {
        const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/series/${serieId}/creators?ts=${ts}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`)
        return response.data.data
    }

    async fetchSerieEvents(serieId) {
        const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/series/${serieId}/events?ts=${ts}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`)
        return response.data.data
    }

    async fetchSerieStories(serieId) {
        const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/series/${serieId}/stories?ts=${ts}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`)
        return response.data.data
    }
}
