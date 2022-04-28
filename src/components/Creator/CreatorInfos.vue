<template>
  <div class="mt-5 text-left">
    <h3>Infos</h3>
    <div class="row">
      <div class="col-md-6">
        <h5>Events</h5>
        <div class="events">
          <div v-if="events.length > 0">
            <span v-for="event in events" :key="event.id">
              <span class="event badge badge-pill badge-warning" @click="goToPage(`/events/${event.id}`)">{{
                event.title
              }}</span>
            </span>
          </div>
          <p v-else-if="events.length === 0">Pas d'events</p>
        </div>
      </div>
      <div class="col-md-6">
        <h5 text-left>Stories</h5>
        <div class="stories">
          <div v-if="stories.length > 0">
            <span v-for="story in stories" :key="story.id">
              <span class="story badge badge-pill badge-danger" @click="goToPage(`/stories/${story.id}`)">{{
                story.title
              }}</span>
            </span>
          </div>
          <p v-else-if="stories.length === 0">Pas de story</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CreatorService from "@/services/CreatorService";

export default {
  name: "CreatorInfos",
  data() {
    return {
      events: [],
      stories: [],
    };
  },
  created() {
    this.creatorService = new CreatorService();
  },
  mounted() {
    this.fetchCreatorEvents(this.$route.params.id);
    this.fetchCreatorStories(this.$route.params.id);
  },
  methods: {
    async fetchCreatorEvents(id) {
      await this.creatorService
        .fetchCreatorEvents(id)
        .then((data) => (this.events = data.results));
    },
    async fetchCreatorStories(id) {
      await this.creatorService
        .fetchCreatorStories(id)
        .then((data) => (this.stories = data.results));
    },
    async goToPage(page) {
      this.$router.push(page);
    }
  },
};
</script>
