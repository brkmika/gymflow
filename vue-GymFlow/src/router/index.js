import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView.vue'
import ProgressView from '../views/ProgressView.vue'
import GoalsView from '../views/GoalsView.vue'
import PlanView from '../views/PlanView.vue'
import WorkoutDetailView from '../views/WorkoutDetailView.vue'



const routes = [
    { path: '/', component: HomeView },
    { path: '/profil', component: ProfileView},
    { path: '/ciljevi', component: GoalsView},
    { path: '/plan-treninga', component: PlanView},
    { path: '/logiraj-trening', component: HomeView},
    { path: '/napredak', component: ProgressView},
    { path: '/dnevnik', component: HomeView},
    { path: '/trening', component: WorkoutDetailView},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router