<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();

const periods = ['1M', '3M', '6M', '1G'];
const selectedPeriod = ref('1M');

const chartLabels = ['Sij', 'Velj', 'Ožu', 'Tra', 'Svi', 'Lip', 'Srp', 'Kol', 'Ruj', 'Lis', 'Stu', 'Pro'];
const chartBars = ref([
    { height: 45 }, { height: 52}, { height: 48},
    { height: 55 }, { height: 60}, { height: 58},
    { height: 65 }, { height: 62}, { height: 70},
    { height: 68 }, { height: 75}, { height: 72},
])
// ovisno o selectedPeriod treba pokazivati drugcije podatke -> to sljedeci put
</script>

<template>

    <div class="progress-view">
        <button class ="back-btn" @click="router.push('/')">← Nazad</button>
        <h2> Napredak i statistika</h2>

        <div class="period-selector">
            <button v-for="p in periods"
            :key="p"
            :class="{ active: selectedPeriod === p }"
            @click="selectedPeriod = p">
                {{ p }}
            </button>
        </div>

        <div class="chart-card">
            <h3> Ukupni volumen treninga</h3>
            <div class="bar-chart">
                <div v-for="(bar, idx) in chartBars"
                :key="idx"
                class="bar-wrapper">
                <div class="bar"
                :style="{ height: bar.height + '%' }">
                </div>
            </div> 
        </div>
                <div class="chart-labels">
                    <span v-for="label in chartLabels"
                    :key="label">
                    {{ label }}
                    </span>
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
    height: 100%;
    display: flex;
    align-items: flex-end;
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

</style>