<script setup>
import { useRouter } from 'vue-router';
import { useWorkoutStore } from '../stores/workoutStore';
import { computed } from 'vue';
import { useUserStore } from '../stores/userStore';
import { useHistoryStore } from '../stores/historyStore'

const router = useRouter();
const workoutStore = useWorkoutStore();
const userStore = useUserStore();
const historyStore = useHistoryStore()

const planLabel = computed(() => {
  const labels = {
    3: '3x tjedno - Full Body',
    4: '4x tjedno - Upper/Lower',
    5: '5x tjedno - Upper/Lower/PPL',
    6: '6x tjedno - Push/Pull/Legs',
  }
  return labels[userStore.treninziTjedno] || '';
})

const handleClick = (workout) => {
    if (workout.exercises === 0) return
    router.push({path: '/uredi-vjezbe', query: { name: workout.name, day: workout.day} })
}

const weekRange = computed(() => {
  const today = new Date()
  const dayOfWeek = today.getDay()
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
  
  const monday = new Date(today)
  monday.setDate(today.getDate() + diffToMonday)

  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    return `${day}.${month}`
  }
   return `${formatDate(monday)} - ${formatDate(sunday)}.${sunday.getFullYear()}`
})

</script>

<template>
  <div class="plan">
    <button class="back-btn" @click="router.push('/')">← Natrag</button>
    <h2>Tjedni plan treninga</h2>

    <!-- odabir frekvencije ako nije odabrana -->
     <div v-if="!userStore.treninziTjedno" class="frequency-picker">
      <h3> Koliko puta tjedno treniraš?</h3>
      <div class="frequency-grid">
        <button v-for="n in [3, 4, 5, 6]"
        :key="n"
        class="frequency-btn"
        @click="userStore.treninziTjedno = n">
        <span class="freq-number">{{ n }}x</span>
        <span class="freq-label">tjedno</span>
        </button>
      </div>
     </div>

     <!-- tjedni plan -->
      <div v-else>
        <p class="week-range">{{ weekRange }}</p>
        <div class="plan-header">
          <p class="plan-type"> {{ planLabel }}</p>
          <button class="change-btn" @click="userStore.treninziTjedno = null">
            Promijeni
          </button>
        </div>

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
              {{ workoutStore.getExercises(workout.day, workout.name).length }} vježbi
            </div>
          </div>
          <div v-if="historyStore.isDayCompletedThisWeek(workout.day)" class="check-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.plan {
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
  margin-bottom: 20px;
}

/* odabir frekvencije */
.frequency-picker h3{
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 16px;
}

.frequency-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.frequency-btn {
  background: white;
  border: none;
  border-radius: 16px;
  padding: 20px 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  transition: box-shadow 0.2s;
}

.frequency-btn:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
}

.freq-number {
  font-size: 32px;
  font-weight: 800;
  color: #4f46e5;
}

.freq-label {
  font-size: 13px;
  color: #6b7280;
}

/* plan header */
.plan-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.plan-type {
  font-size: 14px;
  color: #6b7280;
}

.change-btn {
  background: none;
  border: none;
  color: #4f46e5;
  font-size: 14px;
  cursor: pointer;
}

/* workout lista */
.workout-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.workout-card {
  background: white;
  border-radius: 14px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.workout-card.rest {
  opacity: 0.5;
  cursor: default;
}

.workout-day {
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 2px;
}

.workout-name {
  font-size: 17px;
  font-weight: 600;
}

.workout-count {
  font-size: 12px;
  color: #6b7280;
  margin-top: 2px;
}

.check-icon {
  color: #16a34a;
  font-size: 20px;
  font-weight: 700;
}

.week-range {
  color: #6b7280;
  margin-bottom: 16px;
}

.check-icon {
  width: 34px;
  height: 34px;
  background: #dcfce7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.check-icon svg {
  width: 20px;
  height: 20px;
  color: #16a34a;
}

</style>