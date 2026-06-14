<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref } from 'vue';
import { useWorkoutStore } from '../stores/workoutStore';

const router = useRouter()
const route = useRoute()
const workoutStore = useWorkoutStore()

// Povuci workout podatke na temelju route parametra
const workout = {
    name: route.query.name || 'Trening',
    day: route.query.day || ''
}

const exercises = ref(workoutStore.getExercises(workout.name).map(e => ({...e})))

</script>

<template>
    <div class="datail">
        <button class="back-btn" @click="router.push('/plan-treninga')">← Natrag</button>
        <h2> {{ workout.name }}</h2>
        <p class="subtitle">{{ workout.day }}</p>

        <!-- lista vjezbi-->
        <div class="exercise-list">
            <div class="exercise-card" v-for="(exercise, idx) in exercises" :key="idx">
                <div class="exercise-header">
                    <h3>{{ exercise.name }}</h3>
                    <span class="sets-info">{{ exercise.sets }} x {{ exercise.reps }} reps</span>
                </div>
                <div class="weight-input">
                    <label>Težina (kg):</label>
                    <input type="number"
                    v-model="exercise.weight"
                    placeholder="npr. 80"
                    min="0"
                    max="500" />
                </div>
            </div>
        </div>
        <!-- Napravit: spremanje unesenih tezina-->
         <button class="save-btn">Spremi trening</button>
    </div>
</template>

<style scoped>

.detail {
    padding: 24px;
    min-height: 100vh;
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
  margin-bottom: 12px;
}

.exercise-header h3 {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
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



</style>