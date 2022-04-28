<template>
  <div class="mb-5">
    <a href="/">
      <img class="mb-4 logo" alt="Vue logo" src="./assets/marvel-logo.png" />
    </a>
    <h1>Marvel API</h1>
    <div class="btn-group mr-2" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-primary" @click="goToComicsList()">
        Comics
      </button>
    </div>
    <div class="btn-group mr-2" role="group" aria-label="Basic example">
      <button
        type="button"
        class="btn btn-primary"
        @click="goToCharactersList()"
      >
        Personnages
      </button>
    </div>
    <div class="btn-group mr-2" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-primary" @click="goToSeriesList()">
        Series
      </button>
    </div>
    <div class="btn-group mr-2" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-primary" @click="goToCreatorsList()">
        Créateurs
      </button>
    </div>
    <div class="btn-group mr-2" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-primary" @click="goToEventsList()">
        Évènements
      </button>
    </div>
    <div class="btn-group mr-2" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-primary" @click="goToStoriesList()">
        Histoires
      </button>
    </div>
  </div>
  <router-view></router-view>
  <Footer />
</template>

<script>
import FooterComponent from "@/components/Footer/Footer.vue";

export default {
  name: "App",
  components: {
    Footer: FooterComponent,
  },
  methods: {
    async goToComicsList() {
      this.$router.push(`/comics`);
    },
    async goToCharactersList() {
      this.$router.push(`/characters`);
    },
    async goToSeriesList() {
      this.$router.push(`/series`);
    },
    async goToCreatorsList() {
      this.$router.push(`/creators`);
    },
    async goToEventsList() {
      this.$router.push(`/events`);
    },
    async goToStoriesList() {
      this.$router.push(`/stories`);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.comics-container,
.stories-container,
.creators-container,
.events-container,
.series-container {
  margin-top: 3rem;
}

.comic-preview,
.event-preview,
.story-preview,
.creator-preview,
.serie-preview {
  margin-bottom: 2rem;
}

.comic-preview img,
.event-preview img,
.story-preview img,
.serie-preview img,
.creator-preview img {
  transition: transform 100ms ease-in-out 25ms;
  box-shadow: 0 26px 24px -16px rgb(0 0 0 / 40%);
}

.comic-preview:hover img,
.story-preview:hover img,
.serie-preview:hover img,
.event-preview:hover img,
.creator-preview:hover img {
  cursor: pointer;
  transform: translateY(-3%);
}

.comic-preview .comic-title,
.story-preview .story-title,
.serie-preview .serie-title,
.event-preview .event-title,
.creator-preview .creator-name {
  margin-top: 2rem;
}

img {
  width: 100%;
}

.characters,
.creators,
.stories,
.series,
.events,
.comics {
  display: flex;
  flex-wrap: wrap;
}

.characters .character,
.creators .creator,
.stories .story,
.series .serie,
.events .event,
.comics .comic {
  padding: 6px 10px;
  margin: 2px;
  transition: transform 100ms ease-in-out 25ms;
}

.characters .character:hover,
.creators .creator:hover,
.stories .story:hover,
.series .serie:hover,
.events .event:hover,
.comics .comic:hover {
  transform: translateY(-5%);
  cursor: pointer;
}

.logo {
  width: 300px;
}

.pagination {
  justify-content: center;
}
</style>
