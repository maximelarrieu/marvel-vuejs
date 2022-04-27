<template>
  <div class="mt-5">
    <h4 class="text-left">Personnages</h4>
    <div v-if="characters.length > 0" class="characters text-left">
      <span
        v-for="(character, index) in characters"
        :key="character.id"
        @click="goToCharacterDetails(character.id)"
      >
        <span class="character">{{ character.name }}</span>
        <span v-if="index != Object.keys(character).length - 1">,&nbsp;</span>
      </span>
    </div>
    <p v-else class="text-left">Pas de personnages</p>
  </div>
</template>

<script>
import ComicService from "@/services/ComicService";

export default {
  name: "ComicCharacters",
  data() {
    return {
      characters: [],
    };
  },
  created() {
    this.comicService = new ComicService();
  },
  mounted() {
    this.fetchComicCharacters(this.$route.params.id);
  },
  methods: {
    async fetchComicCharacters(id) {
      await this.comicService
        .fetchComicCharacters(id)
        .then((data) => (this.characters = data.results));
    },
    async goToCharacterDetails(id) {
      this.$router.push(`/characters/${id}`);
    },
  },
};
</script>

<style scoped>
.characters {
  display: flex;
  flex-wrap: wrap;
}

.characters .character:hover {
  cursor: pointer;
  color: red;
}
</style>
