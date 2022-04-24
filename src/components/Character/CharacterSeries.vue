<template>
  <div>
    <h4>Series</h4>
    <ul class="list-group" v-if="series.length > 0">
      <li
        class="list-group-item"
        v-for="serie in series"
        :key="serie.id"
        @click="goToSerieDetails(serie.id)"
      >
        {{ serie.title }}
      </li>
    </ul>
    <p v-if="series.length === 0">pas de series</p>
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
