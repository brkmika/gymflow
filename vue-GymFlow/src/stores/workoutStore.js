import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './userStore'

export const useWorkoutStore = defineStore('workout', () => {
    const userStore = useUserStore()
    
 const plans = {
    3: [
      { day: 'Ponedjeljak', name: 'Full-Body A', exercises: 5, completed: false },
      { day: 'Utorak',      name: 'Odmor',        exercises: 0, completed: false },
      { day: 'Srijeda',     name: 'Full-Body B',  exercises: 5, completed: false },
      { day: 'Četvrtak',    name: 'Odmor',        exercises: 0, completed: false },
      { day: 'Petak',       name: 'Full-Body C',  exercises: 5, completed: false },
      { day: 'Subota',      name: 'Odmor',        exercises: 0, completed: false },
      { day: 'Nedjelja',    name: 'Odmor',        exercises: 0, completed: false },
    ],
    4: [
      { day: 'Ponedjeljak', name: 'Upper',  exercises: 5, completed: false },
      { day: 'Utorak',      name: 'Lower',  exercises: 5, completed: false },
      { day: 'Srijeda',     name: 'Odmor',  exercises: 0, completed: false },
      { day: 'Četvrtak',    name: 'Upper',  exercises: 5, completed: false },
      { day: 'Petak',       name: 'Lower',  exercises: 5, completed: false },
      { day: 'Subota',      name: 'Odmor',  exercises: 0, completed: false },
      { day: 'Nedjelja',    name: 'Odmor',  exercises: 0, completed: false },
    ],
    5: [
      { day: 'Ponedjeljak', name: 'Upper',  exercises: 5, completed: false },
      { day: 'Utorak',      name: 'Lower',  exercises: 5, completed: false },
      { day: 'Srijeda',     name: 'Odmor',  exercises: 0, completed: false },
      { day: 'Četvrtak',    name: 'Push',   exercises: 5, completed: false },
      { day: 'Petak',       name: 'Pull',   exercises: 5, completed: false },
      { day: 'Subota',      name: 'Legs',   exercises: 6, completed: false },
      { day: 'Nedjelja',    name: 'Odmor',  exercises: 0, completed: false },
    ],
    6: [
      { day: 'Ponedjeljak', name: 'Push',  exercises: 5, completed: false },
      { day: 'Utorak',      name: 'Pull',  exercises: 5, completed: false },
      { day: 'Srijeda',     name: 'Legs',  exercises: 6, completed: false },
      { day: 'Četvrtak',    name: 'Push',  exercises: 5, completed: false },
      { day: 'Petak',       name: 'Pull',  exercises: 5, completed: false },
      { day: 'Subota',      name: 'Legs',  exercises: 6, completed: false },
      { day: 'Nedjelja',    name: 'Odmor', exercises: 0, completed: false },
    ],
   }

   const weeklyPlan = computed(() => {
    return plans[userStore.treninziTjedno] || null
   })

   return { weeklyPlan }
})