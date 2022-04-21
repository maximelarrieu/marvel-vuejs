<template>
  <div class="container">
    <input
      type="text"
      class="form-control mb-5"
      placeholder="Rechercher un comics"
    />
    <h2>Liste des comics</h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="comic in comics" :key="comic.id">
          <td>{{ comic.title }}</td>
          <td>
            <button class="btn btn-primary" @click="goToComicDetail(comic.id)">
              Voir les détails
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <paginate
      :page-count="this.nbPages"
      :page-range="3"
      :margin-pages="2"
      :click-handler="clickCallback"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
      :page-class="'page-item'"
    >
    </paginate>
  </div>
</template>

<script>
import ComicService from "../services/ComicService";
import Paginate from "vuejs-paginate-next";

export default {
  name: "HomeView",
  components: {
    paginate: Paginate,
  },
  data() {
    return {
      limit: 20,
      comics: [],
      totalComics: 0,
      nbPages: 0,
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
      await this.comicService
        .fetchAllForPaginate(offset === 1 ? 0 : offset)
        .then((data) => {
          this.comics = data.results;
          this.totalComics = data.total;
          this.nbPages = Math.floor(data.total / this.limit);
        });
    },
    async goToComicDetail(id) {
      this.$router.push(`/comic/${id}`);
    },
    clickCallback(pageNum) {
      this.fetchAllComics((pageNum - 1) * this.limit);
    },
  },
  computed: {
    rows() {
      return this.comics.length;
    },
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
</style>
