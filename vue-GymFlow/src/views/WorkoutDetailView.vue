<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref } from 'vue';
import { useWorkoutStore } from '../stores/workoutStore';
import { useHistoryStore } from '../stores/historyStore';

const router = useRouter()
const route = useRoute()
const workoutStore = useWorkoutStore()
const historyStore = useHistoryStore()

const workout = {
    name: route.query.name || 'Trening',
    day: route.query.day || ''
}

const today = new Date().toLocaleDateString('hr-HR')

const exercises = ref(workoutStore.getExercises(workout.day, workout.name).map(e => ({
    ...e,
    sets: e.sets.map(s => ({...s}))
})))

const addSet = (exerciseIdx) => {
    const lastSet = exercises.value[exerciseIdx].sets.at(-1)
    exercises.value[exerciseIdx].sets.push({weight: null, reps: lastSet.reps})
}

const removeSet = (exerciseIdx, setIdx) => {
    if(exercises.value[exerciseIdx].sets.length === 1) return
    exercises.value[exerciseIdx].sets.splice(setIdx, 1)
}

const removeExercise = (exerciseIdx) => {
    if (exercises.value.length === 1) return
    exercises.value.splice(exerciseIdx, 1)
}

const addExercise = () => {
    const name = prompt('Naziv vježbe:')
    if (!name) return
    exercises.value.push({ name, sets: [{ weight: null, reps: 10 }] })
}

const getOverload = (exerciseName, sets) => {
    const lastWeight = historyStore.getLastWeightForExercise(exerciseName)
    if (lastWeight === null) return null

    const currentMax = Math.max(...sets.map(s => Number(s.weight) || 0))
    if (currentMax === 0) return null

    return currentMax - lastWeight
}

const saveWorkout = () => {
  const hasWeights = exercises.value.some(e => e.sets.some(s => s.weight !== null && s.weight !== ''))

  if (!hasWeights){
    alert('Logiraj barem jednu težinu prije spremanja!')
    return
  }

  historyStore.saveWorkout(workout.name, workout.day, exercises.value)
  router.push('/plan-treninga')
}

</script>

<template>
    <div class="detail">
        <button class="back-btn" @click="router.push('/plan-treninga')">← Natrag</button>
        <h2> {{ workout.name }}</h2>
        <p class="subtitle">{{ workout.day }}</p>

        <!-- lista vjezbi-->
        <div class="exercise-list">
            <div class="exercise-card" v-for="(exercise, idx) in exercises" :key="idx">
            <div class="exercise-header">
              <h3>{{ exercise.name }}</h3>
              <button class="remove-exercise-btn" @click="removeExercise(idx)">✕</button>
            </div>

           <div class="sets">
              <div class="set-row" v-for="(set, setIdx) in exercise.sets" :key="setIdx">
                <div class="set-number">{{ setIdx + 1 }}</div>
                 <input type="number" v-model="set.weight" placeholder="Težina (kg)" min="0" max="500" />
                 <input type="number" v-model="set.reps" placeholder="Reps" />
                     <button class="remove-set-btn" @click="removeSet(idx, setIdx)">✕</button>
                </div>
            </div>
            
              <div class="overload-info"
                :class="getOverload(exercise.name, exercise.sets) >= 0 ? 'positive' : 'negative'"
                v-if="getOverload(exercise.name, exercise.sets) !== null">
                Progressive overload: {{ getOverload(exercise.name, exercise.sets) >= 0 ? '+' : '' }}{{ getOverload(exercise.name, exercise.sets) }}kg od prošli put
            </div>
            </div>
        </div>

        <button class="add-exercise-btn" @click="addExercise">+ Dodaj vježbu</button>
         <button class="save-btn" @click="saveWorkout">Spremi trening</button>
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

.empty {
  color: #9ca3af;
  text-align: center;
  margin-top: 40px;
}

.exercise-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 24px;
}

.exercise-card {
  background: white;
  border-radius: 14px;
  padding: 18px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.exercise-card h3{
    font-size: 17px;
    font-weight: 600;
    margin-bottom: 16px;
    color: #1f2937;
    text-align: left;
}

.exercise-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.exercise-header h3 {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.sets {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 12px;
}

.set-row{
    display: flex;
    align-items: center;
    gap: 10px;
}

.set-number {
  width: 32px;
  height: 32px;
  background: #eef2ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  color: #4f46e5;
  flex-shrink: 0;
}

.set-row input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
}

.set-row input:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79,70,229,0.1);
}

.sets-info {
  font-size: 13px;
  color: #6b7280;
  background: #f3f4f6;
  padding: 4px 10px;
  border-radius: 20px;
}

.weight-input {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.weight-input label {
  font-size: 13px;
  color: #6b7280;
}

.weight-input input {
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 15px;
  outline: none;
}

.weight-input input:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79,70,229,0.1);
}

.add-set-btn {
  background: none;
  border: none;
  color: #4f46e5;
  font-size: 14px;
  cursor: pointer;
  padding: 0;
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

.remove-set-btn {
    background: none;
    border: none;
    color: #9ca3af;
    cursor: pointer;
    font-size: 14px;
    padding: 0 4px;
}

.remove-set-btn:hover {
    color: #dc2626
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

.overload-info {
  font-size: 13px;
  margin-top: 8px;
}

.overload-info.positive {
  color: #16a34a;
}

.overload-info.negative {
  color: #dc2626;
}

</style>