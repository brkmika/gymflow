<template>
    <div class="profile">
        <button class="back-btn" @click="router.push('/')">← Natrag</button>
        <h2> Profil korisnika </h2>

    <div class="card">
    <h3> Osnovni podaci </h3>
    <div class="form-group">
        <label>Ime</label>
        <input type="text" v-model="userStore.ime" placeholder="Unesite ime" />
    </div>

    <div class="form-group">
        <label>Prezime</label>
        <input type="text" v-model="userStore.prezime" placeholder="Unesite prezime" />
    </div>
    </div> 

    <div class="card">
    <h3> Tjelesni podaci </h3>
    <div class="form-group">
        <label> Težina (kg) </label>
        <input type="number" v-model="userStore.tezina" placeholder="npr. 80" min="30" max="300" />
    </div>
    <div class="form-group">
        <label> Visina (cm) </label>
        <input type="number" v-model="userStore.visina" placeholder="npr. 180" min="100" max="250" />
    </div>
    <div class="form-group">
        <label> Godine </label>
        <input type="number" v-model="userStore.godine" placeholder="npr. 21" />
    </div>
    <div class="bmi-box" v-if="bmi">
        <div class="bmi-label">BMI</div>
        <div class="bmi-value"> {{  bmi  }}</div>
        <div class="bmi-status"> {{ bmiStatus }}</div>
   </div>
   </div>

   <div class="card">
    <h3> Plan treninga</h3>
    <div class="form-group">
        <label> Tjedni cilj (broj treninga) </label>
        <select v-model="userStore.treninziTjedno">
            <option :value="3">3x tjedno</option>
            <option :value="4">4x tjedno</option>
            <option :value="5">5x tjedno</option>
            <option :value="6">6x tjedno</option>
        </select>
   </div>
   </div>
   
   <button class="save-btn" :class="{ saved: saved }" @click="spremiPromjene">{{ saved ? '✓ Spremljeno!' : 'Spremi promjene' }}</button>
    </div>
   </template>
   
<script setup>

import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { useUserStore } from '../stores/userStore';

const userStore = useUserStore();
const router = useRouter();

const saved = ref(false)

// BMI izracun i funkcija za spremanje podataka
const bmi = computed(() => {
    if (!userStore.tezina || !userStore.visina) return null;
    const visina_m = userStore.visina / 100; // pretvaranje cm u m
    return (userStore.tezina / (visina_m * visina_m)).toFixed(1)
});

// BMI Status
const bmiStatus = computed(() => {
    if(!bmi.value) return ''
    if(bmi.value < 18.5) return "Ispod normalne težine"
    if(bmi.value < 25) return "Normalna težina"
    if(bmi.value < 30) return "Prekomjerna težina"
    return "Pretilost"
})

const spremiPromjene = () => {
    saved.value = true
    setTimeout(() => saved.value = false, 2000)
}

</script>

<style scoped>

/* stilovi za profil -> gumbovi i text */
.profile {
    padding: 24px;
    min-height:100vh;
}

.profile h2 {
    font-size:28px;
    font-weight:700;
    color: #1f2937;
    margin-bottom: 20px;
}

.card {
    background: white;
    border-radius:16px;
    padding: 24px;
    box-shadow: 0 2px 8px rgba (0,0,0,0.08);
    margin-bottom: 16px;
}

.card h3 {
    font-size: 16px;
    font-weight: 600px;
    margin-bottom: 16px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 16px;
}

.form-group label {
    font-size: 13px;
    font-weight: 500;
    color: #374151;
}

.form-group input {
    padding: 10px 14px;
    border: 1px solid #d1d5db;
    border-radius: 10px;
    font-size: 15px;
    outline: none;
}

.back-btn {
    background: none;
    border: none;
    color: #4f46e5;
    font-size: 15px;
    cursor: pointer;
    margin-bottom: 16px;
    paddinog: 0;
}

.save-btn {
    width: 100%;
    padding: 14px;
    background: #4f46e5;
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    cursor: pointer;
    font-weight: 600;
}

/* BMI box stilovi */
.bmi-box {
    background: #eef2ff;
    border-radius: 12px;
    padding: 16px;
    margin-top: 8px;
}

.bmi-label {
    font-size: 13px;
    color: #6b7280;
}

.bmi-value {
    font-size: 28px;
    font-weight: 700;
    color: #4f46e5;
}


/* BMI status stilovi */
.bmi-status {
    font-size: 12px;
    color: #6b7280;
    margin-top: 4px;
}

.form-group input:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79,70,229,0.1);
}

.save-btn.saved {
    background: #16a34a;
}
</style>