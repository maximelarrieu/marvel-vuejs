<template>
  <div class="mt-5">
    <h4 class="text-left">Series</h4>
    <div v-if="series.length > 0" class="series text-left">
      <span
        v-for="serie in series"
        :key="serie.id"
        @click="goToSerieDetails(serie.id)"
      >
        <span class="serie badge badge-pill badge-info">{{ serie.title }}</span>
      </span>
    </div>
    <p v-else class="text-left">Pas de series</p>
  </div>
</template>

<script>
import CharacterService from "@/services/CharacterService";

export default {
  name: "CharacterComics",
  data() {
    return {
      series: [],
    };
  },
  created() {
    this.characterService = new CharacterService();
  },
  mounted() {
    this.fetchCharacterSeries(this.$route.params.id);
  },
  methods: {
    async fetchCharacterSeries(id) {
      await this.characterService
        .fetchCharacterSeries(id)
        .then((data) => (this.series = data.results));
    },
    async goToSerieDetails(id) {
      this.$router.push(`/series/${id}`);
    },
  },
};
</script>
