<template>
  <div class="container">
    <input
      type="text"
      v-model="search"
      class="form-control mb-5"
      placeholder="Search a creator..."
    />
    <h2>Creator list</h2>
    <div class="m-5" v-if="isLoading">
      <loader />
    </div>
    <table v-else class="table table-striped">
      <thead>
        <tr>
          <th></th>
          <th scope="col">Creator</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="creator in filteredCreators" :key="creator.id">
          <td><img :src="`${creator.thumbnail.path}.${creator.thumbnail.extension}`" /></td>
          <td>{{ creator.fullName }}</td>
          <td>
            <button
              class="btn btn-primary"
              @click="goToCreatorDetail(creator.id)"
            >
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
import CreatorService from "../../services/CreatorService";
import Paginate from "vuejs-paginate-next";
import LoaderComponent from "../../components/Loader/Loader.vue";

export default {
  name: "CreatorsView",
  components: {
    paginate: Paginate,
    loader: LoaderComponent,
  },
  data() {
    return {
      currentPage: 1,
      isLoading: true,
      limit: 20,
      creators: [],
      totalCreators: 0,
      nbPages: 0,
      search: ""
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
      try {
        await this.creatorService
          .fetchAllForPaginate(offset === 1 ? 0 : offset)
          .then((data) => {
            this.creators = data.results;
            this.totalCreators = data.total;
            this.nbPages = Math.floor(data.total / this.limit);
          });
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async goToCreatorDetail(id) {
      this.$router.push(`/creators/${id}`);
    },
    clickCallback(pageNum) {
      this.isLoading = true;
      this.fetchAllCreators((pageNum - 1) * this.limit);
    },
  },
  computed: {
    rows() {
      return this.creators.length;
    },
    filteredCreators() {
      return this.creators.filter(creator => {
        return creator.fullName.toLowerCase().indexOf(this.search.toLowerCase()) != -1
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
