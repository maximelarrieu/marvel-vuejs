<template>
  <div class="mt-5 text-left">
    <h3>Infos</h3>
    <div class="row">
      <div class="col-md-6">
        <h5>Comics</h5>
        <div class="comics">
          <div v-if="comics.length > 0">
            <span
              v-for="comic in comics"
              :key="comic.id"
              @click="goToComicDetails(comic.id)"
            >
              <span class="comic badge badge-pill badge-warning">{{
                comic.title
              }}</span>
            </span>
          </div>
          <p v-else>Pas de comics</p>
        </div>
      </div>
      <div class="col-md-6">
        <h5 text-left>Histoires</h5>
        <div class="stories">
          <div v-if="stories.length > 0">
            <span
              v-for="story in stories"
              :key="story.id"
              @click="goToStoryDetails(story.id)"
            >
              <span class="story badge badge-pill badge-danger">{{
                story.title
              }}</span>
            </span>
          </div>
          <p v-else-if="stories.length === 0">Pas de story</p>
        </div>
      </div>
      <div class="col-md-12 mt-3">
        <h5 text-left>Évènements</h5>
        <div class="events">
          <div v-if="events.length > 0">
            <span
              v-for="event in events"
              :key="event.id"
              @click="goToEventDetails(event.id)"
            >
              <span class="event">{{ event.title }}</span>
            </span>
          </div>
          <p v-else>Pas d'évènement</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SerieService from "@/services/SerieService";

export default {
  name: "SerieInfos",
  data() {
    return {
      comics: [],
      events: [],
      stories: [],
    };
  },
  created() {
    this.serieService = new SerieService();
  },
  mounted() {
    this.fetchSerieComics(this.$route.params.id);
    this.fetchSerieEvents(this.$route.params.id);
    this.fetchSerieStories(this.$route.params.id);
  },
  methods: {
    async fetchSerieComics(id) {
      await this.serieService
        .fetchSerieComics(id)
        .then((data) => (this.comics = data.results));
    },
    async fetchSerieEvents(id) {
      await this.serieService
        .fetchSerieEvents(id)
        .then((data) => (this.events = data.results));
    },
    async fetchSerieStories(id) {
      await this.serieService
        .fetchSerieStories(id)
        .then((data) => (this.stories = data.results));
    },
    async goToComicDetails(id) {
      this.$router.push(`/comics/${id}`);
    },
    async goToEventDetails(id) {
      this.$router.push(`/events/${id}`);
    },
    async goToStoryDetails(id) {
      this.$router.push(`/stories/${id}`);
    },
  },
};
</script>
