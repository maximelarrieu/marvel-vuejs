<template>
  <div class="container">
    <input
      type="text"
      v-model="search"
      class="form-control mb-5"
      placeholder="Search a serie..."
    />
    <h2>Series list</h2>
    <div class="m-5" v-if="isLoading">
      <loader />
    </div>
    <table v-else class="table table-striped">
      <thead>
        <tr>
          <th></th>
          <th scope="col">Title</th>
          <th scope="col">Description</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="serie in filteredSeries" :key="serie.id">
          <td><img :src="`${serie.thumbnail.path}.${serie.thumbnail.extension}`" /></td>
          <td>{{ serie.title }}</td>
          <td>{{ serie.description ?? "No description" }}</td>
          <td>
            <button class="btn btn-primary" @click="goToSerieDetail(serie.id)">
              Show details
            </button>
          </td>
        </tr>
      </tbody>
    </table>
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
      search: ""
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
    async goToSerieDetail(id) {
      this.$router.push(`/series/${id}`);
    },
    clickCallback(pageNum) {
      this.isLoading = true;
      this.fetchAllSeries((pageNum - 1) * this.limit);
    },
  },
  computed: {
    rows() {
      return this.series.length;
    },
    filteredSeries() {
      return this.series.filter(serie => {
        return serie.title.toLowerCase().indexOf(this.search.toLowerCase()) != -1
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
img {
  width: 100px;
  height: 100px;
}
</style>
