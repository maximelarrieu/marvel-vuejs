<template>
  <div class="mt-5">
    <h4 class="text-left">Comics</h4>
    <div v-if="comics.length > 0" class="comics text-left">
      <span
        v-for="comic in comics"
        :key="comic.id"
        @click="goToComicDetails(comic.id)"
      >
        <span class="comic badge badge-pill badge-primary">{{
          comic.title
        }}</span>
      </span>
    </div>
    <p v-else class="text-left">Pas de comics</p>
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
