<template>
  <div class="mt-5 text-left">
    <h3>Infos</h3>
    <div class="row">
      <div class="col-md-6">
        <h5>Events</h5>
        <div class="events">
          <div v-if="events.length > 0">
            <span v-for="(event, index) in events" :key="event.id">
              <span class="event">{{ event.name }}</span>
              <span v-if="index != Object.keys(events).length - 1"
                >,&nbsp;</span
              >
            </span>
          </div>
          <p v-else-if="events.length === 0">Pas d'events</p>
        </div>
      </div>
      <div class="col-md-6">
        <h5 text-left>Stories</h5>
        <div class="stories">
          <div v-if="stories.length > 0">
            <span v-for="(story, index) in stories" :key="story.id">
              <span class="story">{{ story.title }}</span>
              <span v-if="index != Object.keys(stories).length - 1"
                >,&nbsp;</span
              >
            </span>
          </div>
          <p v-else-if="stories.length === 0">Pas de story</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ComicService from "@/services/ComicService";

export default {
  name: "ComicInfos",
  data() {
    return {
      events: [],
      stories: [],
    };
  },
  created() {
    this.comicService = new ComicService();
  },
  mounted() {
    this.fetchComicEvents(this.$route.params.id);
    this.fetchComicStories(this.$route.params.id);
  },
  methods: {
    async fetchComicEvents(id) {
      await this.comicService
        .fetchComicEvents(id)
        .then((data) => (this.events = data.results));
    },
    async fetchComicStories(id) {
      await this.comicService
        .fetchComicStories(id)
        .then((data) => (this.stories = data.results));
    },
  },
};
</script>

<style scoped>
.stories {
  display: flex;
  flex-wrap: wrap;
}

.stories .story:hover {
  cursor: pointer;
  color: red;
}
</style>
