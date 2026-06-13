<script setup>
import { useRouter } from 'vue-router';
import { useWorkoutStore } from '../stores/workoutStore';

const router = useRouter();
const workoutStore = useWorkoutStore();

const handleClick = (workout) => {
    if (workout.exercises === 0) return
}
</script>

<template>
  <div class="plan">
    <button class="back-btn" @click="router.push('/')">← Natrag</button>
    <h2>Tjedni plan treninga</h2>

    <div class="workout-list">
      <div
        v-for="(workout, idx) in workoutStore.weeklyPlan"
        :key="idx"
        class="workout-card"
        :class="{ rest: workout.exercises === 0 }"
        @click="handleClick(workout)">
        <div class="workout-info">
          <div class="workout-day">{{ workout.day }}</div>
          <div class="workout-name">{{ workout.name }}</div>
          <div v-if="workout.exercises > 0" class="workout-count">
            {{ workout.exercises }} vježbi
          </div>
        </div>

        <div v-if="workout.completed" class="check-icon">✓</div>
      </div>
    </div>
  </div>
</template>