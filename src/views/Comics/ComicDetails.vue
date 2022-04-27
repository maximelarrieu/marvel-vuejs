<template>
  <div class="container mb-5">
    <div class="row">
      <div class="col-md-5 img-container">
        <img :src="comicImage" alt="comic" class="mb-4" />
      </div>
      <div class="col-md-7">
        <div class="mb-4">
          <h2 class="text-left">{{ comic.title }}</h2>
          <p v-if="comic.description !== ''">{{ comic.description }}</p>
          <p v-else class="text-left">Aucune description</p>
        </div>
        <div class="row">
          <div class="col-md-6">
            <ComicCreators />
          </div>
          <div class="col-md-6">
            <ComicCharaters />
          </div>
          <div class="col-12">
            <ComicInfos />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ComicService from "../../services/ComicService";
import ComicCharaters from "@/components/Comic/ComicCharaters.vue";
import ComicCreators from "@/components/Comic/ComicCreators.vue";
import ComicInfos from "@/components/Comic/ComicInfos.vue";

export default {
  name: "ComicDetails",
  components: {
    ComicCharaters,
    ComicCreators,
    ComicInfos,
  },
  data() {
    return {
      comic: {},
      comicImage: "",
    };
  },
  created() {
    this.comicService = new ComicService();
  },
  mounted() {
    this.fetchOneComic(this.$route.params.id);
  },
  methods: {
    async fetchOneComic(id) {
      await this.comicService
        .fetchOne(id)
        .then((data) => (this.comic = data.results[0]))
        .then((comic) => {
          this.comicImage = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
        });
    },
    async goToPage(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style scoped>
img {
  width: 100%;
}
</style>
