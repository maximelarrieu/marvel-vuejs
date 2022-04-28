<template>
  <div class="container mb-5">
    <div class="row">
      <div class="col-md-5 img-container">
        <img :src="creatorImage" alt="creator" class="mb-4" />
      </div>
      <div class="col-md-7">
        <div class="mb-4">
          <h2 class="text-left">{{ creator.fullName }}</h2>
        </div>
        <div class="row">
          <div class="col-md-12">
            <CreatorComics />
          </div>
          <div class="col-md-12">
            <CreatorSeries />
          </div>
        </div>
      </div>
    </div>
    <div>
      <CreatorInfos />
    </div>
  </div>
</template>

<script>
import CreatorService from "@/services/CreatorService";
import CreatorComics from "@/components/Creator/CreatorComics.vue";
import CreatorSeries from "@/components/Creator/CreatorSeries.vue";
import CreatorInfos from "@/components/Creator/CreatorInfos.vue";
// import SerieInfos from '@/components/Serie/SerieInfos.vue';

export default {
  name: "CreatorDetails",
  components: {
    CreatorComics,
    CreatorSeries,
    CreatorInfos,
  },
  data() {
    return {
      creator: {},
      creatorImage: "",
    };
  },
  created() {
    this.creatorService = new CreatorService();
  },
  mounted() {
    this.fetchOneCreator(this.$route.params.id);
  },
  methods: {
    async fetchOneCreator(id) {
      await this.creatorService
        .fetchOne(id)
        .then((data) => (this.creator = data.results[0]))
        .then((creator) => {
          this.creatorImage = `${creator.thumbnail.path}.${creator.thumbnail.extension}`;
        });
    },
  },
};
</script>
