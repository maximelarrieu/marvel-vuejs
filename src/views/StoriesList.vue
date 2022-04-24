<template>
  <div class="container">
    <input
      type="text"
      class="form-control mb-5"
      placeholder="Search a story"
    />
    <h2>Stories list</h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="story in stories" :key="story.id">
          <td>{{ story.title }}</td>
          <td>
            <button class="btn btn-primary" @click="goToStoryDetail(story.id)">
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
import StoryService from "../services/StoryService";
import Paginate from "vuejs-paginate-next";

export default {
  name: "StoriesList",
  components: {
    paginate: Paginate,
  },
  data() {
    return {
      limit: 20,
      stories: [],
      totalStories: 0,
      nbPages: 0,
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
      await this.storyService
        .fetchAllForPaginate(offset === 1 ? 0 : offset)
        .then((data) => {
          this.stories = data.results;
          this.totalStories = data.total;
          this.nbPages = Math.floor(data.total / this.limit);
        });
    },
    async goToStoryDetail(id) {
      this.$router.push(`/story/${id}`);
    },
    clickCallback(pageNum) {
      this.fetchAllStories((pageNum - 1) * this.limit);
    },
  },
  computed: {
    rows() {
      return this.events.length;
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
