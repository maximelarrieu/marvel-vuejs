<template>
  <div class="container">
    <input
      type="text"
      v-model="search"
      class="form-control mb-5"
      placeholder="Rechercher une story..."
    />
    <h2>Liste des stories</h2>
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
        <tr v-for="story in filteredStories" :key="story.id">
          <td><img :src="`${story.thumbnail.path}.${story.thumbnail.extension}`" /></td>
          <td>{{ story.title }}</td>
          <td>
            <button class="btn btn-primary" @click="goToStoryDetail(story.id)">
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
import StoryService from "../../services/StoryService";
import Paginate from "vuejs-paginate-next";
import LoaderComponent from "../../components/Loader/Loader.vue";

export default {
  name: "StoriesList",
  components: {
    paginate: Paginate,
    loader: LoaderComponent,
  },
  data() {
    return {
      currentPage: 1,
      isLoading: true,
      limit: 20,
      stories: [],
      totalStories: 0,
      nbPages: 0,
      search: ""
    };
  },
  created() {
    this.storyService = new StoryService();
  },
  mounted() {
    this.fetchAllStories(0);
  },
  methods: {
    async fetchAllStories(offset) {
      try {
        await this.storyService
          .fetchAllForPaginate(offset === 1 ? 0 : offset)
          .then((data) => {
            this.stories = data.results;
            this.totalStories = data.total;
            this.nbPages = Math.floor(data.total / this.limit);
        });
      } catch(error) {
        console.log(error)
      } finally {
        this.isLoading = false
      }
    },
    async goToStoryDetail(id) {
      this.$router.push(`/stories/${id}`);
    },
    clickCallback(pageNum) {
      this.isLoading = true;
      this.fetchAllStories((pageNum - 1) * this.limit);
    },
    clickCallbackWithSearch(pageNum) {
      this.isLoading = true;
      this.fetchAllStoriesWithSearch(this.search, (pageNum - 1) * this.limit);
    },
  },
  computed: {
    rows() {
      return this.stories.length;
    },
    filteredStories() {
      return this.stories.filter(story => {
        return story.title.toLowerCase().indexOf(this.search.toLowerCase()) != -1
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
