<template>
  <div>
    <h4>Comics</h4>
    <ul class="list-group" v-if="comics.length > 0">
      <li
        class="list-group-item"
        v-for="comic in comics"
        :key="comic.id"
        @click="goToCreatorComic(comic.id)"
      >
        {{ comic.title }}
      </li>
    </ul>
    <p v-else-if="comics.length === 0">pas de comics</p>
  </div>
</template>

<script>
import CreatorService from "@/services/CreatorService";

export default {
  name: "CreatorComics",
  data() {
    return {
      comics: [],
    };
  },
  created() {
    this.creatorService = new CreatorService();
  },
  mounted() {
    this.fetchCreatorComics(this.$route.params.id);
  },
  methods: {
    async fetchCreatorComics(id) {
      await this.creatorService
        .fetchCreatorComics(id)
        .then((data) => (this.comics = data.results));
    },
    async goToCreatorComic(id) {
      this.$router.push(`/comics/${id}`);
    },
  },
};
</script>
