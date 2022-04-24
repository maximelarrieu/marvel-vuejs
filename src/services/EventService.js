import md5 from 'js-md5';
import axios from 'axios';

const ts = Number(new Date());
const hash = md5.create();
hash.update(ts + process.env.VUE_APP_API_KEY_PRIVATE + process.env.VUE_APP_API_KEY_PUBLIC);

export default class EventService {
    async fetchAll() {
        const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/events?ts=${ts}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`)
        return response.data.data
    }

    async fetchAllForPaginate(offset) {
        const response = await axios.get(
        `${process.env.VUE_APP_BASE_URL}/events?ts=${ts}&limit=20&offset=${offset}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`
        );
        return response.data.data;
    }

    async fetchOne(eventId) {
        const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/events/${eventId}?ts=${ts}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`)
        return response.data.data
    }

    async fetchEventCharacters(eventId) {
        const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/events/${eventId}/characters?ts=${ts}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`)
        return response.data.data
    }

    async fetchEventComics(eventId) {
        const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/events/${eventId}/comics?ts=${ts}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`)
        return response.data.data
    }

    async fetchEventCreators(eventId) {
        const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/events/${eventId}/creators?ts=${ts}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`)
        return response.data.data
    }

    async fetchEventSeries(eventId) {
        const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/events/${eventId}/series?ts=${ts}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`)
        console.log('series', response.data.data);
        return response.data.data
    }

    async fetchEventStories(eventId) {
        const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/events/${eventId}/stories?ts=${ts}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`)
        console.log('stories', response.data.data);
        return response.data.data
    }
}