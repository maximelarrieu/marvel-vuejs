import md5 from 'js-md5';
import axios from 'axios';

const ts = Number(new Date());
const hash = md5.create();
hash.update(ts + process.env.API_KEY_PRIVATE + process.env.API_KEY_PUBLIC);

export default class EventService {
    async fetchAll() {
        const response = await axios.get(`${process.env.BASE_URL}/events?ts=${ts}&apikey=${API_KEY_PUBLIC}&hash=${hash}`)
        return response.data
    }

    async fetchOne(eventId) {
        const response = await axios.get(`${process.env.BASE_URL}/events/${eventId}?ts=${ts}&apikey=${API_KEY_PUBLIC}&hash=${hash}`)
        return response.data
    }

    async fetchEventCharacters(eventId) {
        const response = await axios.get(`${process.env.BASE_URL}/events/${eventId}/characters?ts=${ts}&apikey=${API_KEY_PUBLIC}&hash=${hash}`)
        return response.data
    }

    async fetchEventComics(eventId) {
        const response = await axios.get(`${process.env.BASE_URL}/events/${eventId}/comics?ts=${ts}&apikey=${API_KEY_PUBLIC}&hash=${hash}`)
        return response.data
    }

    async fetchEventCreators(eventId) {
        const response = await axios.get(`${process.env.BASE_URL}/events/${eventId}/creators?ts=${ts}&apikey=${API_KEY_PUBLIC}&hash=${hash}`)
        return response.data
    }

    async fetchEventSeries(eventId) {
        const response = await axios.get(`${process.env.BASE_URL}/events/${eventId}/series?ts=${ts}&apikey=${API_KEY_PUBLIC}&hash=${hash}`)
        return response.data
    }

    async fetchEventStories(eventId) {
        const response = await axios.get(`${process.env.BASE_URL}/events/${eventId}/stories?ts=${ts}&apikey=${API_KEY_PUBLIC}&hash=${hash}`)
        return response.data
    }
}