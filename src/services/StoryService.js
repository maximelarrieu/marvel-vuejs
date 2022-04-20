import md5 from 'js-md5';
import axios from 'axios';

const ts = Number(new Date());
const hash = md5.create();
hash.update(ts + process.env.API_KEY_PRIVATE + process.env.API_KEY_PUBLIC);

export default class StoryService {
    async fetchAll() {
        const response = await axios.get(`${process.env.BASE_URL}/stories?ts=${ts}&apikey=${API_KEY_PUBLIC}&hash=${hash}`)
        return response.data
    }

    async fetchOne(storyId) {
        const response = await axios.get(`${process.env.BASE_URL}/stories/${storyId}?ts=${ts}&apikey=${API_KEY_PUBLIC}&hash=${hash}`)
        return response.data
    }

    async fetchStoryCharacters(storyId) {
        const response = await axios.get(`${process.env.BASE_URL}/stories/${storyId}/characters?ts=${ts}&apikey=${API_KEY_PUBLIC}&hash=${hash}`)
        return response.data
    }

    async fetchStoryComics(storyId) {
        const response = await axios.get(`${process.env.BASE_URL}/stories/${storyId}/comics?ts=${ts}&apikey=${API_KEY_PUBLIC}&hash=${hash}`)
        return response.data
    }

    async fetchStoryCreators(storyId) {
        const response = await axios.get(`${process.env.BASE_URL}/stories/${storyId}/creators?ts=${ts}&apikey=${API_KEY_PUBLIC}&hash=${hash}`)
        return response.data
    }

    async fetchStoryEvents(storyId) {
        const response = await axios.get(`${process.env.BASE_URL}/stories/${storyId}/events?ts=${ts}&apikey=${API_KEY_PUBLIC}&hash=${hash}`)
        return response.data
    }

    async fetchStorySeries(storyId) {
        const response = await axios.get(`${process.env.BASE_URL}/stories/${storyId}/series?ts=${ts}&apikey=${API_KEY_PUBLIC}&hash=${hash}`)
        return response.data
    }
}