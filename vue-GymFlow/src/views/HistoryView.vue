<script setup>
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { useHistoryStore } from '../stores/historyStore';

const router = useRouter();
const historyStore = useHistoryStore();

// pretraga po nazivu treninga ili datumu
const searchQuery = ref('');

const allWorkouts = computed(() => historyStore.getAllWorkouts());

const filteredWorkouts = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return allWorkouts.value;

  return allWorkouts.value.filter(w => {
    const nameMatch = w.name?.toLowerCase().includes(q);
    const dayMatch = w.day?.toLowerCase().includes(q);
    const dateMatch = w.date?.toLowerCase().includes(q);
    return nameMatch || dayMatch || dateMatch;
  });
});

// formatiranje prikaza tezine - ako nije unesena prikazi "-"
const formatWeight = (weight) => {
  if (weight === null || weight === '' || weight === undefined) return '-';
  return weight;
};
</script>

<template>
  <div class="history">
    <button class="back-btn" @click="router.push('/')">← Natrag</button>
    <h2>Dnevnik treninga</h2>
    <p class="subtitle">Povijest svih spremljenih treninga</p>

    <!-- pretraga -->
    <div class="search-bar">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Pretraži po nazivu ili datumu (npr. Upper ili 12.6.2026)"
      />
    </div>

    <!-- poruka kad nema treninga -->
    <p class="empty-msg" v-if="allWorkouts.length === 0">
      Još nema spremljenih treninga. Odradi i spremi prvi trening!
    </p>

    <!-- poruka kad filter ne vrati nista -->
    <p class="empty-msg" v-else-if="filteredWorkouts.length === 0">
      Nema treninga koji odgovaraju pretrazi "{{ searchQuery }}".
    </p>

    <!-- lista treninga -->
    <div class="workout-entry" v-for="entry in filteredWorkouts" :key="entry.id">
      <div class="entry-header">
        <div>
          <h3>{{ entry.name }}</h3>
          <p class="entry-meta">{{ entry.day }} · {{ entry.date }}</p>
        </div>
      </div>

      <div class="entry-exercises">
        <div class="exercise-row" v-for="(exercise, idx) in entry.exercises" :key="idx">
          <div class="exercise-name">{{ exercise.name }}</div>
          <div class="sets-list">
            <span class="set-chip" v-for="(set, setIdx) in exercise.sets" :key="setIdx">
              {{ formatWeight(set.weight) }}kg × {{ set.reps }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.history {
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
  margin-bottom: 20px;
}

/* pretraga */
.search-bar {
  margin-bottom: 20px;
}

.search-bar input {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
  background: white;
}

.search-bar input:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

/* prazna lista */
.empty-msg {
  color: #6b7280;
  font-size: 14px;
  background: white;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

/* kartica treninga */
.workout-entry {
  background: white;
  border-radius: 14px;
  padding: 18px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.entry-header h3 {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.entry-meta {
  font-size: 13px;
  color: #6b7280;
  margin: 2px 0 0;
}

.entry-exercises {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 14px;
}

.exercise-row {
  border-top: 1px solid #f3f4f6;
  padding-top: 10px;
}

.exercise-row:first-child {
  border-top: none;
  padding-top: 0;
}

.exercise-name {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 8px;
}

.sets-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.set-chip {
  background: #eef2ff;
  color: #4f46e5;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
}
</style>