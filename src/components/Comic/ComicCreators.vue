<template>
  <div class="mt-5 text-left">
    <p class="h4">Créateurs</p>
    <div v-if="creators.length > 0" class="creators text-left">
      <span
        v-for="(creator, index) in creators"
        :key="creator.id"
        @click="goToComicCreator(creator.id)"
      >
        <span class="creator">{{ creator.fullName }}</span>
        <span v-if="index != Object.keys(creators).length - 1">,&nbsp;</span>
      </span>
    </div>
    <p v-else-if="creators.length === 0">Pas de créateurs</p>
  </div>
</template>

<script>
import ComicService from "@/services/ComicService";

export default {
  name: "ComicCreators",
  data() {
    return {
      creators: [],
    };
  },
  created() {
    this.comicService = new ComicService();
  },
  mounted() {
    this.fetchComicCreators(this.$route.params.id);
  },
  methods: {
    async fetchComicCreators(id) {
      await this.comicService
        .fetchComicCreators(id)
        .then((data) => (this.creators = data.results));
    },
    async goToComicCreator(id) {
      this.$router.push(`/creators/${id}`);
    },
  },
};
</script>

<style scoped>
.creators {
  display: flex;
  flex-wrap: wrap;
}

.creators .creator:hover {
  cursor: pointer;
  color: red;
}
</style>
