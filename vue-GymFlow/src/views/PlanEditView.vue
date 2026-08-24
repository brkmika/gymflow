<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref } from 'vue';
import { useWorkoutStore } from '../stores/workoutStore';

const router = useRouter()
const route = useRoute()
const workoutStore = useWorkoutStore()

const workout = {
    name: route.query.name || 'Trening',
    day: route.query.day || ''
}

const exercises = ref(workoutStore.getExercises(workout.day, workout.name).map(e => ({
    name: e.name,
    sets: e.sets.map(s => ({...s}))
})))

const addExercise = () => {
    const name = prompt('Naziv vježbe:')
    if (!name) return
    exercises.value.push({ name, sets: [{ weight: null, reps: 10 }] })
}

const removeExercise = (idx) => {
    if (exercises.value.length === 1) return
    exercises.value.splice(idx, 1)
}

const savePlan = () => {
    workoutStore.updateExercises(workout.day, exercises.value)
    router.push('/plan-treninga')
}
</script>

<template>
    <div class="detail">
        <button class="back-btn" @click="router.push('/plan-treninga')">← Natrag</button>
        <h2>{{ workout.name }}</h2>
        <p class="subtitle">{{ workout.day }}</p>

        <div class="exercise-list">
            <div class="exercise-card" v-for="(exercise, idx) in exercises" :key="idx">
                <div class="exercise-header">
                    <h3>{{ exercise.name }}</h3>
                    <button class="remove-exercise-btn" @click="removeExercise(idx)">✕</button>
                </div>
            </div>
        </div>

        <button class="add-exercise-btn" @click="addExercise">+ Dodaj vježbu</button>
        <button class="save-btn" @click="savePlan">Spremi plan</button>
    </div>
</template>

<style scoped>

.detail {
    padding: 24px;
    min-height: 100vh;
    background: linear-gradient(135deg, #eff6ff, #eef2ff);
}

.back-btn {
  background: none;
  border: none;
  color: #4f46e5;
  cursor: pointer;
  font-size: 15px;
  margin-bottom: 16px;
  padding: 0;
}

h2 {
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 4px;
}

.subtitle {
  color: #6b7280;
  margin-bottom: 24px;
}

.exercise-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.exercise-card {
  background: white;
  border-radius: 14px;
  padding: 18px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.exercise-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.exercise-header h3 {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.add-exercise-btn {
  width: 100%;
  background: white;
  color: #4f46e5;
  border: 1px solid #4f46e5;
  border-radius: 12px;
  padding: 14px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 12px;
}

.save-btn {
  width: 100%;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 14px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}

.remove-exercise-btn {
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  font-size: 16px;
  padding: 0 4px;
}

.remove-exercise-btn:hover {
  color: #dc2626;
}

</style>