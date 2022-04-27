import md5 from "js-md5";
import axios from "axios";

const ts = Number(new Date());
const hash = md5.create();
hash.update(
  ts + process.env.VUE_APP_API_KEY_PRIVATE + process.env.VUE_APP_API_KEY_PUBLIC
);

export default class ComicService {
  async fetchAll() {
    const response = await axios.get(
      `${process.env.VUE_APP_BASE_URL}/comics?ts=${ts}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`
    );
    return response.data.data;
  }

  async fetchAllForPaginate(offset) {
    const response = await axios.get(
      `${process.env.VUE_APP_BASE_URL}/comics?ts=${ts}&offset=${offset}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`
    );
    return response.data.data;
  }

  async fetchAllForPaginateWithSearch(title, offset) {
    const response = await axios.get(
      `${process.env.VUE_APP_BASE_URL}/comics?titleStartsWith=${title}&ts=${ts}&offset=${offset}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`
    );
    return response.data.data;
  }

  async fetchOne(comicId) {
    const response = await axios.get(
      `${process.env.VUE_APP_BASE_URL}/comics/${comicId}?ts=${ts}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`
    );
    return response.data.data;
  }

  async fetchComicCharacters(comicId) {
    const response = await axios.get(
      `${process.env.VUE_APP_BASE_URL}/comics/${comicId}/characters?ts=${ts}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`
    );
    return response.data.data;
  }

  async fetchComicCreators(comicId) {
    const response = await axios.get(
      `${process.env.VUE_APP_BASE_URL}/comics/${comicId}/creators?ts=${ts}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`
    );
    return response.data.data;
  }

  async fetchComicEvents(comicId) {
    const response = await axios.get(
      `${process.env.VUE_APP_BASE_URL}/comics/${comicId}/events?ts=${ts}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`
    );
    return response.data.data;
  }

  async fetchComicStories(comicId) {
    const response = await axios.get(
      `${process.env.VUE_APP_BASE_URL}/comics/${comicId}/stories?ts=${ts}&apikey=${process.env.VUE_APP_API_KEY_PUBLIC}&hash=${hash}`
    );
    return response.data.data;
  }
}
