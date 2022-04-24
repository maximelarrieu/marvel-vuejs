<template>
  <div class="container">
    <input
      type="text"
      class="form-control mb-5"
      placeholder="Rechercher une série"
    />
    <h2>Liste des séries</h2>
    <div class="m-5" v-if="isLoading">
      <loader />
    </div>
    <table v-else class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Titre</th>
          <th scope="col">Description</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="serie in series" :key="serie.id">
          <td>{{ serie.title }}</td>
          <td>{{ serie.description ?? "Pas de description" }}</td>
          <td>
            <button class="btn btn-primary" @click="goToSerieDetail(serie.id)">
              Voir les détails
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
