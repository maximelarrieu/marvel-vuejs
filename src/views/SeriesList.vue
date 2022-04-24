<template>
  <div class="container">
    <input
      type="text"
      class="form-control mb-5"
      placeholder="Search a serie"
    />
    <h2>Serie list</h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="serie in series" :key="serie.id">
          <td>{{ serie.title }}</td>
          <td>
            <button class="btn btn-primary" @click="goToSerieDetail(serie.id)">
              Show détails
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
import SerieService from "../services/SerieService";
import Paginate from "vuejs-paginate-next";

export default {
  name: "SeriesList",
  components: {
    paginate: Paginate,
  },
  data() {
    return {
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
      await this.serieService
        .fetchAllForPaginate(offset === 1 ? 0 : offset)
        .then((data) => {
          this.series = data.results;
          this.totalSeries = data.total;
          this.nbPages = Math.floor(data.total / this.limit);
        });
    },
    async goToSerieDetail(id) {
      this.$router.push(`/serie/${id}`);
    },
    clickCallback(pageNum) {
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
