import HomeView from "@/views/HomeView.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import ComicDetails from "@/views/ComicDetails.vue";
import CharacterDetails from "@/views/CharacterDetails.vue";
import SerieDetails from "@/views/SerieDetails.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/comic/:id", component: ComicDetails },
  { path: "/character/:id", component: CharacterDetails },
  { path: "/serie/:id", component: SerieDetails },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
