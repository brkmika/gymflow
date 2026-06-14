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

const exercises = {
  'Full-Body A': [
    { name: 'Squat', sets: [{ weight: null, reps: 8 }, { weight: null, reps: 8 }, { weight: null, reps: 8 }] },
    { name: 'Bench Press', sets: [{ weight: null, reps: 8 }, { weight: null, reps: 8 }, { weight: null, reps: 8 }] },
    { name: 'Bent Over Row', sets: [{ weight: null, reps: 8 }, { weight: null, reps: 8 }, { weight: null, reps: 8 }] },
    { name: 'Overhead Press', sets: [{ weight: null, reps: 8 }, { weight: null, reps: 8 }, { weight: null, reps: 8 }] },
    { name: 'Romanian Deadlift', sets: [{ weight: null, reps: 10 }, { weight: null, reps: 10 }, { weight: null, reps: 10 }] },
  ],
  'Full-Body B': [
    { name: 'Deadlift', sets: [{ weight: null, reps: 6 }, { weight: null, reps: 6 }, { weight: null, reps: 6 }] },
    { name: 'Incline Bench Press', sets: [{ weight: null, reps: 8 }, { weight: null, reps: 8 }, { weight: null, reps: 8 }] },
    { name: 'Pull Up', sets: [{ weight: null, reps: 8 }, { weight: null, reps: 8 }, { weight: null, reps: 8 }] },
    { name: 'Dumbbell Shoulder Press', sets: [{ weight: null, reps: 10 }, { weight: null, reps: 10 }, { weight: null, reps: 10 }] },
    { name: 'Leg Press', sets: [{ weight: null, reps: 10 }, { weight: null, reps: 10 }, { weight: null, reps: 10 }] },
  ],
  'Full-Body C': [
    { name: 'Front Squat', sets: [{ weight: null, reps: 8 }, { weight: null, reps: 8 }, { weight: null, reps: 8 }] },
    { name: 'Dips', sets: [{ weight: null, reps: 10 }, { weight: null, reps: 10 }, { weight: null, reps: 10 }] },
    { name: 'Cable Row', sets: [{ weight: null, reps: 10 }, { weight: null, reps: 10 }, { weight: null, reps: 10 }] },
    { name: 'Lateral Raise', sets: [{ weight: null, reps: 12 }, { weight: null, reps: 12 }, { weight: null, reps: 12 }] },
    { name: 'Leg Curl', sets: [{ weight: null, reps: 12 }, { weight: null, reps: 12 }, { weight: null, reps: 12 }] },
  ],
  'Upper': [
    { name: 'Bench Press', sets: [{ weight: null, reps: 8 }, { weight: null, reps: 8 }, { weight: null, reps: 8 }, { weight: null, reps: 8 }] },
    { name: 'Bent Over Row', sets: [{ weight: null, reps: 8 }, { weight: null, reps: 8 }, { weight: null, reps: 8 }, { weight: null, reps: 8 }] },
    { name: 'Overhead Press', sets: [{ weight: null, reps: 10 }, { weight: null, reps: 10 }, { weight: null, reps: 10 }] },
    { name: 'Pull Up', sets: [{ weight: null, reps: 8 }, { weight: null, reps: 8 }, { weight: null, reps: 8 }] },
    { name: 'Tricep Pushdown', sets: [{ weight: null, reps: 12 }, { weight: null, reps: 12 }, { weight: null, reps: 12 }] },
  ],
  'Lower': [
    { name: 'Squat', sets: [{ weight: null, reps: 8 }, { weight: null, reps: 8 }, { weight: null, reps: 8 }, { weight: null, reps: 8 }] },
    { name: 'Romanian Deadlift', sets: [{ weight: null, reps: 10 }, { weight: null, reps: 10 }, { weight: null, reps: 10 }] },
    { name: 'Leg Press', sets: [{ weight: null, reps: 12 }, { weight: null, reps: 12 }, { weight: null, reps: 12 }] },
    { name: 'Leg Curl', sets: [{ weight: null, reps: 12 }, { weight: null, reps: 12 }, { weight: null, reps: 12 }] },
    { name: 'Calf Raise', sets: [{ weight: null, reps: 15 }, { weight: null, reps: 15 }, { weight: null, reps: 15 }, { weight: null, reps: 15 }] },
  ],
  'Push': [
    { name: 'Bench Press', sets: [{ weight: null, reps: 8 }, { weight: null, reps: 8 }, { weight: null, reps: 8 }, { weight: null, reps: 8 }] },
    { name: 'Incline Dumbbell Press', sets: [{ weight: null, reps: 10 }, { weight: null, reps: 10 }, { weight: null, reps: 10 }] },
    { name: 'Overhead Press', sets: [{ weight: null, reps: 10 }, { weight: null, reps: 10 }, { weight: null, reps: 10 }] },
    { name: 'Lateral Raise', sets: [{ weight: null, reps: 12 }, { weight: null, reps: 12 }, { weight: null, reps: 12 }] },
    { name: 'Tricep Pushdown', sets: [{ weight: null, reps: 12 }, { weight: null, reps: 12 }, { weight: null, reps: 12 }] },
  ],
  'Pull': [
    { name: 'Deadlift', sets: [{ weight: null, reps: 6 }, { weight: null, reps: 6 }, { weight: null, reps: 6 }] },
    { name: 'Pull Up', sets: [{ weight: null, reps: 8 }, { weight: null, reps: 8 }, { weight: null, reps: 8 }, { weight: null, reps: 8 }] },
    { name: 'Cable Row', sets: [{ weight: null, reps: 10 }, { weight: null, reps: 10 }, { weight: null, reps: 10 }] },
    { name: 'Face Pull', sets: [{ weight: null, reps: 15 }, { weight: null, reps: 15 }, { weight: null, reps: 15 }] },
    { name: 'Bicep Curl', sets: [{ weight: null, reps: 12 }, { weight: null, reps: 12 }, { weight: null, reps: 12 }] },
  ],
  'Legs': [
    { name: 'Squat', sets: [{ weight: null, reps: 8 }, { weight: null, reps: 8 }, { weight: null, reps: 8 }, { weight: null, reps: 8 }] },
    { name: 'Romanian Deadlift', sets: [{ weight: null, reps: 10 }, { weight: null, reps: 10 }, { weight: null, reps: 10 }] },
    { name: 'Leg Press', sets: [{ weight: null, reps: 12 }, { weight: null, reps: 12 }, { weight: null, reps: 12 }] },
    { name: 'Leg Curl', sets: [{ weight: null, reps: 12 }, { weight: null, reps: 12 }, { weight: null, reps: 12 }] },
    { name: 'Calf Raise', sets: [{ weight: null, reps: 15 }, { weight: null, reps: 15 }, { weight: null, reps: 15 }, { weight: null, reps: 15 }] },
    { name: 'Leg Extension', sets: [{ weight: null, reps: 12 }, { weight: null, reps: 12 }, { weight: null, reps: 12 }] },
  ],
}

const getExercises = (workoutName) => {
  return exercises[workoutName] || []
}


   return { weeklyPlan, getExercises }
})