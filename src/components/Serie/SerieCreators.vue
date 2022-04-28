<template>
  <div>
    <h4 class="text-left">Créateurs</h4>
    <div v-if="creators.length > 0" class="creators text-left">
      <span
        v-for="creator in creators"
        :key="creator.id"
        @click="goToCreatorDetails(creator.id)"
      >
        <span class="badge badge-pill badge-primary creator">{{
          creator.fullName
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
      creators: [],
    };
  },
  created() {
    this.serieService = new SerieService();
  },
  mounted() {
    this.fetchSerieCreators(this.$route.params.id);
  },
  methods: {
    async fetchSerieCreators(id) {
      await this.serieService
        .fetchSerieCreators(id)
        .then((data) => (this.creators = data.results));
    },
    async goToCreatorDetails(id) {
      this.$router.push(`/creators/${id}`);
    },
  },
};
</script>
