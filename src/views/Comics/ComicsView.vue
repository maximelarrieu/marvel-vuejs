<template>
  <div class="container">
    <input
      type="text"
      @input="fetchAllComicsWithSearch(search, 0)"
      v-model="search"
      class="form-control mb-5"
      placeholder="Search a comics..."
    />
    <h2>Comics list</h2>
    <div class="m-5" v-if="isLoading">
      <loader />
    </div>
    <table v-else class="table table-striped">
      <thead>
        <tr>
          <th></th>
          <th scope="col">Title</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="comic in comics" :key="comic.id">
          <td><img :src="`${comic.thumbnail.path}.${comic.thumbnail.extension}`" /></td>
          <td>{{ comic.title }}</td>
          <td>
            <button class="btn btn-primary" @click="goToComicDetail(comic.id)">
              Show details
            </button>
          </td>
        </tr>
      </tbody>
    </table>
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
    <paginate
      v-if="!isLoading && this.search.length > 0"
      v-model="currentPage"
      :page-count="this.nbPages"
      :page-range="5"
      :margin-pages="5"
      :click-handler="clickCallbackWithSearch"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
      :page-class="'page-item'"
    >
    </paginate>
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
      search: ""
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
          })
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
          })
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
    }
  },
  computed: {
    rows() {
      return this.comics.length;
    }
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
img {
  width: 100px;
  height: 100px;
}
</style>
