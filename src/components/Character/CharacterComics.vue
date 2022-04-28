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
import CharacterService from "@/services/CharacterService";

export default {
  name: "CharacterComics",
  data() {
    return {
      comics: [],
    };
  },
  created() {
    this.characterService = new CharacterService();
  },
  mounted() {
    this.fetchCharacterComics(this.$route.params.id);
  },
  methods: {
    async fetchCharacterComics(id) {
      await this.characterService
        .fetchCharacterComics(id)
        .then((data) => (this.comics = data.results));
    },
    async goToComicDetails(id) {
      this.$router.push(`/comics/${id}`);
    },
  },
};
</script>
