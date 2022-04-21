import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    { path: '/', component: HomeView },
    { path: '/about', component: AboutView },
  ]
  
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
