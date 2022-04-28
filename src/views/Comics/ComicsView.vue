<template>
  <div class="container">
    <input
      type="text"
      @input="fetchAllComicsWithSearch(search, 0)"
      v-model="search"
      class="form-control mb-5"
      placeholder="Search a comics..."
    />
    <h2>Les Comics</h2>
    <div class="m-5" v-if="isLoading">
      <loader />
    </div>
    <div v-else class="comics-container row">
      <div
        v-for="comic in comics"
        :key="comic.id"
        class="col-md-3 comic-preview"
        @click="goToComicDetail(comic.id)"
      >
        <img :src="`${comic.thumbnail.path}.${comic.thumbnail.extension}`" />
        <p class="comic-title">{{ comic.title }}</p>
      </div>
    </div>
    <div class="pagination">
      <paginate
        v-if="!isLoading && this.search.length === 0"
        v-model="currentPage"
        :page-count="this.nbPages"
        :page-range="5"
        :margin-pages="5"
        :click-handler="clickCallback"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
        :page-class="'page-item'"
      >
      </paginate>
    </div>
  </div>
</template>

<script>
import ComicService from "../../services/ComicService";
import Paginate from "vuejs-paginate-next";
import LoaderComponent from "../../components/Loader/Loader.vue";

export default {
  name: "ComicsView",
  components: {
    paginate: Paginate,
    loader: LoaderComponent,
  },
  data() {
    return {
      currentPage: 1,
      isLoading: true,
      limit: 20,
      comics: [],
      comicImage: "",
      totalComics: 0,
      nbPages: 0,
      search: "",
    };
  },
  created() {
    this.comicService = new ComicService();
  },
  mounted() {
    this.fetchAllComics(0);
  },
  methods: {
    async fetchAllComics(offset) {
      this.isLoading = true;
      try {
        await this.comicService
          .fetchAllForPaginate(offset === 1 ? 0 : offset)
          .then((data) => {
            this.comics = data.results;
            this.totalComics = data.total;
            this.nbPages = Math.floor(data.total / this.limit);
          });
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchAllComicsWithSearch(title, offset) {
      this.isLoading = true;
      try {
        await this.comicService
          .fetchAllForPaginateWithSearch(title, offset === 1 ? 0 : offset)
          .then((data) => {
            this.comics = data.results;
            this.totalComics = data.total;
            this.nbPages = Math.floor(data.total / this.limit);
          });
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async goToComicDetail(id) {
      this.$router.push(`/comics/${id}`);
    },
    clickCallback(pageNum) {
      this.fetchAllComics((pageNum - 1) * this.limit);
    },
    clickCallbackWithSearch(pageNum) {
      this.fetchAllComicsWithSearch(this.search, (pageNum - 1) * this.limit);
    },
  },
  computed: {
    rows() {
      return this.comics.length;
    },
  },
};
</script>
