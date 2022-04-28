<template>
  <div class="mt-5">
    <h4 class="text-left">Series</h4>
    <div v-if="series.length > 0" class="series text-left">
      <span
        v-for="serie in series"
        :key="serie.id"
        @click="goToCreatorSerie(serie.id)"
      >
        <span class="serie badge badge-pill badge-info">{{ serie.title }}</span>
      </span>
    </div>
    <p v-else class="text-left">Pas de series</p>
  </div>
</template>

<script>
import CreatorService from "@/services/CreatorService";

export default {
  name: "CreatorSeries",
  data() {
    return {
      series: [],
    };
  },
  created() {
    this.creatorService = new CreatorService();
  },
  mounted() {
    this.fetchCreatorSeries(this.$route.params.id);
  },
  methods: {
    async fetchCreatorSeries(id) {
      await this.creatorService
        .fetchCreatorSeries(id)
        .then((data) => (this.series = data.results));
    },
    async goToCreatorSerie(id) {
      this.$router.push(`/series/${id}`);
    },
  },
};
</script>
