import HomeView from "@/views/HomeView.vue";
import { createRouter, createWebHistory } from "vue-router";
import ComicDetails from "@/views/Comics/ComicDetails.vue";
import CharacterDetails from "@/views/Characters/CharacterDetails.vue";
import SerieDetails from "@/views/Series/SerieDetails.vue";
import CreatorDetails from "@/views/Creators/CreatorDetails.vue";
import ComicsView from "@/views/Comics/ComicsView.vue";
import CharactersView from "@/views/Characters/CharactersView.vue";
import CreatorsView from "@/views/Creators/CreatorsView.vue";
import SeriesView from "@/views/Series/SeriesView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/comics", component: ComicsView },
  { path: "/comics/:id", component: ComicDetails },
  { path: "/characters", component: CharactersView },
  { path: "/characters/:id", component: CharacterDetails },
  { path: "/series", component: SeriesView },
  { path: "/series/:id", component: SerieDetails },
  { path: "/creators", component: CreatorsView },
  { path: "/creators/:id", component: CreatorDetails },
];

const router = createRouter({
  hashbang: false,
  history: createWebHistory(),
  routes,
});

export default router;
