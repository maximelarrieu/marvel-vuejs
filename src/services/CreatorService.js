import md5 from 'js-md5';
import axios from 'axios';

const ts = Number(new Date());
const hash = md5.create();
hash.update(ts + process.env.VUE_APP_API_KEY_PRIVATE + process.env.VUE_APP_API_KEY_PUBLIC);

export default class CreatorService {
    async fetchAll() {
        const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/creators?ts=${ts}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`)
        return response.data.data
    }

    async fetchOne(creatorId) {
        const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/creators/${creatorId}?ts=${ts}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`)
        console.log('response', response.data.data);
        return response.data.data
    }

    async fetchCreatorComics(creatorId) {
        const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/creators/${creatorId}/comics?ts=${ts}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`)
        return response.data.data
    }

    async fetchCreatorEvents(creatorId) {
        const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/creators/${creatorId}/events?ts=${ts}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`)
        return response.data.data
    }

    async fetchCreatorSeries(creatorId) {
        const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/creators/${creatorId}/series?ts=${ts}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`)
        return response.data.data
    }

    async fetchCreatorStories(creatorId) {
        const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/creators/${creatorId}/stories?ts=${ts}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`)
        return response.data.data
    }
}