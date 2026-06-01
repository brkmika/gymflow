import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView.vue'


const routes = [
    { path: '/', component: HomeView },
    { path: '/profil', component: ProfileView},
    { path: '/ciljevi', component: HomeView},
    { path: '/plan-treninga', component: HomeView},
    { path: '/logiraj-trening', component: HomeView},
    { path: '/napredak', component: HomeView},
    { path: '/dnevnik', component: HomeView},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router