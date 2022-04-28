<template>
  <div class="container mb-5 text-left">
    <div class="row">
      <div class="col-md-5 img-container">
        <img :src="serieImage" alt="series" class="mb-4" />
      </div>
      <div class="col-md-7">
        <div>
          <h2 class="text-left">{{ serie.title }}</h2>
          <p v-if="serie.description">{{ serie.description }}</p>
          <p v-else class="text-left">Aucune description</p>
        </div>
        <div class="row">
          <div class="col-6">
            <SerieCreators />
          </div>
          <div class="col-6">
            <SerieCharacters />
          </div>
        </div>
      </div>
    </div>
    <div>
      <SerieInfos />
    </div>
  </div>
</template>

<script>
import SerieService from "@/services/SerieService";
import SerieCharacters from "@/components/Serie/SerieCharacters.vue";
import SerieCreators from "@/components/Serie/SerieCreators.vue";
import SerieInfos from "@/components/Serie/SerieInfos.vue";

export default {
  name: "SerieDetails",
  components: {
    SerieCharacters,
    SerieCreators,
    SerieInfos,
  },
  data() {
    return {
      serie: {},
      serieImage: "",
    };
  },
  created() {
    this.serieService = new SerieService();
  },
  mounted() {
    this.fetchOneSerie(this.$route.params.id);
  },
  methods: {
    async fetchOneSerie(id) {
      await this.serieService
        .fetchOne(id)
        .then((data) => (this.serie = data.results[0]))
        .then((serie) => {
          this.serieImage = `${serie.thumbnail.path}.${serie.thumbnail.extension}`;
        });
    },
  },
};
</script>

<style scoped>
img {
  width: 100%;
}
</style>
