import HomeView from "@/views/HomeView.vue";
import { createRouter, createWebHashHistory } from "vue-router";

import ComicsList from "@/views/ComicsList.vue";
import ComicDetails from "@/views/ComicDetails.vue";

import CharactersList from "@/views/CharactersList.vue";
import CharacterDetails from "@/views/CharacterDetails.vue";

import SeriesList from "@/views/SeriesList.vue"
import SerieDetails from "@/views/SerieDetails.vue";

import CreatorsList from "@/views/CreatorsList.vue";
import CreatorDetails from "@/views/CreatorDetails.vue";

import EventsList from "@/views/EventsList.vue";
import EventDetails from "@/views/EventDetails.vue";

import StoriesList from "@/views/StoriesList.vue";
import StoryDetails from "@/views/StoryDetails.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/comics", component: ComicsList },
  { path: "/comic/:id", component: ComicDetails },
  { path: "/character/:id", component: CharacterDetails },
  { path: "/characters", component: CharactersList },
  { path: "/series", component: SeriesList },
  { path: "/serie/:id", component: SerieDetails },
  { path: "/creators", component: CreatorsList },
  { path: "/creator/:id", component: CreatorDetails },
  { path: "/events", component: EventsList },
  { path: "/event/:id", component: EventDetails },
  { path: "/stories", component: StoriesList },
  { path: "/story/:id", component: StoryDetails }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
