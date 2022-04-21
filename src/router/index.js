import HomeView from '@/views/HomeView.vue'
// import AboutView from '@/views/AboutView.vue'
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
