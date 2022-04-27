<template>
  <div class="mb-5">
    <a href="/">
      <img class="mb-4" alt="Vue logo" src="./assets/marvel-logo.png" />
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
        Characters
      </button>
    </div>
    <div class="btn-group mr-2" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-primary" @click="goToSeriesList()">
        Series
      </button>
    </div>
    <div class="btn-group mr-2" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-primary" @click="goToCreatorsList()">
        Creators
      </button>
    </div>
    <div class="btn-group mr-2" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-primary" @click="goToEventsList()">
        Events
      </button>
    </div>
    <div class="btn-group mr-2" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-primary" @click="goToStoriesList()">
        Stories
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
</style>
