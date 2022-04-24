<template>
  <div>
    <h4>Creators</h4>
    <ul class="list-group" v-if="creators.length > 0">
      <li
        class="list-group-item"
        v-for="creator in creators"
        :key="creator.id"
        @click="goToCreatorDetails(creator.id)"
      >
        {{ creator.fullName }}
      </li>
    </ul>
    <p v-if="creators.length === 0">pas de creators</p>
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
