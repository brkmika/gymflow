<script setup>
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { useUserStore } from '../stores/userStore'
import { useHistoryStore } from '../stores/historyStore'

const router = useRouter();
const userStore = useUserStore()
const historyStore = useHistoryStore()

const periods = ['3M', '6M', '1G'];
const selectedPeriod = ref('3M');

// mozda bi htio ovdje napravit da se pokazuju zadnjih 6mj npr a ne da budu svih 12
const chartLabels = ['Sij', 'Velj', 'Ožu', 'Tra', 'Svi', 'Lip', 'Srp', 'Kol', 'Ruj', 'Lis', 'Stu', 'Pro'];

const chartBars = ref([
    { height: 45 }, { height: 52}, { height: 48},
    { height: 55 }, { height: 60}, { height: 58},
    { height: 65 }, { height: 62}, { height: 70},
    { height: 68 }, { height: 75}, { height: 72},
])
// ovisno o selectedPeriod treba pokazivati drugcije podatke -> to sljedeci put
const overloadItems = ref([
    { name: 'Bench Press', progress: '85kg -> 100kg (+17.6%)', percent: 85 },
    { name: 'Squat', progress: '100kg -> 120kg (+20%)', percent: 83 },
    { name: 'Deadlift', progress: '120kg -> 150kg (+25%)', percent: 80 },
])

const bmi = computed(() => {
    if (!userStore.tezina || !userStore.visina) return null
    const visina_m = userStore.visina / 100
    return (userStore.tezina / (visina_m * visina_m)).toFixed(1)
})

const bmiStatus = computed(() => {
    if(!bmi.value) return ''
    if(bmi.value < 18.5) return 'Ispod normalne težine'
    if(bmi.value < 25) return 'Normalna težina'
    if(bmi.value < 30) return 'Prekomjerna težina'
    return 'Pretilost'
})

const volumeData = computed (() => {
  return historyStore.getVolumeHistory()
})

const periodToMonths = {
  '3M': 3,
  '6M': 6,
  '1G': 12,
}

//ovo ce pretvarat volumen u postotak visine bara (znaci maximum od 100%)
const chartBarsReal = computed(() => {
  const numMonths = periodToMonths[selectedPeriod.value]
  const months = historyStore.getMonthlyVolume(numMonths)
  const maxVolume = Math.max(...months.map(m => m.volume), 1)

  const bars = []
  for (let i = 0; i < months.length; i++) {
    const percent = (months[i].volume / maxVolume) * 100
    bars.push({ height: percent, label: months[i].label })
  }
  return bars
})
</script>

<template>
  <div class="progress-view">
    <button class="back-btn" @click="router.push('/')">← Natrag</button>
    <h2>Napredak i statistika</h2>

    <div class="period-selector">
      <button
        v-for="p in periods"
        :key="p"
        :class="{ active: selectedPeriod === p }"
        @click="selectedPeriod = p">
        {{ p }}
      </button>
    </div>

<div class="chart-card">
  <h3>Ukupni volumen treninga</h3>
  <div class="bar-chart" v-if="chartBarsReal.length > 0">
    <div v-for="(bar, idx) in chartBarsReal" :key="idx" class="bar-wrapper">
      <div class="bar" :style="{ height: bar.height + '%' }"></div>
    </div>
  </div>
  <p class="empty-chart" v-else>Nema podataka za prikaz. Odradi prvi trening!</p>

  <div class="chart-labels" v-if="chartBarsReal.length > 0">
  <span v-for="(bar, idx) in chartBarsReal" :key="idx">{{ bar.label }}</span>
</div>
</div>

    <div class="overload-card">
      <h3>Progressive Overload - Compound vježbe</h3>
      <div class="overload-list">
        <div class="overload-item" v-for="item in overloadItems" :key="item.name">
          <div class="overload-header">
            <span class="exercise-name">{{ item.name }}</span>
            <span class="exercise-progress">{{ item.progress }}</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill" :style="{ width: item.percent + '%' }"></div>
          </div>
        </div>
      </div>
      <!-- treba dinamicki izracun iz historyStore kada mauro zavrsi logiranje -->
    </div>

    <div class="metrics-card">
      <h3>Tjelesni podaci</h3>
      <div class="metrics-grid">
        <div class="metric-item">
          <div class="metric-label">Težina</div>
          <div class="metric-value">{{ userStore.tezina || '-' }} kg</div>
        </div>
        <div class="metric-item">
          <div class="metric-label">Visina</div>
          <div class="metric-value">{{ userStore.visina || '-' }} cm</div>
        </div>
        <div class="metric-item">
          <div class="metric-label">BMI</div>
          <div class="metric-value">{{ bmi || '-' }}</div>
          <div class="metric-status" v-if="bmiStatus">{{ bmiStatus }}</div>
        </div>
        <div class="metric-item">
          <div class="metric-label">Godine</div>
          <div class="metric-value">{{ userStore.godine || '-' }}</div>
        </div>
      </div>
    </div>

  </div>
</template>



<style scoped>

.progress-view {
    padding: 24px;
    min-height: 100vh;
}

.back-btn {
    background: none;
    border: none;
    color: #4f46e5;
    cursor:pointer;
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

.period-selector {
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
}

.period-selector button {
    padding: 8px 16px;
    border-radius: 10px;
    border: none;
    background: #e5e7eb;
    color: #374151;
    cursor: pointer;
}

.period-selector button.active {
    background: #4f46e5;
    color: white;
}

.chart-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  margin-bottom: 16px;
}

.chart-card h3 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 16px;
}

.bar-chart {
    height: 160px;
    display: flex;
    align-items: flex-end;
    gap: 6px;
}

.bar-wrapper {
    flex: 1;
    max-width: 80px;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
}

.bar {
    width: 100%;
    background: linear-gradient(to top, #4f46e5, #818cf8);
    border-radius: 4px 4px 0 0;
}

.chart-labels {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    font-size: 11px;
    color: #9ca3af;
}

.overload-card {
    background: white;
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    margin-bottom: 16px;
}

.overload-card h3 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 16px
}

.overload-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.overload-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
}

.exercise-name { font-weight: 500; }

.exercise-progress {
    color: #4f46e5;
    font-weight: 600;
    font-size: 13px;
}

.progress-track {
    background: #e5e7eb;
    border-radius: 10px;
    height: 8px;
}

.progress-fill {
    background: #22c55e;
    border-radius: 10px;
    height: 100%;
}

.metrics-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  margin-bottom: 16px;
}

.metrics-card h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
}

.metrics-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.metric-item {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
}

.metric-label {
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 4px;
}

.metric-value {
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
}

.metric-status {
  font-size: 12px;
  color: #16a34a;
  margin-top: 4px;
}

</style>