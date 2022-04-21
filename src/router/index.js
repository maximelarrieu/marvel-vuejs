import HomeView from '@/views/HomeView.vue'
import ComicDetails from '@/views/ComicDetails.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    { path: '/', component: HomeView },
    { path: '/comic/:id', component: ComicDetails },
  ]
  
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
