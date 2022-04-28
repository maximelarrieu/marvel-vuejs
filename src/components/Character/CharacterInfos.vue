<template>
  <div class="mt-5 text-left">
    <h3>Infos</h3>
    <div class="row">
      <div class="col-md-6">
        <h5>Events</h5>
        <div class="events">
          <div v-if="events.length > 0">
            <span
              v-for="event in events"
              :key="event.id"
              @click="goToComicDetails(event.id)"
            >
              <span class="event badge badge-pill badge-warning">{{
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
              <span class="story badge badge-pill badge-danger">{{
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
import CharacterService from "@/services/CharacterService";

export default {
  name: "CharacterComics",
  data() {
    return {
      events: [],
      stories: [],
    };
  },
  created() {
    this.characterService = new CharacterService();
  },
  mounted() {
    this.fetchCharacterEvents(this.$route.params.id);
    this.fetchCharacterStories(this.$route.params.id);
  },
  methods: {
    async fetchCharacterEvents(id) {
      await this.characterService
        .fetchCharacterEvents(id)
        .then((data) => (this.events = data.results));
    },
    async fetchCharacterStories(id) {
      await this.characterService
        .fetchCharacterStories(id)
        .then((data) => (this.stories = data.results));
    },
  },
};
</script>
