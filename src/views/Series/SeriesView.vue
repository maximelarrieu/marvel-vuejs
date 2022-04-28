<template>
  <div class="container">
    <input
      type="text"
      @input="fetchAllSeriesWithSearch(search, 0)"
      v-model="search"
      class="form-control mb-5"
      placeholder="Search a serie..."
    />
    <h2>Les Series</h2>
    <div class="m-5" v-if="isLoading">
      <loader />
    </div>
    <div v-else class="series-container row">
      <div
        v-for="serie in series"
        :key="serie.id"
        class="col-md-3 serie-preview"
        @click="goToSerieDetail(serie.id)"
      >
        <img :src="`${serie.thumbnail.path}.${serie.thumbnail.extension}`" />
        <p class="serie-title">{{ serie.title }}</p>
      </div>
    </div>

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
import SerieService from "../../services/SerieService";
import Paginate from "vuejs-paginate-next";
import LoaderComponent from "../../components/Loader/Loader.vue";

export default {
  name: "SeriesView",
  components: {
    paginate: Paginate,
    loader: LoaderComponent,
  },
  data() {
    return {
      currentPage: 1,
      isLoading: true,
      limit: 20,
      series: [],
      totalSeries: 0,
      nbPages: 0,
      search: "",
    };
  },
  created() {
    this.serieService = new SerieService();
  },
  mounted() {
    this.fetchAllSeries(0);
  },
  methods: {
    async fetchAllSeries(offset) {
      try {
        await this.serieService
          .fetchAllForPaginate(offset === 1 ? 0 : offset)
          .then((data) => {
            this.series = data.results;
            this.totalSeries = data.total;
            this.nbPages = Math.floor(data.total / this.limit);
          });
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchAllSeriesWithSearch(title, offset) {
      try {
        await this.serieService
          .fetchAllForPaginateWithSearch(title, offset === 1 ? 0 : offset)
          .then((data) => {
            this.series = data.results;
            this.totalSeries = data.total;
            this.nbPages = Math.floor(data.total / this.limit);
          });
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async goToSerieDetail(id) {
      this.$router.push(`/series/${id}`);
    },
    clickCallback(pageNum) {
      this.isLoading = true;
      this.fetchAllSeries((pageNum - 1) * this.limit);
    },
    clickCallbackWithSearch(pageNum) {
      this.isLoading = true;
      this.fetchAllSeries(this.search, (pageNum - 1) * this.limit);
    },
  },
  computed: {
    rows() {
      return this.series.length;
    },
  },
};
</script>

<style scoped>
.series-container {
  margin-top: 3rem;
}
.serie-preview {
  margin-bottom: 2rem;
}

.serie-preview img {
  transition: transform 100ms ease-in-out 25ms;
  box-shadow: 0 26px 24px -16px rgb(0 0 0 / 40%);
}

.serie-preview:hover img {
  cursor: pointer;
  transform: translateY(-3%);
}

.serie-preview:hover .serie-title {
  color: red;
}

.serie-preview .serie-title {
  margin-top: 2rem;
}

img {
  width: 100%;
}

.pagination {
  justify-content: center;
}
</style>
