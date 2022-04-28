<template>
  <div>
    <h4 class="text-left">Personnages</h4>
    <div v-if="characters.length > 0" class="characters text-left">
      <span
        v-for="character in characters"
        :key="character.id"
        @click="goToCharacterDetails(character.id)"
      >
        <span class="badge badge-pill badge-info character">{{
          character.name
        }}</span>
      </span>
    </div>
    <p v-else class="text-left">Pas de personnages</p>
  </div>
</template>

<script>
import SerieService from "@/services/SerieService";

export default {
  name: "SerieCharacters",
  data() {
    return {
      characters: [],
    };
  },
  created() {
    this.serieService = new SerieService();
  },
  mounted() {
    this.fetchSerieCharacters(this.$route.params.id);
  },
  methods: {
    async fetchSerieCharacters(id) {
      await this.serieService
        .fetchSerieCharacters(id)
        .then((data) => (this.characters = data.results));
    },
    async goToCharacterDetails(id) {
      this.$router.push(`/character/${id}`);
    },
  },
};
</script>
