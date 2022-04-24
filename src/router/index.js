import HomeView from "@/views/HomeView.vue";
import { createRouter, createWebHashHistory } from "vue-router";

import ComicsList from "@/views/Comics/ComicsView.vue";
import ComicDetails from "@/views/Comics/ComicDetails.vue";

import CharactersList from "@/views/Characters/CharactersView.vue";
import CharacterDetails from "@/views/Characters/CharacterDetails.vue";

import SeriesList from "@/views/Series/SeriesView.vue"
import SerieDetails from "@/views/Series/SerieDetails.vue";

import CreatorsList from "@/views/Creators/CreatorsView.vue";
import CreatorDetails from "@/views/Creators/CreatorDetails.vue";

import EventsList from "@/views/Events/EventsView.vue";
import EventDetails from "@/views/Events/EventDetails.vue";

import StoriesList from "@/views/Stories/StoriesView.vue";
import StoryDetails from "@/views/Stories/StoryDetails.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/comics", component: ComicsList },
  { path: "/comics/:id", component: ComicDetails },
  { path: "/characters", component: CharactersList },
  { path: "/characters/:id", component: CharacterDetails },
  { path: "/series", component: SeriesList },
  { path: "/series/:id", component: SerieDetails },
  { path: "/creators", component: CreatorsList },
  { path: "/creators/:id", component: CreatorDetails },
  { path: "/events", component: EventsList },
  { path: "/events/:id", component: EventDetails },
  { path: "/stories", component: StoriesList },
  { path: "/stories/:id", component: StoryDetails }
];

const router = createRouter({
  hashbang: false,
  history: createWebHashHistory(),
  routes,
});

export default router;
