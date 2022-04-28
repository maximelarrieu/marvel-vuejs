<template>
  <div class="container">
    <input
      type="text"
      @input="fetchAllCreatorsWithSearch(search, 0)"
      v-model="search"
      class="form-control mb-5"
      placeholder="Search a creator..."
    />
    <h2>Les Createurs</h2>
    <div class="m-5" v-if="isLoading">
      <loader />
    </div>
    <div v-else class="creators-container row">
      <div
        v-for="creator in creators"
        :key="creator.id"
        class="col-md-3 creator-preview"
        @click="goToCreatorDetail(creator.id)"
      >
        <img
          :src="`${creator.thumbnail.path}.${creator.thumbnail.extension}`"
        />
        <p class="creator-name">{{ creator.fullName }}</p>
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
      search: "",
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
    async fetchAllCreatorsWithSearch(name, offset) {
      try {
        await this.creatorService
          .fetchAllForPaginateWithSearch(name, offset === 1 ? 0 : offset)
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
    clickCallbackWithSearch(pageNum) {
      this.isLoading = true;
      this.fetchAllCreatorsWithSearch(this.search, (pageNum - 1) * this.limit);
    },
  },
  computed: {
    rows() {
      return this.creators.length;
    },
  },
};
</script>
