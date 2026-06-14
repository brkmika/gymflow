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
    { name: 'Squat', sets: 3, reps: 8, weight: null },
    { name: 'Bench Press', sets: 3, reps: 8, weight: null },
    { name: 'Bent Over Row', sets: 3, reps: 8, weight: null },
    { name: 'Overhead Press', sets: 3, reps: 8, weight: null },
    { name: 'Romanian Deadlift', sets: 3, reps: 10, weight: null },
  ],
  'Full-Body B': [
    { name: 'Deadlift', sets: 3, reps: 6, weight: null },
    { name: 'Incline Bench Press', sets: 3, reps: 8, weight: null },
    { name: 'Pull Up', sets: 3, reps: 8, weight: null },
    { name: 'Dumbbell Shoulder Press', sets: 3, reps: 10, weight: null },
    { name: 'Leg Press', sets: 3, reps: 10, weight: null },
  ],
  'Full-Body C': [
    { name: 'Front Squat', sets: 3, reps: 8, weight: null },
    { name: 'Dips', sets: 3, reps: 10, weight: null },
    { name: 'Cable Row', sets: 3, reps: 10, weight: null },
    { name: 'Lateral Raise', sets: 3, reps: 12, weight: null },
    { name: 'Leg Curl', sets: 3, reps: 12, weight: null },
  ],
   'Upper': [
    { name: 'Bench Press', sets: 4, reps: 8, weight: null },
    { name: 'Bent Over Row', sets: 4, reps: 8, weight: null },
    { name: 'Overhead Press', sets: 3, reps: 10, weight: null },
    { name: 'Pull Up', sets: 3, reps: 8, weight: null },
    { name: 'Tricep Pushdown', sets: 3, reps: 12, weight: null },
  ],
  'Lower': [
    { name: 'Squat', sets: 4, reps: 8, weight: null },
    { name: 'Romanian Deadlift', sets: 3, reps: 10, weight: null },
    { name: 'Leg Press', sets: 3, reps: 12, weight: null },
    { name: 'Leg Curl', sets: 3, reps: 12, weight: null },
    { name: 'Calf Raise', sets: 4, reps: 15, weight: null },
  ],
  'Push': [
    { name: 'Bench Press', sets: 4, reps: 8, weight: null },
    { name: 'Incline Dumbbell Press', sets: 3, reps: 10, weight: null },
    { name: 'Overhead Press', sets: 3, reps: 10, weight: null },
    { name: 'Lateral Raise', sets: 3, reps: 12, weight: null },
    { name: 'Tricep Pushdown', sets: 3, reps: 12, weight: null },
  ],
    'Pull': [
    { name: 'Deadlift', sets: 3, reps: 6, weight: null },
    { name: 'Pull Up', sets: 4, reps: 8, weight: null },
    { name: 'Cable Row', sets: 3, reps: 10, weight: null },
    { name: 'Face Pull', sets: 3, reps: 15, weight: null },
    { name: 'Bicep Curl', sets: 3, reps: 12, weight: null },
  ],
  'Legs': [
    { name: 'Squat', sets: 4, reps: 8, weight: null },
    { name: 'Romanian Deadlift', sets: 3, reps: 10, weight: null },
    { name: 'Leg Press', sets: 3, reps: 12, weight: null },
    { name: 'Leg Curl', sets: 3, reps: 12, weight: null },
    { name: 'Calf Raise', sets: 4, reps: 15, weight: null },
    { name: 'Leg Extension', sets: 3, reps: 12, weight: null },
  ],
}

const getExercises = (workoutName) => {
  return exercises[workoutName] || []
}


   return { weeklyPlan, getExercises }
})