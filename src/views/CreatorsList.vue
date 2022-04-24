<template>
  <div class="container">
    <input
      type="text"
      class="form-control mb-5"
      placeholder="Search a creator"
    />
    <h2>Creators list</h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="creator in creators" :key="creator.id">
          <td>{{ creator.fullName }}</td>
          <td>
            <button class="btn btn-primary" @click="goToCreatorDetail(creator.id)">
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
import CreatorService from "../services/CreatorService";
import Paginate from "vuejs-paginate-next";

export default {
  name: "CreatorsList",
  components: {
    paginate: Paginate,
  },
  data() {
    return {
      limit: 20,
      creators: [],
      totalCreators: 0,
      nbPages: 0,
    };
  },
  created() {
    this.creatorService = new CreatorService();
  },
  mounted() {
    this.fetchAllCreators(0);
  },
  methods: {
    async fetchAllCreators(offset) {
      await this.creatorService
        .fetchAllForPaginate(offset === 1 ? 0 : offset)
        .then((data) => {
          this.creators = data.results;
          this.totalCreators = data.total;
          this.nbPages = Math.floor(data.total / this.limit);
        });
    },
    async goToCreatorDetail(id) {
      this.$router.push(`/creator/${id}`);
    },
    clickCallback(pageNum) {
      this.fetchAllCreators((pageNum - 1) * this.limit);
    },
  },
  computed: {
    rows() {
      return this.creators.length;
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
