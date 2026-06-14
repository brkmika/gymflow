<script setup>
import { useRouter, useRoute } from 'vue-router';

const router = useRouter()
const route = useRoute()

// Povuci workout podatke na temelju route parametra
const workout = {
    name: route.query.name || 'Trening',
    day: route.query.day || ''
}

</script>

<template>
    <div class="datail">
        <button class="back-btn" @click="router.push('/plan-treninga')">← Natrag</button>
        <h2> {{ workout.name }}</h2>
        <p class="subtitle">{{ workout.day }}</p>

        <!-- za napravit: lista vjezbi-->

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



</style>