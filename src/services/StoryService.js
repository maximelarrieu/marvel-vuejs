import md5 from 'js-md5';
import axios from 'axios';

const ts = Number(new Date());
const hash = md5.create();
hash.update(ts + process.env.VUE_APP_API_KEY_PRIVATE + process.env.VUE_APP_API_KEY_PUBLIC);

export default class StoryService {
    async fetchAll() {
        const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/stories?ts=${ts}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`)
        return response.data.data
    }

    async fetchAllForPaginate(offset) {
        const response = await axios.get(
        `${process.env.VUE_APP_BASE_URL}/events?ts=${ts}&limit=20&offset=${offset}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`
        );
        return response.data.data;
    }

    async fetchOne(storyId) {
        const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/stories/${storyId}?ts=${ts}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`)
        console.log("response", response.data.data);
        return response.data.data
    }

    async fetchStoryCharacters(storyId) {
        const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/stories/${storyId}/characters?ts=${ts}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`)
        return response.data.data
    }

    async fetchStoryComics(storyId) {
        const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/stories/${storyId}/comics?ts=${ts}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`)
        return response.data.data
    }

    async fetchStoryCreators(storyId) {
        const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/stories/${storyId}/creators?ts=${ts}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`)
        return response.data.data
    }

    async fetchStoryEvents(storyId) {
        const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/stories/${storyId}/events?ts=${ts}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`)
        return response.data.data
    }

    async fetchStorySeries(storyId) {
        const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/stories/${storyId}/series?ts=${ts}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`)
        return response.data.data
    }
}