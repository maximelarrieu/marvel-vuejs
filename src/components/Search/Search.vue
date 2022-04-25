<template>
  <div class="container">
    <input
      type="text"
      v-model="search"
      class="form-control mb-5"
      placeholder="Search"
    />
    <paginate
      v-if="!isLoading"
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
</template>

<script>
import ComicService from "../../services/ComicService";
import Paginate from "vuejs-paginate-next";

export default {
  name: "SearchComponent",
  components: {
    paginate: Paginate,
  },
  props: {
    entity: String
  },
  data() {
    return {
      currentPage: 1,
      isLoading: true,
      limit: 20,
      comics: [],
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
  },
  computed: {
    rows() {
      return this.comics.length;
    },
    filteredComics() {
      return this.comics.filter(comic => {
        return comic.title.toLowerCase().indexOf(this.search.toLowerCase()) != -1
      })
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
</style>
