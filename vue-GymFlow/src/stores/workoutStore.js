import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './userStore'

export const useWorkoutStore = defineStore('workout', () => {
    const userStore = useUserStore()
    
   const plans = {
    3: [
      { day: 'Ponedjeljak', name: 'Push Day',  exercises: 5, completed: false },
      { day: 'Utorak',      name: 'Odmor',      exercises: 0, completed: false },
      { day: 'Srijeda',     name: 'Pull Day',   exercises: 5, completed: false },
      { day: 'Četvrtak',    name: 'Odmor',      exercises: 0, completed: false },
      { day: 'Petak',       name: 'Leg Day',    exercises: 6, completed: false },
      { day: 'Subota',      name: 'Odmor',      exercises: 0, completed: false },
      { day: 'Nedjelja',    name: 'Odmor',      exercises: 0, completed: false },
    ],
    4: [
      { day: 'Ponedjeljak', name: 'Push Day',   exercises: 5, completed: false },
      { day: 'Utorak',      name: 'Pull Day',   exercises: 5, completed: false },
      { day: 'Srijeda',     name: 'Odmor',      exercises: 0, completed: false },
      { day: 'Četvrtak',    name: 'Leg Day',    exercises: 6, completed: false },
      { day: 'Petak',       name: 'Upper Body', exercises: 4, completed: false },
      { day: 'Subota',      name: 'Odmor',      exercises: 0, completed: false },
      { day: 'Nedjelja',    name: 'Odmor',      exercises: 0, completed: false },
    ],
    5: [
      { day: 'Ponedjeljak', name: 'Push Day',   exercises: 5, completed: false },
      { day: 'Utorak',      name: 'Pull Day',   exercises: 5, completed: false },
      { day: 'Srijeda',     name: 'Leg Day',    exercises: 6, completed: false },
      { day: 'Četvrtak',    name: 'Upper Body', exercises: 4, completed: false },
      { day: 'Petak',       name: 'Odmor',      exercises: 0, completed: false },
      { day: 'Subota',      name: 'Full Body',  exercises: 6, completed: false },
      { day: 'Nedjelja',    name: 'Odmor',      exercises: 0, completed: false },
    ],
    6: [
      { day: 'Ponedjeljak', name: 'Push Day',   exercises: 5, completed: false },
      { day: 'Utorak',      name: 'Pull Day',   exercises: 5, completed: false },
      { day: 'Srijeda',     name: 'Leg Day',    exercises: 6, completed: false },
      { day: 'Četvrtak',    name: 'Push Day',   exercises: 5, completed: false },
      { day: 'Petak',       name: 'Pull Day',   exercises: 5, completed: false },
      { day: 'Subota',      name: 'Leg Day',    exercises: 6, completed: false },
      { day: 'Nedjelja',    name: 'Odmor',      exercises: 0, completed: false },
    ],
   }

   const weeklyPlan = computed(() => {
    return plans[userStore.treninziTjedno] || plans[3]
   })

   return { weeklyPlan }
})