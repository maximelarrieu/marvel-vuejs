import md5 from 'js-md5';
import axios from 'axios';

const BASE_URL='https://gateway.marvel.com:443/v1/public'
const API_KEY_PUBLIC='167ecd5061544223e5f3de0540244f56'
const API_KEY_PRIVATE='673f9ce90532f5276fe66fbe78ea129af6017910'

const ts = Number(new Date());
const hash = md5.create();
hash.update(ts + API_KEY_PRIVATE + API_KEY_PUBLIC);

export default class ComicService {

    async fetchAll() {
        const response = await axios.get(`${BASE_URL}/comics?ts=${ts}&apikey=${API_KEY_PUBLIC}&hash=${hash}`)
        return response.data.data
    }

    // async fetchAll() {
    //     const response = await axios.get(`${process.env.BASE_URL}/comics?ts=${ts}&apikey=${process.env.API_KEY_PUBLIC}&hash=${hash}`)
    //     console.log('response data', response.data)
    //     return response.data
    // }

    async fetchOne(comicId) {
        const response = await axios.get(`${BASE_URL}/comics/${comicId}?ts=${ts}&apikey=${API_KEY_PUBLIC}&hash=${hash}`)
        // console.log('response data', response.data.data)
        return response.data.data
    }

    async fetchComicCharacters(comicId) {
        const response = await axios.get(`${BASE_URL}/comics/${comicId}/characters?ts=${ts}&apikey=${API_KEY_PUBLIC}&hash=${hash}`)
        // console.log('response data', response.data.data)
        return response.data.data
    }

    // async fetchComicCharacters(comicId) {
    //     const response = await axios.get(`${process.env.BASE_URL}/comics/${comicId}/characters?ts=${ts}&apikey=${process.env.API_KEY_PUBLIC}&hash=${hash}`)
    //     return response.data
    // }

    async fetchComicCreators(comicId) {
        const response = await axios.get(`${BASE_URL}/comics/${comicId}/creators?ts=${ts}&apikey=${API_KEY_PUBLIC}&hash=${hash}`)
        // console.log('response data', response.data.data)
        return response.data.data
    }

    // async fetchComicCreators(comicId) {
    //     const response = await axios.get(`${process.env.BASE_URL}/comics/${comicId}/creators?ts=${ts}&apikey=${process.env.API_KEY_PUBLIC}&hash=${hash}`)
    //     return response.data
    // }

    async fetchComicEvents(comicId) {
        const response = await axios.get(`${BASE_URL}/comics/${comicId}/events?ts=${ts}&apikey=${API_KEY_PUBLIC}&hash=${hash}`)
        console.log('response data', response.data.data)
        return response.data.data
    }

    // async fetchComicEvents(comicId) {
    //     const response = await axios.get(`${process.env.BASE_URL}/comics/${comicId}/events?ts=${ts}&apikey=${process.env.API_KEY_PUBLIC}&hash=${hash}`)
    //     return response.data
    // }

    async fetchComicStories(comicId) {
        const response = await axios.get(`${BASE_URL}/comics/${comicId}/stories?ts=${ts}&apikey=${API_KEY_PUBLIC}&hash=${hash}`)
        // console.log('response data', response.data.data)
        return response.data.data
    }

    // async fetchComicStories(comicId) {
    //     const response = await axios.get(`${process.env.BASE_URL}/comics/${comicId}/stories?ts=${ts}&apikey=${process.env.API_KEY_PUBLIC}&hash=${hash}`)
    //     return response.data
    // }
}